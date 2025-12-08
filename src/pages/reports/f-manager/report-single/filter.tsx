import { FileOutput, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import qs from "qs";
import { apiRoutes } from "@/service/apiRoutes";
import { useParams } from "react-router-dom";
import { parseAsString, useQueryState } from "nuqs";
import { getAllData } from "@/service/apiHelpers";
import { CashflowType } from "@/components/adding-parish-flow";
import FilterSelect from "@/components/filters-ui/filter-select";

export default function Filters() {
  const { id,report } = useParams();
 
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
        className="h-full   w-[140px]  "
        variant={"secondary"}
        disabled={exelPending}
      >
             {exelPending ? <Loader className="animate-spin"/>: <FileOutput />} Экспорт
      </Button>

    </div>
  );
}
