import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import useProductsApi from "@/api/product";
import { GetAllProductsResponse } from "@/types/product";

interface Order {
    name: string;
    code: string;
    price: number;
}

const columns: ColumnDef<Order>[] = [
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
        header: "Price",
    },
];

function Products() {
    const { getAllProducts } = useProductsApi();

    const navigate = useNavigate();

    const [data, setData] = useState<GetAllProductsResponse>([] as any);

    useEffect(() => {
        getAllProducts()
            .then((products) => {
                setData(products);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const action = (row: Order) => (
        <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/products/${row.id}`)}
        >
            View Details
        </Button>
    );

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Products</h1>
                <Button
                    onClick={() => {
                        navigate("/products/new");
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

export default Products;
