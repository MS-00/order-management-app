import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashoard";
import NotFound from "@/pages/NotFound";
import OrderDetailsPage from "@/pages/OrderDetailsPage";
import OrdersNewPage from "@/pages/OrdersNewPage";
import Orders from "@/pages/Orders";
import App from "./App";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<Dashboard />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="orders/new" element={<OrdersNewPage />} />
                    <Route path="orders/:id" element={<OrderDetailsPage />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
