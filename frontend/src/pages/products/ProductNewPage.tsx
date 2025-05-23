import ProductForm from "@/components/ProductForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function ProductNewPage() {
    const navigate = useNavigate();

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

            <ProductForm title="New Product" />
        </div>
    );
}

export default ProductNewPage;
