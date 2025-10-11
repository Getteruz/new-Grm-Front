import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {  getByIdData, PatchData } from "@/service/apiHelpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/service/apiRoutes";
import AddingParishOrFlow from "@/components/adding-parish-flow";
import { useMeStore } from "@/store/me-store";
import { IOpenKassa } from "@/types/api-type";



export default function Pricecheck({disabled,id}:{disabled?:boolean,id:string}) {
  const { meUser } = useMeStore();
  const filialId = meUser?.filial.id;
  const { mutate, isPending } = useMutation({
    mutationFn: () => PatchData(apiRoutes.kassaClose, {
      ids:[id]
    }),
    onSuccess: () => {
      toast.success("close");
    },
  });
  const { data } = useQuery({
    queryKey: [apiRoutes.filial, filialId],
    queryFn: () =>
      getByIdData<IOpenKassa, void>("/kassa/open-kassa", filialId || ""),
    enabled: !!filialId,
  });
  return (
    <div className="w-full border-border border-l bg-card max-w-[312px] h-[calc(100vh-90px)] flex flex-col justify-between  pb-[10px] pt-6 sticky top-0">
      <AddingParishOrFlow kassaId={String(data?.id)} />
      <div></div>
      <div className="w-full mt-8">
      <Button 
        onClick={()=>mutate()}
        disabled={isPending || disabled}
        className="w-full py-10.5 p-10 bg-primary mt-auto text-background text-[22px] font-semibold">
          Закрыть кассу
        </Button>
        <div className="flex items-center text-primary justify-between px-4 py-2">
          <p className="text-[14px] font-medium mr-3 ">
            {format(new Date(), "dd-MMMM. yyyy")}
          </p>
          <p className="text-[14px] font-medium">
            {format(new Date(), "hh:mm")}
          </p>
        </div>
      
      </div>
    </div>
  );
}
