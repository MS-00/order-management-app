<?php

namespace App\Model;

use App\Entity\Product;
use App\Repository\ProductRepository;

class ProductManager
{
    private ProductRepository $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function createProduct(array $data): Product
    {
        return $this->productRepository->createProduct($data);
    }

    public function updateProduct(int $id, array $data)
    {
        $product = $this->getById($id);

        if (!$product) {
            throw new \Exception('Product not found');
        }

        $this->productRepository->updateProduct($product, $data);
    }

    public function getById(int $id): Product
    {
        return $this->productRepository->find($id);
    }

    public function getAllProducts(): array
    {
        return $this->productRepository->findAll();
    }

    public function deleteProduct(int $id): void
    {
        $product = $this->getById($id);

        if (!$product) {
            throw new \Exception('Product not found');
        }

        $this->productRepository->deleteProduct($product);
    }
}