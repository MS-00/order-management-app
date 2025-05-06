<?php

namespace App\Model;

use App\Entity\Product;
use App\Repository\OrderProductRepository;
use App\Repository\ProductRepository;

class ProductManager
{
    private ProductRepository $productRepository;
    private OrderProductRepository $orderProductRepository;

    public function __construct(ProductRepository $productRepository, OrderProductRepository $orderProductRepository)
    {
        $this->productRepository = $productRepository;
        $this->orderProductRepository = $orderProductRepository;
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

        // Check if the product is in use
        if ($this->orderProductRepository->isProductInUse($product->getId())) {
            throw new \Exception('Cannot delete product as it is currently in use');
        }

        $this->productRepository->deleteProduct($product);
    }
}