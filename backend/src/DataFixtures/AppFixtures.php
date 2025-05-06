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
    private function createRandomProduct(ObjectManager $manager): Product
    {
        $product = new Product();
        $product->setName('Product ' . rand(1, 100));
        $product->setCode('P' . str_pad((string) rand(1, 999), 3, '0', STR_PAD_LEFT));
        $product->setPrice(rand(1000, 10000) / 100);
        $manager->persist($product);

        return $product;
    }

    private function createRandomOrder(ObjectManager $manager, array $products): void
    {
        $order = new Order();
        $order->setStatus(OrderStatusEnum::PENDING);
        $order->setDate(new \DateTime(sprintf('-%d days', rand(1, 30))));
        $order->setNumber('ORD-' . str_pad((string) rand(3, 999), 3, '0', STR_PAD_LEFT));
        $order->setCustomer('Customer ' . rand(1, 100));
        $manager->persist($order);

        $total = 0;

        $selectedProductKeys = (array) array_rand($products, min(rand(1, count($products)), count($products)));

        foreach ($selectedProductKeys as $productIndex) {
            $product = $products[$productIndex];
            $quantity = rand(1, 5);

            $orderProduct = new OrderProduct();
            $orderProduct->setOrderId($order);
            $orderProduct->setProductId($product);
            $orderProduct->setQuantity($quantity);
            $orderProduct->setPrice($product->getPrice() * $quantity);
            $manager->persist($orderProduct);

            $total += $orderProduct->getPrice();
        }

        $order->setTotal($total);
    }

    public function load(ObjectManager $manager): void
    {
        $products = [];
        for ($i = 0; $i < 10; $i++) {
            $products[] = $this->createRandomProduct($manager);
        }

        for ($i = 0; $i < 10; $i++) {
            $this->createRandomOrder($manager, $products);
        }

        $manager->flush();
    }
}
