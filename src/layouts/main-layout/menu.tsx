import { useLocation, useNavigate } from "react-router-dom";

import {
  HomeIcons,
  OpenAIIcons,
  SettingsIcons,
} from "../../components/icons";
import { DataMenu } from "./menu-datas";
import { useMeStore } from "@/store/me-store";
import { ChevronLeft, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";


export default function Menu() {
  const role = "admin"
  const navigate = useNavigate();
  const { meUser } = useMeStore();
  const { removeToken } = useAuthStore();
  const pathName = useLocation()
  return (
    <div className="w-[104px] h-screen flex justify-between flex-col  border-r bg-sidebar  border-border">
      <div>
        <img
          src="/logo1.svg"
          className={`border-b inline-block w-full ${role? ' h-[64px]':'h-[90px]'}  border-border`}
        />
        {pathName.pathname== '/dashboard' ?
        <>
         <div
            onClick={() => {
                navigate('/dashboard');
            }}
            className={` hover:bg-sidebar-accent border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[20px]`}
          >
            <HomeIcons/>
          </div>
        </>: <div
            onClick={()=>navigate(-1)}
            className={` hover:bg-sidebar-accent cursor-pointer border-b border-border text-center flex items-center justify-center p-[20px]`}
          >
            {<ChevronLeft/>}
          </div>
          }
        {DataMenu[(meUser?.position?.role || "admin") as keyof typeof DataMenu]?.map((e) => (
          <div
            onClick={() => {
              if (e?.link) {
                navigate(e?.link);
              }
            }}
            className={` hover:bg-sidebar-accent border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[20px]`}
            key={e?.id}
          >
            {e?.icons()}
          </div>
        ))}
      </div>
      <div>
     
      <div
      onClick={()=>{
        removeToken();
        window.location.replace("/login");
      }}
          className={` hover:bg-sidebar-accent border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[20px]`}
        >
          <LogOut />
        </div>
        <div
          className={` hover:bg-sidebar-accent border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[20px]`}
        >
          <SettingsIcons />
        </div>
        <div
          className={`bg-[#272727] border-transparent cursor-pointer text-center flex items-center justify-center p-[20px]`}
        >
          <OpenAIIcons />
        </div>
      </div>
    </div>
  );
}
