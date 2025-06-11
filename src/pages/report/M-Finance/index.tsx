import { DataTable } from "@/components/ui/data-table";

import CardSort from "@/components/card-sort";
import { useReports } from "./queries";
import { KassaColumnsLoc } from "./columns";

export default function PageMFinance() {

  const {
    data: kassaData,
    isLoading: KassaLoading,
    fetchNextPage: KassafetchNextPage,
    hasNextPage: KassafhasNextPage,
    isFetchingNextPage: KassaisFetchingNextPage,
  } = useReports({
    queries: {
      page: 1,
    },
  })

  const flatKasssaData =
    kassaData?.pages?.flatMap((page) => page?.items || []) || []
    
  return (
    <>
      <div className="h-[calc(100vh-140px)] scrollCastom">
          <CardSort KassaReport={ undefined} />
          <DataTable
            columns={KassaColumnsLoc || []}
            data={flatKasssaData}
            isLoading={KassaLoading}
            isRowClickble={false}
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
