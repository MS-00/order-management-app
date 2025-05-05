export interface CreateProductRequest {
    name: string;
    code: string;
    price: number;
}

export interface CreateProductResponse {
    id: number;
}

export interface GetProductResponse {
    id: number;
    name: string;
    code: string;
    price: number;
}

export interface GetAllProductsResponse {
    id: number;
    name: string;
    code: string;
    price: number;
}[]

export interface UpdateProductRequest {
    name?: string;
    code?: string;
    price?: number;
}

export interface UpdateProductResponse {
    message: string;
}

export interface DeleteProductResponse {
    message: string;
}