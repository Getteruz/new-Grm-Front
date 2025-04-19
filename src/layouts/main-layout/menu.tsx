import { ChevronLeft, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth-store";
import { useMeStore } from "@/store/me-store";

import { Filemeneger, HomeIcons, OpenAIIcons } from "../../components/icons";
import { DataMenu } from "./menu-datas";

export default function Menu() {
  const navigate = useNavigate();
  const { meUser, removeUserMe } = useMeStore();
  const { removeToken } = useAuthStore();
  const pathName = useLocation();

  return (
    <div
      className={`${meUser?.position?.role == 3 ? " w-[90px] " : " w-[104px] "} h-screen flex relative pb-[110px] justify-between flex-col  border-r bg-sidebar  border-border`}
    >
      <img
        src="/logo1.svg"
        className={`border-b inline-block w-full ${meUser?.position.role == 3 ? "h-[90px]" : "h-[64px]"}  border-border`}
      />
      <div className="h-[100%] overflow-y-auto">
        {meUser?.position?.role !== 3 ? (
          pathName.pathname.split("/").length < 3 ? (
            <div
              onClick={() => {
                navigate("/dashboard");
              }}
              className={` hover:bg-sidebar-accent border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[20px]`}
            >
              <HomeIcons />
            </div>
          ) : (
            <div
              onClick={() => navigate(-1)}
              className={` hover:bg-sidebar-accent cursor-pointer border-b border-border text-center flex items-center justify-center p-[20px]`}
            >
              {<ChevronLeft />}
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
            className={`${pathName.pathname.includes(e?.link) ? "bg-sidebar-accent" : ""} hover:bg-sidebar-accent border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[20px]`}
            key={e?.id}
          >
            {e?.icons()}
          </div>
        ))}
        <div className="absolute bottom-0 w-full z-10">
          <div
            onClick={() => {
              removeToken();
              removeUserMe();
              window.location.replace("/login");
            }}
            className={` hover:bg-sidebar-accent border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[20px]`}
          >
            <LogOut />
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
              <div
                className={`bg-[#272727] border-transparent cursor-pointer text-center flex items-center justify-center p-[20px]`}
              >
                <OpenAIIcons />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
