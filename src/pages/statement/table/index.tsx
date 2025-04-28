import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import CreateStatementModal from "../form/CreateStatementModal";
import { StatementColumns } from "./columns";
import Filters from "./filters";
import useStatementsData from "./queries";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [status] = useQueryState("status");
  const [fromDate] = useQueryState("fromDate");
  const [toDate] = useQueryState("toDate");
  const [search] = useQueryState("search");
  const [id, setId] = useQueryState("id");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useStatementsData({
      queries: {
        limit,
        page,
        status: status || undefined,
        fromDate: fromDate || undefined,
        toDate: toDate || undefined,
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
        columns={StatementColumns}
        data={flatData ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
        isRowClickble
      />
      
      <CreateStatementModal 
        isOpen={id === "new"} 
        onClose={() => setId(null)} 
      />
    </>
  );
}