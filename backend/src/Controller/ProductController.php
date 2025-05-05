<?php

namespace App\Controller;

use App\Entity\Product;
use App\Model\ProductManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class ProductController
{
    private ProductManager $productManager;

    public function __construct(ProductManager $productManager)
    {
        $this->productManager = $productManager;
    }

    #[Route('/products', methods: ['POST'])]
    public function createProduct(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        try {
            $product = $this->productManager->createProduct($data);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }

        return new JsonResponse(['id' => $product->getId()], 201);
    }

    #[Route('/products/{id}', methods: ['GET'])]
    public function getProduct(int $id): JsonResponse
    {
        $product = $this->productManager->getById($id);

        if (!$product) {
            return new JsonResponse(['error' => 'Product not found'], 404);
        }

        return new JsonResponse([
            'id' => $product->getId(),
            'name' => $product->getName(),
            'code' => $product->getCode(),
            'price' => $product->getPrice(),
        ]);
    }

    #[Route('/products', methods: ['GET'])]
    public function getAllProducts(): JsonResponse
    {
        $products = $this->productManager->getAllProducts();

        $data = array_map(function (Product $product) {
            return [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'code' => $product->getCode(),
                'price' => $product->getPrice(),
            ];
        }, $products);

        return new JsonResponse($data);
    }

    #[Route('/products/{id}', methods: ['PUT'])]
    public function updateProduct(int $id, Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        try {
            $this->productManager->updateProduct($id, $data);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }

        return new JsonResponse(['message' => 'Product updated']);
    }

    #[Route('/products/{id}', methods: ['DELETE'])]
    public function deleteProduct(int $id): JsonResponse
    {
        try {
            $this->productManager->deleteProduct($id);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], 400);
        }

        return new JsonResponse(['message' => 'Product deleted']);
    }
}
