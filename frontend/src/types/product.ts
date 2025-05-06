// Common types
export interface ProductBase {
    name: string;
    code: string;
    price: number;
}

// Request types
export interface CreateProductRequest extends ProductBase {}

export interface UpdateProductRequest extends Partial<ProductBase> {}

export interface UpdateProductResponse {
    message: string;
}

// Response types
export interface ProductResponse extends ProductBase {
    id: number;
}

export interface GetAllProductsResponse extends ProductResponse {}

export interface DeleteProductResponse {
    message: string;
}
