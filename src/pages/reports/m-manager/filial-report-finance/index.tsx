// import {  useQueryState } from "nuqs";
import { DataTable } from "@/components/ui/data-table";

import CardSort from "@/components/card-sort";
import { useCashflowFilial, useDataKassa, useKassaReportSingle } from "./queries";
import { KassaColumns } from "./columns";
import { useParams } from "react-router-dom";

export default function PageFinanceFilial() {
  const {id}  =useParams()
  
  const { data:kassaData, isLoading:KassaLoading, fetchNextPage:KassafetchNextPage, hasNextPage:KassafhasNextPage, isFetchingNextPage:KassaisFetchingNextPage } =
  useDataKassa({
    queries: {
      page: 1,
      limit:10,
      report:id || undefined,
    
    },
  });

  const { data: KassaReportSingle } = useKassaReportSingle({
    id:id || undefined,
    enabled: Boolean(id),
  });

    const {data:cashflowFilial} = useCashflowFilial({
      id:id || undefined,
      enabled:Boolean(id) 
    })
    
  const flatKasssaData =
    kassaData?.pages?.flatMap((page) => page?.items || []) || []

  return (
    <>
      <div className="h-[calc(100vh-140px)] scrollCastom">
    
          <CardSort KassaReport={ KassaReportSingle} />
       
          <DataTable
            columns={KassaColumns || []}
            data={[
              {
                status:"Филиал приходы и расходы",
                income: cashflowFilial?.income,
                expense: cashflowFilial?.expense,
            }, ...flatKasssaData]}
            isLoading={KassaLoading}
            isRowClickble={true}
            // onRowClick={(data) => data?.id ?
            //   navigate(`/report?id=${data?.id}`) : navigate(`/report?Myid=myReport&kassaReports=${kassaReports}`)
            // }
            fetchNextPage={KassafetchNextPage}
            hasNextPage={KassafhasNextPage ?? false}
            isFetchingNextPage={KassaisFetchingNextPage}
          />
       
      </div>
    </>
  );
}
