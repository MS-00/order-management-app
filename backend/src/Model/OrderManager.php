<?php

namespace App\Model;

use App\Entity\Order;
use App\Repository\OrderProductRepository;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;

class OrderManager
{
    private EntityManagerInterface $entityManager;
    private OrderRepository $orderRepository;
    private ProductRepository $productRepository;
    private OrderProductRepository $orderProductRepository;
    private OrderProductManager $orderProductManager;

    public function __construct(
        EntityManagerInterface $entityManager,
        OrderRepository $orderRepository,
        ProductRepository $productRepository,
        OrderProductRepository $orderProductRepository,
        OrderProductManager $orderProductManager
    ) {
        $this->entityManager = $entityManager;
        $this->orderRepository = $orderRepository;
        $this->productRepository = $productRepository;
        $this->orderProductRepository = $orderProductRepository;
        $this->orderProductManager = $orderProductManager;
    }

    public function createOrder(array $data): Order
    {
        $order = $this->orderRepository->createOrder($data);

        if (isset($data['products']) && is_array($data['products'])) {
            $this->addProductsToOrder($data['products'], $order);
        }

        $this->entityManager->flush();

        return $order;
    }

    public function addProductsToOrder(array $products, Order $order): void
    {
        foreach ($products as $productData) {
            $product = $this->productRepository->find($productData['productId']);

            if (!$product) {
                // throw new \Exception('Product not found: ' . $productData['productId']);
                continue;
            }

            if (isset($productData['id'])) {
                $orderProduct = $this->orderProductManager->getOrderProduct($productData['id']);

                $this->orderProductManager->updateQuantity(
                    $orderProduct,
                    $productData['quantity'],
                );
            }

            $totalProduct = $product->getPrice() * $productData['quantity'];

            $this->orderProductRepository->addProductToOrder(
                $order->getId(),
                $product->getId(),
                $productData['quantity'],
                $totalProduct
            );
        }

        $this->calculateOrderTotal($order);
    }

    public function removeProudctsFromOrder(Order $order, array $products)
    {
        $orderProducts = $this->orderProductManager->getAllOrderProducts($order->getId());

        $orderProductsIds = array_column($orderProducts, 'id');

        $dataProductsIds = array_column(array_filter($products, function ($productData) {
            return isset($productData['id']);
        }), 'id');

        foreach ($orderProductsIds as $orderProductId) {
            if (!in_array($orderProductId, $dataProductsIds)) {
                $this->orderProductManager->removeProductToOrder($orderProductId);
            }
        }

        $this->calculateOrderTotal($order);
    }

    private function calculateOrderTotal(Order $order)
    {
        $orderProducts = $this->orderProductManager->getAllOrderProducts($order->getId());
        $total = 0;

        foreach ($orderProducts as $orderProduct) {
            $total += $orderProduct->getPrice() * $orderProduct->getQuantity();
        }

        $this->orderRepository->updateTotal($order, $total);
    }

    public function updateOrder(int $id, array $data): void
    {
        $order = $this->getOrder($id);

        if (!$order) {
            throw new \Exception('Order not found: ' . $id);
        }

        $this->orderRepository->updateOrder($order, $data);

        $this->removeProudctsFromOrder($order, isset($data['products']) ? $data['products'] : []);

        if (isset($data['products'])) {
            $this->addProductsToOrder([$data['products']], $order);
        }

        $this->entityManager->flush();
    }

    public function getOrder(int $id): ?Order
    {
        return $this->orderRepository->findOrderById($id);
    }

    public function getAllOrders(): array
    {
        return $this->orderRepository->findAllOrders();
    }

    public function deleteOrder(int $id): void
    {
        $order = $this->getOrder($id);

        if (!$order) {
            throw new \Exception('Order not found: ' . $id);
        }

        $this->orderRepository->deleteOrder($order);
    }
}