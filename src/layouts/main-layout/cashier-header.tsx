import { AvatarFallback } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import { BellRing } from "lucide-react";
import { useLocation } from "react-router-dom";

import AddingParishOrFlow from "@/components/adding-parish-flow";
import { DollarIcon } from "@/components/icons";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { minio_img_url } from "@/constants";
import { getAllData, getByIdData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { useAuthStore } from "@/store/auth-store";
import { useMeStore } from "@/store/me-store";
import { IOpenKassa } from "@/types/api-type";

import { DataMenu } from "./menu-datas";
import NotePage from "./note/list";
import { CurrencyData } from "./types";
import Weather from "./weather";

export default function CashierHeader() {
  const { meUser } = useMeStore();
  const token = useAuthStore((state) => state.token);
  const location = useLocation();
  const filialId = meUser?.filial.id;
  const { data } = useQuery({
    queryKey: [apiRoutes.filial, filialId],
    queryFn: () =>
      getByIdData<IOpenKassa, void>("/kassa/open-kassa", filialId || ""),
    enabled: !!filialId,
  });
  const { data: currency } = useQuery({
    queryKey: ["currency", token, meUser],
    queryFn: () => getAllData<CurrencyData, unknown>("currency"),
  });

  const notificationCount = data?.orders?.filter(
    (order) => order.status === "progress"
  ).length;

  const oneMenu = DataMenu?.[
    meUser?.position?.role as keyof typeof DataMenu
  ]?.find((e) => location.pathname.includes(e?.link));

  return (
    <header className="h-[90px] bg-sidebar border-b border-border flex ">
      <div className="flex p-[15px] mr-auto items-center">
        {location.pathname !== "/cashier/home" ? (
          <h2 className="text-[#5D5D53] font-medium text-[22px] ml-3">
            {oneMenu?.text}
          </h2>
        ) : (
          <>
            <DollarIcon />
            <div>
              <p className="text-[12px] ext-primary ">Касса за сегодня:</p>
              <p className="text-[25px] font-bold text-primary">
                {data?.totalSum}
              </p>
            </div>
          </>
        )}
      </div>
      <AddingParishOrFlow kassaId={String(data?.id)} />
      <div className="ml-8">
        <div className="flex items-center justify-between w-full max-w-[312px] pr-3 gap-5">
          <div className="flex text-primary items-center gap-[5px]">
            <Weather />
          </div>
          <div>
            <NotePage isCashier={true} />
          </div>
          <div className="relative">
            <BellRing className="text-primary w-7 h-7" />

            <Badge
              variant={"destructive"}
              className="absolute -top-2 -right-1 rounded-full flex align-middle justify-center items-center w-5 h-5 bg-[#E38157] border-[#E38157] text-white"
            >
              {notificationCount}
            </Badge>
          </div>
          <div>
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage src={minio_img_url + meUser?.avatar?.path} />
              <AvatarFallback className="bg-primary text-white w-[50px] flex items-center justify-center h-[50px]">
                {meUser?.firstName?.[0]}
                {meUser?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex items-center">
          <p className="text-[14px] leading-[17px] font-semibold text-foreground mx-2">
            {currency?.items?.[0]?.usd.toLocaleString("uz-UZ")} $
          </p>
          ~
          <p className="text-[14px] leading-[17px] font-semibold text-[#E38157]">
            {currency?.items?.[0]?.uzs.toLocaleString("uz-UZ")} сум
          </p>
        </div>
      </div>
    </header>
  );
}
