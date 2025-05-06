import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useProductsApi from "@/api/product";
import { Edit, Trash2 } from "lucide-react";
import { ProductResponse } from "@/types/product";
import { useNotification } from "@/context/NotificationContext";

function Products() {
    const { getAllProducts, deleteProduct } = useProductsApi();

    const navigate = useNavigate();

    const [data, setData] = useState<Array<ProductResponse>>([]);

    const { showNotification } = useNotification();

    useEffect(() => {
        getAllProducts()
            .then((products) => {
                setData(products as unknown as ProductResponse[]);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const onDeleteProductClick = useCallback((id: string) => {
        deleteProduct(parseInt(id))
            .then((response) => {
                showNotification("Product deleted successfully", "success");
                setData((prevData) =>
                    prevData.filter((product) => product.id !== parseInt(id))
                );
            })
            .catch((error: Error) => {
                console.error("Error deleting product:", error);

                showNotification(error.message, "error");
            });
    }, []);

    const columns: ColumnDef<ProductResponse>[] = useMemo(
        () => [
            {
                accessorKey: "code",
                header: "Code",
            },
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "price",
                header: () => <div className="text-right">Price</div>,
                cell: ({ row }) => {
                    const amount = parseFloat(row.getValue("price"));
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
                                navigate(`/products/${row.getValue("id")}`)
                            }
                        >
                            <Edit />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                onDeleteProductClick(row.getValue("id"))
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
                <h1 className="text-2xl font-bold">Products</h1>
                <Button
                    onClick={() => {
                        navigate("/products/new");
                    }}
                >
                    Add Product
                </Button>
            </div>
            <div className="container mx-auto py-2">
                <DataTable columns={columns} data={data} />
            </div>
        </div>
    );
}

export default Products;
