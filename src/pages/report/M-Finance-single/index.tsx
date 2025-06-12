import { DataTable } from "@/components/ui/data-table";

import CardSort from "@/components/card-sort";
import { KassaColumnsLoc } from "./columns";
import { useReportsSingle } from "./queries";
import { useNavigate, useParams } from "react-router-dom";

export default function PageMFinanceSingle() {
  const {id} = useParams()
  const navigate = useNavigate()
  const {
    data: kassaData,
    isLoading: KassaLoading,
    // fetchNextPage: KassafetchNextPage,
    // hasNextPage: KassafhasNextPage,
    // isFetchingNextPage: KassaisFetchingNextPage,
  } = useReportsSingle({
    id: id ,
    enabled:Boolean(id),
    queries: {
      page: 1,
    },
  })

  // const flatKasssaData =
  //   kassaData?.pages?.flatMap((page) => page?.items || []) || []
    
  return (
    <>
      <div className="h-[calc(100vh-140px)] scrollCastom">
          <CardSort KassaReport={ kassaData} />
          <DataTable
            columns={KassaColumnsLoc || []}
            data={kassaData?.kassaReport || []}
            isLoading={KassaLoading}
            isRowClickble={false}
            onRowClick={(data) => 
               navigate(`/report-finance?kassaReports=${data?.id}`)
            }
            // fetchNextPage={KassafetchNextPage}
            // hasNextPage={KassafhasNextPage ?? false}
            // isFetchingNextPage={KassaisFetchingNextPage}
          />
     
      </div>
    </>
  );
}
