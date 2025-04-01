import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/auth-store";

import Menu from "./menu";
import Header from "./header";
// import CashierHeader from "./cashier-header";

export default function MainLayout() {
  const { token } = useAuthStore();
  const pathname = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      window.location.replace("/login");
    }else if (pathname.pathname == '/'){
      navigate('/dashboard')
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
