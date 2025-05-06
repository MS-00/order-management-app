<?php

namespace App\Model;

use App\Entity\OrderProduct;
use App\Repository\OrderProductRepository;

class OrderProductManager
{
    private OrderProductRepository $orderProductRepository;

    public function __construct(OrderProductRepository $orderProductRepository)
    {
        $this->orderProductRepository = $orderProductRepository;
    }

    public function getOrderProduct(int $id): OrderProduct
    {
        return $this->orderProductRepository->find($id);
    }

    public function getAllOrderProducts(int $orderId): array
    {
        return $this->orderProductRepository->findByOrderId($orderId);
    }

    public function addProductToOrder(int $orderId, int $productId, int $quantity, float $price): void
    {
        $this->orderProductRepository->addProductToOrder($orderId, $productId, $quantity, $price);
    }

    public function updateQuantity(OrderProduct $orderProduct, int $quantity): void
    {
        $this->orderProductRepository->updateQuantity($orderProduct, $quantity);
    }

    public function removeProductToOrder(int $id): void
    {
        $this->orderProductRepository->removeProductToOrder($this->getOrderProduct($id));
    }

    public function removeAllProductsToOrder(int $orderId): void
    {
        $this->orderProductRepository->removeAllProductsToOrder($orderId);
    }
}
