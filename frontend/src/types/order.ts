// Request types
export interface CreateOrderRequest {
    customer: string;
    date: string; // Format: YYYY-MM-DD
    status: string;
    total: number;
    products: Array<{
        productId: number;
        quantity: number;
    }>;
}

export interface UpdateOrderRequest {
    customer?: string;
    date?: string; // Format: YYYY-MM-DD
    status?: string;
    total?: number;
    products?: Array<{
        id?: number;
        productId: number;
        quantity: number;
    }>;
}

// Response types
export interface OrderProduct {
    id: number;
    name: string;
    code: string;
    price: number;
    quantity: number;
}

export interface OrderResponse {
    id: number;
    number: string;
    customer: string;
    date: string; // Format: YYYY-MM-DD
    status: string;
    total: number;
    products: OrderProduct[];
}

export interface GetAllOrdersResponse {
    id: number;
    number: string;
    customer: string;
    date: string; // Format: YYYY-MM-DD
    status: string;
    total: number;
}
[];

export interface DeleteOrderResponse {
    message: string;
}

export interface UpdateOrderResponse {
    message: string;
}

export interface CreateOrderResponse {
    id: number;
}
