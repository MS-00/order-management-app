<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Product>
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    public function createProduct(array $data): Product
    {
        $product = new Product();
        $product->setName($data['name']);
        $product->setCode($data['code']);
        $product->setPrice($data['price']);

        $this->_em->persist($product);
        $this->_em->flush();

        return $product;
    }

    public function updateProduct(Product $product, array $data): void
    {
        $product->setName($data['name'] ?? $product->getName());
        $product->setCode($data['code'] ?? $product->getCode());
        $product->setPrice($data['price'] ?? $product->getPrice());

        $this->_em->flush();
    }

    public function deleteProduct(Product $product): void
    {
        $this->_em->remove($product);
        $this->_em->flush();
    }

    //    /**
    //     * @return Product[] Returns an array of Product objects
    //     */
    //    public function findByExampleField($value): array
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->orderBy('p.id', 'ASC')
    //            ->setMaxResults(10)
    //            ->getQuery()
    //            ->getResult()
    //        ;
    //    }

    //    public function findOneBySomeField($value): ?Product
    //    {
    //        return $this->createQueryBuilder('p')
    //            ->andWhere('p.exampleField = :val')
    //            ->setParameter('val', $value)
    //            ->getQuery()
    //            ->getOneOrNullResult()
    //        ;
    //    }
}
