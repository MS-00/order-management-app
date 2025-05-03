<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Order;
use App\Entity\OrderProduct;
use App\Entity\Product;
use App\Model\OrderStatusEnum;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Create demo products
        $product1 = new Product();
        $product1->setName('Product 1');
        $product1->setPrice(10.99);
        $product1->setCode('P001');
        $manager->persist($product1);

        $product2 = new Product();
        $product2->setName('Product 2');
        $product2->setPrice(15.49);
        $product2->setCode('P002');
        $manager->persist($product2);

        // Create a demo order
        $order = new Order();
        $order->setStatus(OrderStatusEnum::PENDING);
        $order->setDate(new \DateTime()); // Use the existing `date` field
        $order->setNumber('ORD-001');
        $order->setCustomer('John Doe');
        $manager->persist($order);

        // Link products to the order using orderId
        $orderProduct1 = new OrderProduct();
        $orderProduct1->setOrderId($order);
        $orderProduct1->setProductId($product1);
        $orderProduct1->setQuantity(2);
        $orderProduct1->setPrice($product1->getPrice() * 2);
        $manager->persist($orderProduct1);

        $orderProduct2 = new OrderProduct();
        $orderProduct2->setOrderId($order);
        $orderProduct2->setProductId($product2);
        $orderProduct2->setQuantity(1);
        $orderProduct2->setPrice($product2->getPrice());
        $manager->persist($orderProduct2);

        // Update the order total
        $order->setTotal($orderProduct1->getPrice() + $orderProduct2->getPrice());

        // Flush all changes to the database
        $manager->flush();
    }
}
