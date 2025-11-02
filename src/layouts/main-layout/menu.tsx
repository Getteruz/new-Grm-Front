import { ChevronLeft, LogOut } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/auth-store";
import { useMeStore } from "@/store/me-store";

import {  HomeIcons } from "../../components/icons";
import { DataMenu } from "./menu-datas";
import { parseAsBoolean, useQueryState } from "nuqs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { minio_img_url } from "@/constants";
import NotePage from "./note/list";
import Weather from "./weather";

export default function Menu() {
  const navigate = useNavigate();
  const { meUser, removeUserMe } = useMeStore();
  const { removeToken } = useAuthStore();
  const pathName = useLocation();
  const [isBack] = useQueryState("isBack", parseAsBoolean.withDefault(false));
  return (
    <div
      className={`${meUser?.position?.role == 3 ? " min-w-[90px] " : " min-w-[104px] "} h-screen flex relative pb-[110px] justify-between flex-col  bg-background   `}
    >
      <Avatar
        onClick={
          meUser?.position?.role == 3
            ? () => {
                window.location.replace("/cashier/home");
              }
            : () => {}
        }
        className="w-[50px] mt-5 ml-5 mb-15 h-[50px]"
      >
        <AvatarImage src={minio_img_url + meUser?.avatar?.path} />
        <AvatarFallback className="bg-primary text-white w-[50px] flex items-center justify-center h-[50px]">
          {meUser?.firstName?.[0]}
          {meUser?.lastName?.[0]}
        </AvatarFallback>
      </Avatar>
      <div className="h-[100%] scrollCastom">
        <div className="scrollCastom h-[100%]">
          {meUser?.position?.role == 3 || meUser?.position?.role == 4 ? (
            ""
          ) : pathName.pathname.split("/").length > 3 || isBack ? (
            <div
              onClick={() => {
                if (isBack) {
                  window.location.replace(pathName.pathname);
                } else {
                  navigate(-1);
                }
              }}
              className={`iconsColorHover  cursor-pointer border-b border-border text-center flex items-center justify-center p-[12px]`}
            >
              {<ChevronLeft />}
            </div>
          ) : (
            <div
              onClick={() => {
                navigate("/dashboard");
              }}
              className={`${meUser?.position?.role === 11 ? "hidden" : ""} group iconsColorHover border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[12px]`}
            >
              <HomeIcons />
              <span className="absolute opacity-0 group-hover:opacity-100 flex justify-center align-middle items-center left-full -ml-6   whitespace-nowrap text-[#5D5D53] bg-[#F0F0E5] border-[#CBCBC1] border-1 text-[15px] rounded px-[13px] py-[5px] transition-opacity duration-200 z-20">
                Dashboard
              </span>
            </div>
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
              className={`${pathName.pathname.includes(e?.link) ? "iconsColor" : ""} group iconsColorHover border-transparent cursor-pointer  text-center flex items-center justify-center p-[12px]`}
              key={e?.link}
            >
              {e?.icons()}
              <span className="absolute hidden opacity-0 text-[15px] group-hover:opacity-100 group-hover:flex justify-center align-middle items-center left-full -ml-6   whitespace-nowrap text-[#5D5D53] bg-[#F0F0E5] border-[#CBCBC1] border-1 text-md rounded px-[13px] py-[5px] transition-opacity duration-200 z-20">
                {e?.text}
              </span>
            </div>
          ))}
           <div className="flex items-center   mb-5 justify-center">
            <NotePage/>
            </div>
          <div
            onClick={() => {
              removeToken();
              removeUserMe();
              window.location.replace("/login");
            }}
            className={`group iconsColorHover  cursor-pointer  text-center flex items-center justify-center mb-5 p-[12px]`}
          >
            <LogOut className="opacity-60" width={20} />
            <span className="absolute opacity-0 group-hover:opacity-100 flex justify-center align-middle items-center left-full -ml-6   whitespace-nowrap text-[#5D5D53] bg-[#F0F0E5] border-[#CBCBC1] border-1 text-[15px] rounded px-[13px] py-[5px] transition-opacity duration-200 z-20">
              Выйти
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 w-full z-10">
          <Weather />
          {/* {meUser?.position?.role == 3 ? "" : (
            <>
              <OpenAI />
            </>
          )} */}
        </div>
      </div>
    </div>
  );
}
