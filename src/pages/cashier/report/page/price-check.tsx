import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {  PatchData } from "@/service/apiHelpers";
import { useMutation } from "@tanstack/react-query";
import { apiRoutes } from "@/service/apiRoutes";



export default function Pricecheck({id}:{id:string}) {

  const { mutate, isPending } = useMutation({
    mutationFn: () => PatchData(apiRoutes.kassaClose, {
      ids:[id]
    }),
    onSuccess: () => {
      toast.success("close");
    },
    onError: (error) => {
      toast.error(`Ошибка: ${error.message || "Не удалось добавить операцию"}`);
    },
  });
  return (
    <div className="w-full bg-card max-w-[312px] h-[calc(100vh-130px)] flex flex-col justify-between  p-[10px] pt-0 sticky top-10">
      <div></div>
      <div className="w-full mt-8">
        <div className="flex items-center text-primary justify-end px-4 py-2">
          <p className="text-[14px] font-medium mr-3 ">
            {format(new Date(), "dd-MMMM. yyyy")}
          </p>
          <p className="text-[14px] font-medium">
            {format(new Date(), "hh:mm")}
          </p>
        </div>
        <Button 
        onClick={()=>mutate()}
        disabled={isPending}
        className="w-full py-10.5 p-10 bg-primary mt-auto text-background text-[22px] font-semibold">
          Закрыть кассу
        </Button>
      </div>
    </div>
  );
}
