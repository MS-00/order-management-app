import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="w-full flex items-center justify-center h-screen">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Welcome to the Order Management App</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        This application allows you to manage orders and
                        products efficiently. You can create, view, modify, and
                        delete orders, as well as explore product listings.
                    </CardDescription>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <Link to="/orders">View Orders</Link>
                        <Link to="/products">View Products</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Home;
