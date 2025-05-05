import {
    CreateProductRequest,
    CreateProductResponse,
    GetProductResponse,
    GetAllProductsResponse,
    UpdateProductRequest,
    UpdateProductResponse,
    DeleteProductResponse,
} from "@/types/product";
import useApi from "@/util/api";

function useProductsApi() {
    const { post, get, put, del } = useApi();

    const createProduct = async (
        product: CreateProductRequest
    ): Promise<CreateProductResponse> => {
        return await post("products", product);
    };

    const getProduct = async (id: number): Promise<GetProductResponse> => {
        return await get(`products/${id}`);
    };

    const getAllProducts = async (): Promise<GetAllProductsResponse> => {
        return await get("products");
    };

    const updateProduct = async (
        id: number,
        updates: UpdateProductRequest
    ): Promise<UpdateProductResponse> => {
        return await put(`products/${id}`, updates);
    };

    const deleteProduct = async (
        id: number
    ): Promise<DeleteProductResponse> => {
        return await del(`products/${id}`, null);
    };

    return {
        createProduct,
        getProduct,
        getAllProducts,
        updateProduct,
        deleteProduct,
    };
}

export default useProductsApi;
