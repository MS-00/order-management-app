import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import useOrdersApi from "@/api/order";
import { GetAllOrdersResponse } from "@/types/order";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Order {
    number: string;
    customer: string;
    date: string;
    status: string;
    total: number;
}

const columns: ColumnDef<Order>[] = [
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

    const [data, setData] = useState<GetAllOrdersResponse>([] as any);

    useEffect(() => {
        getAllOrders()
            .then((orders) => {
                setData(orders);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    const action = (row: Order) => (
        <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/orders/${row.id}`)}
        >
            View Details
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
            <div className="container mx-auto py-10">
                <DataTable columns={columns} data={data} action={action} />
            </div>
        </div>
    );
}
