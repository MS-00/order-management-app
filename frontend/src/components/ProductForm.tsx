import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

import useProductsApi from "@/api/product";
import {
    CreateProductRequest,
    ProductResponse,
    UpdateProductRequest,
} from "@/types/product";
import { useNotification } from "@/context/NotificationContext";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    code: z
        .string()
        .min(4, {
            message: "Must be at between 4 and 16 characters.",
        })
        .max(16, {
            message: "Must be at between 4 and 16 characters.",
        }),
    name: z.string().nonempty(),
    price: z.string(),
});

interface ProductFormProps {
    title: string;
    initialData?: ProductResponse;
}

function ProductForm({ title, initialData }: ProductFormProps) {
    const { createProduct, updateProduct } = useProductsApi();

    const { showNotification } = useNotification();

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: (initialData as any) || {
            code: "",
            name: "",
            price: 0,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (initialData) {
            updateProduct(
                initialData.id,
                values as unknown as UpdateProductRequest
            )
                .then((response) => {
                    showNotification(response.message, "success");
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            createProduct(values as unknown as CreateProductRequest)
                .then((response) => {
                    showNotification("Product created successfully!", "success");
                    navigate(`/products/${response.id}`, { replace: true });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

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
                                name="code"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Code</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="P001"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="0"
                                                type="number"
                                                min={0}
                                                step={0.01}
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

export default ProductForm;
