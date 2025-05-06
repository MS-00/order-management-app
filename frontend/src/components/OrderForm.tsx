import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useOrdersApi from "@/api/order";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import {
    CreateOrderRequest,
    OrderProduct,
    OrderProductBase,
    OrderResponse,
    UpdateOrderRequest,
} from "@/types/order";
import useProductsApi from "@/api/product";
import { GetAllProductsResponse, ProductResponse } from "@/types/product";
import { X } from "lucide-react";
import { useNotification } from "@/context/NotificationContext";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    number: z
        .string()
        .min(4, {
            message: "Must be at between 4 and 16 characters.",
        })
        .max(16, {
            message: "Must be at between 4 and 16 characters.",
        }),
    customer: z.string().nonempty(),
    status: z.string().nonempty(),
    date: z.string().nonempty(),
    total: z.number(),
});

interface OrderFormProps {
    title: string;
    initialData?: OrderResponse;
}

function OrderForm({ title, initialData }: OrderFormProps) {
    const { getStatusEnum, addOrder, updateOrder } = useOrdersApi();

    const { getAllProducts } = useProductsApi();

    const { showNotification } = useNotification();

    const navigate = useNavigate();

    const [statuses, setStatuses] = useState<string[]>([]);
    const [products, setProducts] = useState<GetAllProductsResponse>([] as any);
    const [orderProducts, setOrderProducts] = useState<Array<OrderProduct>>(
        initialData?.products ?? []
    );

    useEffect(() => {
        async function fetchStatuses() {
            const statusEnum = await getStatusEnum();
            setStatuses(statusEnum);
        }

        fetchStatuses();
    }, []);

    useEffect(() => {
        getAllProducts()
            .then((products) => {
                setProducts(products);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: (initialData as any) || {
            number: "",
            customer: "",
            status: "created",
            date: new Date(),
            total: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (orderProducts.length === 0) {
            return;
        }

        let body = { ...values };

        delete (body.total as any);

        body.products = [] as Array<OrderProductBase>;

        orderProducts.forEach((orderProduct) => {
            let oP: OrderProductBase = {
                productId: orderProduct.productId,
                quantity: orderProduct.quantity,
            };

            if (orderProduct.id) {
                oP.id = orderProduct.id;
            }

            body.products.push(oP);
        });

        if (initialData) {
            updateOrder(initialData.id, body as UpdateOrderRequest)
                .then((response) => {
                    navigate(`/orders/${initialData.id}`, { replace: true });
                    showNotification(response.message, "success");
                })
                .catch((error) => {
                    console.error(error);
                    showNotification(
                        "Error updating order. Please try again.",
                        "error"
                    );
                });
        } else {
            addOrder(body as unknown as CreateOrderRequest)
                .then((response) => {
                    navigate(`/orders/${response.id}`, { replace: true });
                    showNotification("Order created successfully!", "success");
                })
                .catch((error) => {
                    console.error(error);
                    showNotification(
                        "Error creating order. Please try again.",
                        "error"
                    );
                });
        }
    }

    const onAddProductClick = useCallback(() => {
        setOrderProducts((prev) => {
            const oP: OrderProduct = {
                id: 0,
                productId: 0,
                code: "",
                name: "",
                price: 0,
                quantity: 1,
            };

            return [...prev, oP];
        });
    }, []);

    const onOrderProductInputChange = useCallback(
        (i: number, key: string, value: any) => {
            setOrderProducts((prev) => {
                let newOrderProducts = [...prev];

                newOrderProducts[i][key] = value;

                if (key === "productId") {
                    products.forEach((product: OrderProduct) => {
                        if (product.id == value) {
                            newOrderProducts[i]["code"] = product.code;
                            newOrderProducts[i]["name"] = product.name;
                            newOrderProducts[i]["price"] = product.price;
                        }
                    });
                }

                return newOrderProducts;
            });
        },
        [products]
    );

    const onOrderProductRemove = useCallback((i: number) => {
        setOrderProducts((prev) => {
            let newOrderProducts = [...prev];

            newOrderProducts.splice(i, 1);

            return newOrderProducts;
        });
    }, []);

    const showOrderProductsRemoveButtton = useMemo(() => {
        return orderProducts.length > 1;
    }, [orderProducts]);

    const orderTotal = useMemo(() => {
        let total = 0;

        orderProducts.forEach((orderProduct) => {
            total += orderProduct.quantity * orderProduct.price;
        });

        return total.toFixed(2);
    }, [orderProducts]);

    useEffect(() => {
        if (orderProducts.length == 0) {
            onAddProductClick();
        }
    }, [orderProducts]);

    return (
        <Card className="w-full">
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">{title}</h1>

                            <Button type="submit">Save</Button>
                        </div>

                        <div className="flex gap-2">
                            <FormField
                                control={form.control}
                                name="number"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="ORD-001"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="customer"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Customer</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Name"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Status</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {statuses.map((status) => (
                                                    <SelectItem
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {status.toUpperCase()}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="total"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Total</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0"
                                                disabled
                                                {...field}
                                                value={orderTotal}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-start">
                            <Button type="button" onClick={onAddProductClick}>
                                Add Product
                            </Button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {orderProducts.length !== 0 && (
                                <div className="flex gap-2">
                                    <label className="flex-2">Product</label>
                                    <label className="flex-1">Price</label>
                                    <label className="flex-1">Quantity</label>
                                    <label className="flex-1">Total</label>
                                    {showOrderProductsRemoveButtton && (
                                        <label className="flex-1"></label>
                                    )}
                                </div>
                            )}
                            {orderProducts.map((orderProduct, i) => {
                                return (
                                    <OrderProductRow
                                        products={products}
                                        orderProduct={orderProduct}
                                        onChange={(key: string, value: any) => {
                                            onOrderProductInputChange(
                                                i,
                                                key,
                                                value
                                            );
                                        }}
                                        onCancel={() => {
                                            onOrderProductRemove(i);
                                        }}
                                        showCancel={
                                            showOrderProductsRemoveButtton
                                        }
                                    />
                                );
                            })}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

function OrderProductRow({
    products,
    orderProduct,
    onChange,
    onCancel,
    showCancel,
}: {
    products: GetAllProductsResponse;
    orderProduct: OrderProduct;
    onChange: CallableFunction;
    onCancel: CallableFunction;
    showCancel: boolean;
}) {
    const calculateTotal = useMemo(() => {
        return (orderProduct.quantity * orderProduct.price).toFixed(2);
    }, [orderProduct.quantity, orderProduct.price]);

    useEffect(() => {
        console.log(orderProduct);
    }, [orderProduct]);

    return (
        <div className="flex gap-2">
            <Select
                value={`${orderProduct.productId}`}
                onValueChange={(value) => {
                    onChange("productId", value);
                }}
                disabled={orderProduct.id ? true : false}
            >
                <SelectTrigger className="flex-2">
                    <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {products.map((product: ProductResponse) => (
                            <SelectItem
                                key={product.id}
                                value={`${product.id}`}
                            >
                                {product.code} - {product.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Input
                type="text"
                value={orderProduct.price}
                className="flex-1"
                disabled
            />

            <Input
                type="number"
                value={orderProduct.quantity}
                className="flex-1"
                onInput={(e) => onChange("quantity", e.currentTarget.value)}
                min={1}
                required
            />

            <Input
                type="text"
                value={calculateTotal}
                className="flex-1"
                disabled
            />

            {showCancel && (
                <div className="flex-1 text-center">
                    <Button
                        type="button"
                        variant={"outline"}
                        size={"icon"}
                        onClick={() => {
                            onCancel();
                        }}
                        className=""
                    >
                        <X />
                    </Button>
                </div>
            )}
        </div>
    );
}

export default OrderForm;
