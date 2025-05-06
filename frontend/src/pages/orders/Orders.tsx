import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import useOrdersApi from "@/api/order";
import { OrderResponse } from "@/types/order";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";

const columns: ColumnDef<OrderResponse>[] = [
    {
        accessorKey: "number",
        header: "Order Number",
    },
    {
        accessorKey: "customer",
        header: "Customer",
    },
    {
        accessorKey: "date",
        header: "Date",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "total",
        header: "Total",
    },
];

export default function Orders() {
    const { getAllOrders } = useOrdersApi();

    const navigate = useNavigate();

    const [data, setData] = useState<Array<OrderResponse>>([] as any);

    useEffect(() => {
        getAllOrders()
            .then((orders) => {
                setData(orders as unknown as OrderResponse[]);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    const action = (row: OrderResponse) => (
        <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/orders/${row.id}`)}
        >
            <Edit />
        </Button>
    );

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Orders</h1>
                <Button
                    onClick={() => {
                        navigate("/orders/new");
                    }}
                >
                    Add Order
                </Button>
            </div>
            <div className="container mx-auto py-2">
                <DataTable columns={columns} data={data} action={action} />
            </div>
        </div>
    );
}
