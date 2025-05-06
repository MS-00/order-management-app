import "./App.css";
import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { LoadingProvider } from "@/context/LoadingContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { ThemeProvider } from "@/context/ThemeProvider";

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <LoadingProvider>
                <NotificationProvider>
                    <SidebarProvider>
                        <div>
                            <AppSidebar />
                        </div>
                        <main className="w-full relative">
                            <SidebarTrigger />

                            <div className="flex w-full h-full p-4 relative">
                                <Outlet />
                            </div>
                        </main>
                    </SidebarProvider>
                </NotificationProvider>
            </LoadingProvider>
        </ThemeProvider>
    );
}

export default App;
