import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import { StatementColumns } from "./columns";
import Filters from "./filters";
import useStatementsData from "./queries";

export default function MonthReportPage() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [status] = useQueryState("status");
  const [startDate] = useQueryState("startDate");
  const [endDate] = useQueryState("endDate");
  const [search] = useQueryState("search");


  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useStatementsData({
      queries: {
        limit,
        page,
        status: status || undefined,
        startDate: startDate || undefined,   
        endDate: endDate || undefined,
        search: search || undefined,
      },
    });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];


  return (
    <>
      <Filters />

      <DataTable
        className="m-4"
        isLoading={isLoading}
        columns={StatementColumns || []}
        data={flatData ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
        isRowClickble
      />

    </>
  );
}
