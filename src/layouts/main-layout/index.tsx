import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/auth-store";

import Menu from "./menu";
import Header from "./header";
import { useMeStore } from "@/store/me-store";
import CashierHeader from "./cashier-header";
// import CashierHeader from "./cashier-header";

export default function MainLayout() {
  const { token } = useAuthStore();
  const pathname = useLocation();
  const navigate = useNavigate()
const  {meUser} = useMeStore()

  useEffect(() => {
    if (!token) {
      window.location.replace("/login");
    }else if (pathname.pathname == '/'){
      if(meUser?.position?.role === 3){
        navigate('/cashier/home')
      }else{
        navigate('/dashboard')
      }
    }
  }, [token,meUser]);
  
  return (
    <SidebarProvider>
      <Menu />
      <SidebarInset>
        {
          meUser?.position?.role === 3?<CashierHeader/>: <Header />
        }
        <div className="h-[calc(100vh-63px)] overflow-scroll" >
        <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
