import { FileOutput, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import qs from "qs";
import { apiRoutes } from "@/service/apiRoutes";
import { useParams } from "react-router-dom";

export default function Filters() {
  const { id,report } = useParams();
 

  const { mutate: exelMudate, isPending: exelPending } = useMutation({
    mutationFn: async () => {
      const query = {
        // reportId: myCashFlow && !FManagerCashFlow ? id : undefined,
        kassaReportId: id=="my" ?report ||undefined: undefined,
        kassaId: id != "my" ?id :undefined,
      };
      const params = query
        ? `?${qs.stringify(query, { arrayFormat: "repeat" })}`
        : "";
  
      window.location.href = import.meta.env.VITE_BASE_URL+apiRoutes.excelCashflowsExcel + params;
    },
  });
  
  return (
    <div className="  px-[20px] h-[64px] items-center  flex   gap-2 mb-2  ">
        <p className="text-[#272727] text-[20px]">Касса магазина</p>
      <Button
        onClick={() => exelMudate()}
        className="h-full   w-[140px]  ml-auto"
        variant={"secondary"}
        disabled={exelPending}
      >
             {exelPending ? <Loader className="animate-spin"/>: <FileOutput />} Экспорт
      </Button>

    </div>
  );
}
