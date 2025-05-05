import "./App.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { LoadingProvider } from "./context/LoadingContext";
import { Outlet } from "react-router-dom";

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <LoadingProvider>
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
            </LoadingProvider>
        </ThemeProvider>
    );
}

export default App;
