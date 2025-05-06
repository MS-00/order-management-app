import OrderForm from "@/components/OrderForm";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function OrdersNewPage() {
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

            <OrderForm title="New Order" />
        </div>
    );
}

export default OrdersNewPage;
