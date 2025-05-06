import {
    CreateProductRequest,
    ProductResponse,
    GetAllProductsResponse,
    UpdateProductRequest,
    DeleteProductResponse,
    UpdateProductResponse,
} from "@/types/product";
import useApi from "@/util/api";

function useProductsApi() {
    const { post, get, put, del } = useApi();

    const createProduct = async (
        product: CreateProductRequest
    ): Promise<ProductResponse> => {
        return await post("products", product);
    };

    const getProduct = async (id: number): Promise<ProductResponse> => {
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
