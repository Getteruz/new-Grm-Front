import AddingParishOrFlow from "@/components/adding-parish-flow";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getByIdData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { useMeStore } from "@/store/me-store";
import { IOpenKassa } from "@/types/api-type";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";

import { BellRing, DollarSign, StickyNote } from "lucide-react";

export default function CashierHeader() {
  const {meUser} = useMeStore()
  const {data} = useQuery({
    queryKey: [apiRoutes.filial,],
    queryFn: () =>
      getByIdData<IOpenKassa, void>(
        '/kassa/open-kassa',
        meUser?.filial?.id || ""
      ),
      enabled: !!meUser?.filial?.id,
  });

  return (
    <header className="h-[90px] bg-sidebar border-b border-border flex ">
          <div className="flex p-[15px] mr-auto items-center">
            <DollarSign className="text-primary" size={54}/>
            <div>
                <p className="text-[12px] ext-primary ">Касса за сегодня:</p>
                <p className="text-[25px] font-bold text-primary">{data?.totalSum}</p>
            </div>
          </div>
          <AddingParishOrFlow/>

       <div className="flex items-center w-full max-w-[312px] gap-5 px-10">
          <div className="flex text-primary items-center gap-[5px]">
            {/* <RinigIcons/> */}
            <p className="text-[25px] leading-[30px] text-primary relative">
              13
              <span className="text-[8px] leading-[12px] text-foreground absolute -top-[4px] -right-[5px]">
                ° C
              </span>
            </p>
          </div>
          <div>
          <StickyNote className="text-primary w-6 h-6" />
          </div>
          <div>
          <BellRing className="text-primary w-6 h-6" />
          </div>
          <div>
          <Avatar className="w-[50px] h-[50px]">
            <AvatarFallback className="bg-primary text-white w-[50px] flex items-center justify-center h-[50px]">{meUser?.firstName?.[0]} { meUser?.lastName?.[0]}</AvatarFallback>
          </Avatar>
          </div>
       </div>
    </header>
  )
}
