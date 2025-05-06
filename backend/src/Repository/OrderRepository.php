<?php

namespace App\Repository;

use App\Entity\Order;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use App\Model\OrderStatusEnum; // Ensure this is imported

/**
 * @extends ServiceEntityRepository<Order>
 */
class OrderRepository extends ServiceEntityRepository
{
    private EntityManagerInterface $_em;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, Order::class);
        $this->_em = $entityManager;
    }

    public function createOrder(array $data): Order
    {
        $order = new Order();
        $order->setNumber($data['number']);
        $order->setCustomer($data['customer']);
        $order->setDate(new \DateTime($data['date']));
        $order->setStatus(OrderStatusEnum::from($data['status']));
        $order->setTotal(0);

        $this->_em->persist($order);
        $this->_em->flush();

        return $order;
    }

    public function updateOrder(Order $order, array $data): void
    {
        $order->setNumber($data['number'] ?? $order->getNumber());
        $order->setCustomer($data['customer'] ?? $order->getCustomer());
        $order->setDate(isset($data['date']) ? new \DateTime($data['date']) : $order->getDate());
        if (isset($data['status'])) {
            $order->setStatus(OrderStatusEnum::from($data['status']));
        }

        $this->_em->flush();
    }

    public function updateTotal(Order $order, float $total): void
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
