import {
    CreateOrderRequest,
    CreateOrderResponse,
    DeleteOrderResponse,
    GetAllOrdersResponse,
    OrderResponse,
    UpdateOrderRequest,
    UpdateOrderResponse,
} from "@/types/order";
import useApi from "@/util/api";

function useOrdersApi() {
    const { post, get, put, del } = useApi();

    const addOrder = async (
        application: CreateOrderRequest
    ): Promise<CreateOrderResponse> => {
        return await post("orders", application);
    };

    const getOrder = async (applicationId: number): Promise<OrderResponse> => {
        return await get(`orders/${applicationId}`);
    };

    const getAllOrders = async (): Promise<GetAllOrdersResponse> => {
        return await get("orders");
    };

    const updateOrder = async (
        applicationId: number,
        updates: UpdateOrderRequest
    ): Promise<UpdateOrderResponse> => {
        return await put(`orders/${applicationId}`, updates);
    };

    const deleteOrder = async (
        applicationId: number
    ): Promise<DeleteOrderResponse> => {
        return await del(`orders/${applicationId}`, null);
    };

    const getStatusEnum = async (): Promise<string[]> => {
        return await get("orders/status-enum");
    };

    return { addOrder, getOrder, getAllOrders, updateOrder, deleteOrder, getStatusEnum };
}

export default useOrdersApi;
