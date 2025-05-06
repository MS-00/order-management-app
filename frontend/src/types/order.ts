// Common types
export interface OrderBase {
    number: string;
    customer: string;
    date: string; // Format: YYYY-MM-DD
    status: string;
    total: number;
}

export interface OrderProductBase {
    productId: number;
    quantity: number;
}

// Request types
export interface CreateOrderRequest extends Omit<OrderBase, 'total'> {
    products: OrderProductBase[];
}

export interface UpdateOrderRequest extends Partial<Omit<OrderBase, 'total'>> {
    products?: Array<{
        id?: number;
    } & OrderProductBase>;
}

// Response types
export interface OrderProduct extends OrderProductBase {
    id: number;
    name: string;
    code: string;
    price: number;
}

export interface OrderResponse extends OrderBase {
    id: number;
    number: string;
    products: OrderProduct[];
}

export interface GetAllOrdersResponse extends OrderBase {
    id: number;
    number: string;
}

export interface DeleteOrderResponse {
    message: string;
}

export interface UpdateOrderResponse {
    message: string;
}

export interface CreateOrderResponse {
    id: number;
}
