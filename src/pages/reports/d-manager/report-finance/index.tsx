import { DataTable } from "@/components/ui/data-table";

import { useReports } from "./queries";
import { KassaColumnsLoc } from "./columns";


export default function PageFinance() {
  const {
    data: kassaData,
    isLoading: KassaLoading,
    fetchNextPage: KassafetchNextPage,
    hasNextPage: KassafhasNextPage,
    isFetchingNextPage: KassaisFetchingNextPage,
  } = useReports({
    queries: {
      page: 1,
      filialType:"dealer"
    },
  })

  const flatKasssaData =
    kassaData?.pages?.flatMap((page) => page?.items || []) || []
    
  return (
    <>
      <div className="h-[calc(100vh-140px)] scrollCastom">
          <DataTable
            columns={KassaColumnsLoc || []}
            data={flatKasssaData}
            isLoading={KassaLoading}
            // isRowClickble={true}
            fetchNextPage={KassafetchNextPage}
            hasNextPage={KassafhasNextPage ?? false}
            isFetchingNextPage={KassaisFetchingNextPage}
          />
     
      </div>
    </>
  );
}
