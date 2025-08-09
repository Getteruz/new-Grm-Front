import { apiRoutes } from "@/service/apiRoutes";
import api from "@/service/fetchInstance";
import { useMeStore } from "@/store/me-store";
import { useMutation } from "@tanstack/react-query";
import { getMonth, getYear } from "date-fns";
import { FileInput, Printer } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import qs from "qs";
import { RefObject } from "react";
import { useReactToPrint } from "react-to-print";

type RightContentProps = {
  printRef: RefObject<HTMLDivElement | null> ;
};

export default function RightConent({printRef}:RightContentProps) {
  const { meUser } = useMeStore();
  const [month] = useQueryState(
    "month",
    parseAsString.withDefault(getMonth(new Date()) + 1 + "")
  );
  const [filial] = useQueryState("filial");

  const { mutate } = useMutation({
    mutationFn: async () => {
      const query = {
        month: +month || undefined,
        year: getYear(new Date()),
        filialId:
          meUser?.position?.role == 4
            ? meUser?.filial?.id
            : filial || undefined,
      };
      const params = query
        ? `?${qs.stringify(query, { arrayFormat: "repeat" })}`
        : "";
      const blob = await api.get(apiRoutes.paperReportStaticExport + params, {
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

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    // @ts-ignore
    content: () => {
      if (!printRef.current) {
        return null;
      }
      return printRef.current;
    },
    documentTitle: "Хисобот",
    removeAfterPrint: true,
  });

  return (
    <div className="w-[380px] h-full">
      <p className="border-b mt-auto h-[56px] px-[31px] text-[#272727] py-[18px] border-border">
        Годовой отчет
      </p>

      <div className="p-[24px] text-[#272727]">
        <div
          onClick={() => mutate()}
          className="flex cursor-pointer items-center py-[13px] px-[23px] rounded-sm bg-white text-[16px] font-normal gap-1"
        >
          <FileInput size={20} /> Экспорт в Excel
        </div>

        <div onClick={()=>handlePrint()} className="flex  cursor-pointer mt-2 items-center py-[13px] px-[23px] rounded-sm bg-white text-[16px] font-normal gap-1">
          <Printer size={20} /> Распечатать
        </div>
      </div>
    </div>
  );
}
