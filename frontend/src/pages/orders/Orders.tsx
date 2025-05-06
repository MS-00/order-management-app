import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import useOrdersApi from "@/api/order";
import { OrderResponse } from "@/types/order";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";
import { formatToStringUI } from "@/util/date";

export default function Orders() {
    const { getAllOrders, deleteOrder } = useOrdersApi();

    const navigate = useNavigate();

    const [data, setData] = useState<Array<OrderResponse>>([] as any);

    const { showNotification } = useNotification();

    useEffect(() => {
        getAllOrders()
            .then((orders) => {
                setData(orders as unknown as OrderResponse[]);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    const onDeleteOrderClick = useCallback((id: string) => {
        deleteOrder(parseInt(id))
            .then((response) => {
                showNotification("Order deleted successfully", "success");
                setData((prevData) =>
                    prevData.filter((order) => order.id !== parseInt(id))
                );
            })
            .catch((error) => {
                console.error("Error deleting order:", error);
                showNotification("Error deleting order", "error");
            });
    }, []);

    const columns: ColumnDef<OrderResponse>[] = useMemo(
        () => [
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
                cell: ({ row }) =>
                    formatToStringUI(new Date(row.getValue("date"))),
                enableColumnFilter: false,
            },
            {
                accessorKey: "status",
                header: "Status",
            },
            {
                accessorKey: "total",
                header: () => <div className="text-right">Total</div>,
                cell: ({ row }) => {
                    const amount = parseFloat(row.getValue("total"));
                    const formatted = new Intl.NumberFormat("it-IT", {
                        style: "currency",
                        currency: "EUR",
                    }).format(amount);

                    return (
                        <div className="text-right font-medium">
                            {formatted}
                        </div>
                    );
                },
            },
            {
                accessorKey: "id",
                header: () => <div className="text-right">Actions</div>,
                cell: ({ row }) => (
                    <div className="flex gap-2 justify-end">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                navigate(`/orders/${row.getValue("id")}`)
                            }
                        >
                            <Edit />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                onDeleteOrderClick(row.getValue("id"))
                            }
                        >
                            <Trash2 />
                        </Button>
                    </div>
                ),
                enableColumnFilter: false,
            },
        ],
        []
    );

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-2">
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
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}
