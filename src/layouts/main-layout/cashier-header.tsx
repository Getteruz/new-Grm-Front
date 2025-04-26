import AddingParishOrFlow from "@/components/adding-parish-flow";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getAllData, getByIdData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { useMeStore } from "@/store/me-store";
import { IOpenKassa } from "@/types/api-type";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";

import { BellRing } from "lucide-react";
import NotePage from "./note/list";
import Weather from "./weather";
import { useAuthStore } from "@/store/auth-store";
import { CurrencyData } from "./types";
import { DollarIcon } from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { minio_img_url } from "@/constants";
import { any } from "zod";

export default function CashierHeader() {
  const { meUser } = useMeStore();
  const token = useAuthStore((state) => state.token);
  
  const filialId = meUser?.filial.id
  const { data } = useQuery({
    queryKey: [apiRoutes.filial, filialId],
    queryFn: () =>
      getByIdData<IOpenKassa, void>(
        "/kassa/open-kassa",
        filialId || ""
      ),
    enabled: !!filialId,
  });
  const { data: currency } = useQuery({
      queryKey: ["currency", token, meUser],
      queryFn: () => getAllData<CurrencyData, unknown>("currency"),
  });

  return (
    <header className="h-[90px] bg-sidebar border-b border-border flex ">
      <div className="flex p-[15px] mr-auto items-center">
        <DollarIcon />
        <div>
          <p className="text-[12px] ext-primary ">Касса за сегодня:</p>
          <p className="text-[25px] font-bold text-primary">{data?.totalSum}</p>
        </div>
      </div>
      <AddingParishOrFlow />
      <div className="ml-8">
        <div className="flex items-center justify-between w-full max-w-[312px] pr-3 gap-5">
          <div className="flex text-primary items-center gap-[5px]">
            <Weather className={"ml-0"} />
          </div>
          <div>
            <NotePage isCashier={true} />
          </div>
          <div className="relative">
            <BellRing className="text-primary w-7 h-7" />
            <Badge variant={"destructive"} className="absolute -top-2 -right-1 rounded-full flex align-middle justify-center items-center w-5 h-5 bg-[#E38157] border-[#E38157] text-white">2</Badge>
          </div>
          <div>
            <Avatar className="w-[50px] h-[50px]">
              <AvatarImage src={minio_img_url + meUser?.avatar?.path.slice(1)}/>
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
          </p>~
          <p className="text-[14px] leading-[17px] font-semibold text-[#E38157]">
            {currency?.items?.[0]?.uzs.toLocaleString("uz-UZ")} сум
          </p>
        </div>
      </div>
      
    </header>

  );
}
