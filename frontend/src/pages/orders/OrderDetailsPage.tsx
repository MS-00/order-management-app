import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useOrdersApi from "@/api/order";
import OrderForm from "@/components/OrderForm";
import { OrderResponse } from "@/types/order";
import { Button } from "@/components/ui/button";

function OrderDetailsPage() {
    const { id } = useParams();
    const { getOrder } = useOrdersApi();
    const [order, setOrder] = useState<OrderResponse>();

    const navigate = useNavigate();

    useEffect(() => {
        getOrder(Number(id))
            .then((order) => {
                setOrder(order);
            })
            .catch((error) => {
                console.error("Error fetching order:", error);
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

            {order && <OrderForm title="Order Details" initialData={order} />}
        </div>
    );
}

export default OrderDetailsPage;
