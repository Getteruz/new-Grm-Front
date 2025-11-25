// import {  useQueryState } from "nuqs";
import { DataTable } from "@/components/ui/data-table";

import CardSort from "@/components/card-sort";
import { useCashflowFilial, useDataKassa, useKassaReportSingle } from "./queries";
import { KassaColumns } from "./columns";
import { useNavigate, useParams } from "react-router-dom";
import { parseAsBoolean, useQueryState } from "nuqs";

export default function PageFinanceFilial() {
  const {id}  =useParams()
  const navigate = useNavigate();
  const [,setFManagerCashFlow] = useQueryState("FManagerCashFlow",parseAsBoolean)
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
      <>
    
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
            onRowClick={(item) => {
              if(item?.status == "Филиал приходы и расходы"){
                navigate('f-managers' )
                setFManagerCashFlow(true)
              }else{
                setFManagerCashFlow(false)
              }
            }}
            className="h-[calc(100vh-310px)] scrollCastom"
            fetchNextPage={KassafetchNextPage}
            hasNextPage={KassafhasNextPage ?? false}
            isFetchingNextPage={KassaisFetchingNextPage}
          />
       
      </>
    </>
  );
}
