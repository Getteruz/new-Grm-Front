
import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import Filter from "./filter";
import  {  useDataKassa, useKassaReportTotal } from "./queries";
import CardSort from "@/components/card-sort";
import { KassaColumns } from "./columns";
import {  parseAsIsoDate, useQueryState } from "nuqs";
import { useParams } from "react-router-dom";
import { useCashflowFilial, useKassaReportSingle } from "../../m-manager/filial-report-finance/queries";
import { TData } from "./type";

export default function Page() {
  const { meUser } = useMeStore();
  const {id} = useParams()

  const [startDate] = useQueryState("startDate",parseAsIsoDate);
  const [endDate] = useQueryState("endDate",parseAsIsoDate);

  const {data:KassaReport} = useKassaReportTotal({
    queries:{
      filialId:meUser?.filial?.id || '',
    },
    enabled:Boolean(!id && meUser?.filial?.id),
})

const { data: KassaReportSingle } = useKassaReportSingle({
  id:id || undefined,
  enabled: Boolean(id),
});

  const { data:kassaData, isLoading:KassaLoading, fetchNextPage:KassafetchNextPage, hasNextPage:KassafhasNextPage, isFetchingNextPage:KassaisFetchingNextPage } =
  useDataKassa({
    queries: {
      filial: meUser?.filial?.id || undefined,
      page: 1,
      limit:10,
      report:id || undefined,
      startDate:startDate || undefined ,
      endDate:endDate|| undefined,
    },
  });

  const flatKasssaData = kassaData?.pages?.flatMap((page) => page?.items || []) || [];

  const {data:cashflowFilial} = useCashflowFilial({
    id:id || undefined,
    enabled:Boolean(id) 
  })
  
  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">
     <CardSort isAddible={Boolean(id)} kassaReportId={id}  KassaReport={id ? KassaReportSingle: KassaReport }/>
      <DataTable 
        columns={KassaColumns || []}
        data={ id ?[
          {
            id:'my',
            status:"Мои приходы и расходы",
            income: cashflowFilial?.income,
            expense: cashflowFilial?.expense,
        }as TData, ...flatKasssaData]:flatKasssaData}
        isLoading={KassaLoading}
        isRowClickble={true}

        fetchNextPage={KassafetchNextPage}
        hasNextPage={KassafhasNextPage ?? false}
        isFetchingNextPage={KassaisFetchingNextPage}
      />
      </div>
    </>
  );
}
