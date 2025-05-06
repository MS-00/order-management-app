<?php

namespace App\Repository;

use App\Entity\OrderProduct;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @extends ServiceEntityRepository<OrderProduct>
 */
class OrderProductRepository extends ServiceEntityRepository
{
    private EntityManagerInterface $_em;

    public function __construct(ManagerRegistry $registry, EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, OrderProduct::class);
        $this->_em = $entityManager;
    }

    public function findByOrderId(int $orderId): array
    {
        return $this->createQueryBuilder('op')
            ->andWhere('op.orderId = :val')
            ->setParameter('val', $orderId)
            ->orderBy('op.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    public function addProductToOrder(int $orderId, int $productId, int $quantity, float $price): void
    {
        $orderProduct = new OrderProduct();
        $orderProduct->setOrderId($this->_em->getReference('App\Entity\Order', $orderId));
        $orderProduct->setProductId($this->_em->getReference('App\Entity\Product', $productId));
        $orderProduct->setQuantity($quantity);
        $orderProduct->setPrice($price);

        $this->_em->persist($orderProduct);
        $this->_em->flush();
    }

    public function updateQuantity(OrderProduct $orderProduct, int $quantity): void
    {
        $orderProduct->setQuantity($quantity);
        $this->_em->flush();
    }

    public function removeProductToOrder(OrderProduct $orderProduct): void
    {
        $this->_em->remove($orderProduct);
        $this->_em->flush();
    }
}
