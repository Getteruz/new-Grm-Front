import { FileOutput, Loader2, Store, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMeStore } from "@/store/me-store";
import FilterSelect from "@/components/filters-ui/filter-select";
import useDataFetch from "@/pages/filial/table/queries";
import { useMutation } from "@tanstack/react-query";
import { apiRoutes } from "@/service/apiRoutes";
import {  UpdatePatchData } from "@/service/apiHelpers";
import { toast } from "sonner";
import { useQueryState } from "nuqs";

export default function Filters({ids,setSeleted}:{ids:string[],setSeleted:(ids:string[])=>void}) {
  const { meUser } = useMeStore();
  const {data} = useDataFetch({
    queries:{type:"filial",limit:50}
  })

  const [kassaReports] = useQueryState("kassaReports");

const { mutate, isPending } = useMutation({
  mutationFn: () => UpdatePatchData(apiRoutes.kassaReports,kassaReports || "", {}),
  onSuccess: () => {
    toast.success("close");
    setSeleted([]);
  },
  onError: (error) => {
    toast.error(error?.message)
    setSeleted([]);
  },
});

  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px] items-center  flex   ">
      {meUser?.position.role === 4 &&
        <p className="text-[#272727] text-[20px]">Ежемесячный отчет</p>
      }
    
      {meUser?.position?.role == 10 && <FilterSelect placeholder="все" options={data?.pages[0]?.items?.map(e=>  ({label:e?.name, value:e?.id})) || []} name="filial" icons={<><Store/></>}/>}
      <Button
        className="h-full  border-y-0 w-[140px]  ml-auto"
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
{kassaReports &&   <Button
      onClick={()=>mutate()}
        disabled={ isPending}
        className="h-full border-l-0 bg-primary hover:bg-[#525248] hover:text-accent text-accent border-y-0 w-[165px]  "
        variant={"outline"}
      >
        {isPending ? <Loader2/>: <X /> }

       Закрыть кассу
      </Button>}
    </div>
  );
}
