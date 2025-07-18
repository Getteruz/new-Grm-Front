import { ChevronLeft, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth-store";
import { useMeStore } from "@/store/me-store";

import { Filemeneger, HomeIcons } from "../../components/icons";
import { DataMenu } from "./menu-datas";
import OpenAI from "./openAI/list";
import { parseAsBoolean, useQueryState } from "nuqs";

export default function Menu() {
  const navigate = useNavigate();
  const { meUser, removeUserMe } = useMeStore();
  const { removeToken } = useAuthStore();
  const pathName = useLocation();
  const [isBack] = useQueryState("isBack",parseAsBoolean.withDefault(false));
  return (
    <div
      className={`${meUser?.position?.role == 3 ? " w-[90px] " : " w-[104px] "} h-screen flex relative pb-[110px] justify-between flex-col  border-r bg-sidebar  border-border `}
    >
      <img
      onClick={ meUser?.position?.role == 3 ?()=> {
        window.location.replace("/cashier/home")
      }:()=>{}}
        src="/logo1.svg"
        className={`border-b inline-block w-full ${meUser?.position.role == 3 ? "h-[90px]" : "h-[64px]"}  border-border`}
      />
      <div className="h-[100%] overflow-y-auto">
        {meUser?.position?.role !== 3 ? (
          pathName.pathname.split("/").length > 3 || isBack ? (
            <div
              onClick={() => {
                if(isBack){
                  window.location.replace(pathName.pathname)
                }else{
                  navigate(-1)
                }
              }}
              className={` hover:bg-sidebar-accent cursor-pointer border-b border-border text-center flex items-center justify-center p-[12px]`}
            >
              {<ChevronLeft />}
            </div>
          ) : (
              <div
              onClick={() => {
                navigate("/dashboard");
              }}
              className={`${meUser?.position?.role === 11 ? "hidden" : ""} group hover:bg-sidebar-accent border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[12px]`}
            >
              <HomeIcons />
              <span className="absolute opacity-0 group-hover:opacity-100 flex justify-center align-middle items-center left-full -ml-6   whitespace-nowrap text-[#5D5D53] bg-[#F0F0E5] border-[#CBCBC1] border-1 text-[15px] rounded px-[13px] py-[5px] transition-opacity duration-200 z-20">
                Dashboard
              </span>
            </div>
          )
        ) : (
          ""
        )}
        {DataMenu[
          (meUser?.position?.role || "admin") as keyof typeof DataMenu
        ]?.map((e) => (
          <div
            onClick={() => {
              if (e?.link) {
                navigate(e?.link);
              }
            }}
            className={`${pathName.pathname.includes(e?.link) ? "bg-sidebar-accent" : ""} group hover:bg-sidebar-accent border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[12px]`}
            key={e?.link}
          >
            {e?.icons()}
            <span className="absolute hidden opacity-0 text-[15px] group-hover:opacity-100 group-hover:flex justify-center align-middle items-center left-full -ml-6   whitespace-nowrap text-[#5D5D53] bg-[#F0F0E5] border-[#CBCBC1] border-1 text-md rounded px-[13px] py-[5px] transition-opacity duration-200 z-20">
              {e?.text}
            </span>
          </div>
        ))}
        <div className="absolute bottom-0 w-full z-10">
          <div
            onClick={() => {
              removeToken();
              removeUserMe();
              window.location.replace("/login");
            }}
            className={`group hover:bg-sidebar-accent border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[12px]`}
          >
            <LogOut width={20} />
            <span className="absolute opacity-0 group-hover:opacity-100 flex justify-center align-middle items-center left-full -ml-6   whitespace-nowrap text-[#5D5D53] bg-[#F0F0E5] border-[#CBCBC1] border-1 text-[15px] rounded px-[13px] py-[5px] transition-opacity duration-200 z-20">
              Выйти
            </span>
          </div>
          {meUser?.position?.role == 3 ? (
            <>
              <div
                className={` hover:bg-sidebar-accent border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[20px]  `}
              >
                <Filemeneger />
              </div>
            </>
          ) : (
            <>
              <OpenAI />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
