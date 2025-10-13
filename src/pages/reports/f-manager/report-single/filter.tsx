import { FileOutput } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import qs from "qs";
import api from "@/service/fetchInstance";
import { apiRoutes } from "@/service/apiRoutes";
import { useParams } from "react-router-dom";

export default function Filters() {
  const { id,report } = useParams();
  const { mutate: exelMudate } = useMutation({
    mutationFn: async () => {
      const query = {
        // reportId: myCashFlow && !FManagerCashFlow ? id : undefined,
        kassaReportId: id=="my" ?report ||undefined: undefined,
        kassaId: id != "my" ?id :undefined,
      };
      const params = query
        ? `?${qs.stringify(query, { arrayFormat: "repeat" })}`
        : "";
      const blob = await api.get(apiRoutes.excelCashflowsExcel + params, {
        responseType: "blob",
      });
      if (!(blob.data instanceof Blob)) {
        throw new Error("Received data is not a Blob");
      }
      const blobUrl = window.URL.createObjectURL(blob.data);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    },
  });
  return (
    <div className="  px-[20px] h-[64px] items-center  flex   gap-2 mb-2  ">
        <p className="text-[#272727] text-[20px]">Касса магазина</p>
      <Button
        onClick={() => exelMudate()}
        className="h-full   w-[140px]  ml-auto"
        variant={"secondary"}
      >
        <FileOutput /> Экспорт
      </Button>

    </div>
  );
}
