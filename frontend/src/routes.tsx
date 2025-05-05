import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "@/pages/Dashoard";
import NotFound from "@/pages/NotFound";
import OrderDetailsPage from "@/pages/OrderDetailsPage";
import OrdersNewPage from "@/pages/OrdersNewPage";
import Orders from "@/pages/Orders";
import Products from "@/pages/products/Products";
import ProductNewPage from "@/pages/products/ProductNewPage";
import ProductDetailsPage from "@/pages/products/ProductDetailsPage";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Dashboard />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="orders/new" element={<OrdersNewPage />} />
                    <Route path="orders/:id" element={<OrderDetailsPage />} />
                    <Route path="products" element={<Products />} />
                    <Route path="products/new" element={<ProductNewPage />} />
                    <Route
                        path="products/:id"
                        element={<ProductDetailsPage />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
