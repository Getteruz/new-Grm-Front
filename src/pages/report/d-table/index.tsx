import Filter from "./filter";

import CardSortSingle from "./card-sort";
import { useDataKassa } from "./queries";
import { DataTable } from "@/components/ui/data-table";
import { Columns } from "./columns";

export default function DPage() {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useDataKassa({
 
    // enabled:  meUser?.position?.role == 9
  });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">
      {
      <CardSortSingle />
      }
    <DataTable
            columns={Columns || []}
            data={flatData||[]}
            isLoading={isLoading}
            isRowClickble={false}
          
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage ?? false}
            isFetchingNextPage={isFetchingNextPage}
          />
      </div>
    </>
  );
}
