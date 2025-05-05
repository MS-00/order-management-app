<?php

namespace App\Repository;

use App\Entity\Order;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Order>
 */
class OrderRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Order::class);
    }

    public function createOrder(array $data): Order
    {
        $order = new Order();
        $order->setNumber($data['number']);
        $order->setCustomer($data['customer']);
        $order->setDate(new \DateTime($data['date']));
        $order->setStatus($data['status']);
        $order->setTotal(0);

        $this->_em->persist($order);

        return $order;
    }

    public function updateOrder(Order $order, array $data): void
    {
        $order->setNumber($data['number'] ?? $order->getNumber());
        $order->setCustomer($data['customer'] ?? $order->getCustomer());
        $order->setDate(isset($data['date']) ? new \DateTime($data['date']) : $order->getDate());
        $order->setStatus($data['status'] ?? $order->getStatus());

        $this->_em->flush();
    }

    public function updateTotal(Order $order, int $total): void
    {
        $order->setTotal($total);
        $this->_em->flush();
    }

    public function deleteOrder(Order $order): void
    {
        $this->_em->remove($order);
        $this->_em->flush();
    }

    public function findOrderById(int $id): ?Order
    {
        return $this->find($id);
    }

    public function findAllOrders(): array
    {
        return $this->findAll();
    }
}
