import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/auth-store";

import Menu from "./menu";
import Header from "./header";
// import CashierHeader from "./cashier-header";

export default function MainLayout() {
  const { token } = useAuthStore();

  useEffect(() => {
    if (!token) {
      window.location.replace("/login");
    }
  }, [token]);
  
  return (
    <SidebarProvider>
      <Menu />
      <SidebarInset>
        {/* <CashierHeader/> */}
        <Header />
        <div className="h-[calc(100vh-63px)] overflow-scroll" >
        <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
