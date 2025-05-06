<?php

namespace App\Controller;

use App\Entity\Order;
use App\Model\OrderManager;
use App\Model\OrderStatusEnum;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class OrderController
{
    private OrderManager $orderManager;

    public function __construct(OrderManager $orderManager)
    {
        $this->orderManager = $orderManager;
    }

    #[Route('/orders/status-enum', methods: ['GET'])]
    public function getStatusEnum(): JsonResponse
    {
        $statuses = OrderStatusEnum::getValues();

        return new JsonResponse($statuses);
    }

    #[Route('/orders', methods: ['POST'])]
    public function createOrder(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        try {
            $order = $this->orderManager->createOrder($data);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }

        return new JsonResponse(['id' => $order->getId()], 201);
    }

    #[Route('/orders/{id}', methods: ['GET'])]
    public function getOrder(int $id): JsonResponse
    {
        $order = $this->orderManager->getOrder($id);

        if (!$order) {
            return new JsonResponse(['error' => 'Order not found'], 404);
        }

        $products = $order->getOrderProducts()->map(function ($orderProduct) {
            return [
                'id' => $orderProduct->getId(),
                'productId' => $orderProduct->getProductId()->getId(),
                'name' => $orderProduct->getProductId()->getName(),
                'code' => $orderProduct->getProductId()->getCode(),
                'price' => $orderProduct->getProductId()->getPrice(),
                'quantity' => $orderProduct->getQuantity(),
            ];
        })->toArray();

        return new JsonResponse([
            'id' => $order->getId(),
            'number' => $order->getNumber(),
            'customer' => $order->getCustomer(),
            'date' => $order->getDate()->format('Y-m-d'),
            'status' => $order->getStatus(),
            'total' => $order->getTotal(),
            'products' => $products,
        ]);
    }

    #[Route('/orders', methods: ['GET'])]
    public function getAllOrders(): JsonResponse
    {
        $orders = $this->orderManager->getAllOrders();

        $data = array_map(function (Order $order) {
            return [
                'id' => $order->getId(),
                'number' => $order->getNumber(),
                'customer' => $order->getCustomer(),
                'date' => $order->getDate()->format('Y-m-d'),
                'status' => $order->getStatus(),
                'total' => $order->getTotal(),
            ];
        }, $orders);

        return new JsonResponse($data);
    }

    #[Route('/orders/{id}', methods: ['PUT'])]
    public function updateOrder(int $id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        try {
            $this->orderManager->updateOrder($id, $data);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }

        return new JsonResponse(['message' => 'Order updated']);
    }

    #[Route('/orders/{id}', methods: ['DELETE'])]
    public function deleteOrder(int $id): JsonResponse
    {
        try {
            $this->orderManager->deleteOrder($id);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }

        return new JsonResponse(['message' => 'Order deleted']);
    }
}
