import { FileOutput, Loader, Store } from "lucide-react";

import FilterSelect from "@/components/filters-ui/filter-select";
import useDataFetch from "@/pages/filial/table/queries";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import qs from "qs";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/service/apiRoutes";
import { parseAsBoolean, parseAsString, useQueryState } from "nuqs";
import { MonthsArray } from "@/consts";
import { getAllData } from "@/service/apiHelpers";
import { CashflowType } from "@/components/adding-parish-flow";

export default function Filters({month,filial}:{month:number |undefined,filial:string| undefined}) {
  const { id, kassaReportId } = useParams();
  const { data } = useDataFetch({
    queries: { type: "filial", limit: 50 },
  });
  const [tip] = useQueryState("tip", parseAsString);
  const { data: cashflowTypesResponse } = useQuery({
    queryKey: ["/cashflow-types/for/cashier",tip],
    queryFn: () => getAllData<CashflowType[],object>("/cashflow-types/for/cashier",{
      type: tip == "expense" ? "out" : tip == "income" ? tip: undefined,
    }),
   select: (res) =>  res.map((item) => ({
    value:item?.slug ,
    label: item?.title,
  })),
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
    
    const { mutate: exelMudate, isPending: exelPending } = useMutation({
      mutationFn: async () => {
        const query = {
          reportId: myCashFlow && !FManagerCashFlow ? id : undefined,
          kassaReportId: FManagerCashFlow ? kassaReportId || undefined : undefined,
          kassaId: myCashFlow ? undefined : id || undefined,
        };
        const params = query
          ? `?${qs.stringify(query, { arrayFormat: "repeat" })}`
          : "";
    
        window.location.href = import.meta.env.VITE_BASE_URL+apiRoutes.excelCashflowsExcel + params;
      },
    });

  return (
    <div className=" px-[20px] h-[64px] items-center  flex gap-2 mb-2   ">
      {id ? (
         <p className="text-[#272727] text-[20px]  mr-auto "> Финансовый учёт | {month && MonthsArray[(month ||1)-1].label} | {filial}</p>
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
        <>
      
        <FilterSelect
            placeholder="все"
            className="w-[140px] h-[65px] px-3  ml-auto"
            options={
              cashflowTypesResponse ? [{ value: "clear", label: "все" } ,...cashflowTypesResponse] : []
            }
            
            name="cashflowSlug"
          />
            <Button
          onClick={() => exelMudate()}
          disabled={exelPending}
          variant={"secondary"}
          className="h-full  border-y-0 w-[140px] bg-card hover:bg-card "
        >
          {exelPending ? <Loader className="animate-spin"/>: <FileOutput />}
          Экспорт
        </Button>
        </>
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
