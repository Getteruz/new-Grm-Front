import { FileOutput, Store } from "lucide-react";

import FilterSelect from "@/components/filters-ui/filter-select";
import useDataFetch from "@/pages/filial/table/queries";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import api from "@/service/fetchInstance";
import qs from "qs";
import { useMutation } from "@tanstack/react-query";
import { apiRoutes } from "@/service/apiRoutes";
import { parseAsBoolean, useQueryState } from "nuqs";

export default function Filters() {
  const { id, kassaReportId } = useParams();
  const { data } = useDataFetch({
    queries: { type: "filial", limit: 50 },
  });

  const [myCashFlow] = useQueryState(
    "myCashFlow",
    parseAsBoolean.withDefault(false)
  );

  const [FManagerCashFlow] = useQueryState(
    "FManagerCashFlow",
    parseAsBoolean.withDefault(false)
  );

  const filialOption =
    data?.pages[0]?.items?.map((e) => ({
      label: e?.name,
      value: e?.id,
    })) || [];

  const { mutate: exelMudate } = useMutation({
    mutationFn: async () => {
      const query = {
        reportId: myCashFlow && !FManagerCashFlow ? id : undefined,
        kassaReportId: FManagerCashFlow ? kassaReportId || undefined : undefined,
        kassaId: myCashFlow ? undefined:  id || undefined,
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
    <div className=" px-[20px] h-[64px] items-center  flex gap-2 mb-2   ">
      {id ? (
        <p className="text-[#272727] text-[20px] mr-auto">Касса магазина</p>
      ) : (
        <>
          <FilterSelect
            placeholder="все"
            className="w-[200px] h-[65px] px-3"
            options={[{ value: "clear", label: "все" }, ...filialOption]}
            name="filial"
            icons={
              <>
                <Store />
              </>
            }
          />
          {/* <DateRangePicker fromPlaceholder={`от`} toPlaceholder={`до`} /> */}
        </>
      )}
      {id || kassaReportId  ? (
        <Button
          onClick={() => exelMudate()}
          className="h-full  border-y-0 w-[140px]  ml-auto"
          variant={"outline"}
        >
          <FileOutput /> Экспорт
        </Button>
      ) : (
        ""
      )}
      {/* <Button
        className="h-full border-l-0 bg-primary hover:bg-[#525248] hover:text-accent text-accent border-y-0 w-[165px]  "
        variant={"outline"}
      >
        <X /> Закрыть кассу
      </Button> */}
    </div>
  );
}
