import Filter from "./filter";

import { useDataKassa } from "./queries";
import { DataTable } from "@/components/ui/data-table";
import { Columns } from "./columns";
// import CardSort from "../report/card-sort";

export default function ReportMonthlyPage() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataKassa({});

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">
        {/* {<CardSort />} */}
        <DataTable
          columns={Columns || []}
          data={flatData || []}
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
