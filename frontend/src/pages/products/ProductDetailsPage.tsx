import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useProductsApi from "@/api/product";
import { ProductResponse } from "@/types/product";
import ProductForm from "@/components/ProductForm";
import { Button } from "@/components/ui/button";

function ProductDetailsPage() {
    const { id } = useParams();
    const { getProduct } = useProductsApi();
    const [product, setProduct] = useState<ProductResponse>();

    const navigate = useNavigate();

    useEffect(() => {
        getProduct(Number(id))
            .then((product) => {
                setProduct(product);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    return (
        <div className="w-full py-4">
            <Button
                variant={"outline"}
                className="mb-4"
                onClick={() => {
                    navigate(-1);
                }}
            >
                Back
            </Button>

            {product && (
                <ProductForm title={"Product Details"} initialData={product} />
            )}
        </div>
    );
}

export default ProductDetailsPage;
