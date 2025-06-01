import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import ActionPage from "../form";
import { Columns } from "./columns";
import Filters from "./filters";
import useDataFetch from "./queries";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [country] = useQueryState("country");
  const [factory] = useQueryState("factory");
  const [partiyaNumber] = useQueryState("partiya-number");
  const [search] = useQueryState("search");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataFetch({
      queries: {
        limit,
        page,
        country: country || undefined,
        partiya_no: partiyaNumber || undefined,
        factory: factory || undefined,
        search: search || undefined,
      },
    });
    
  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filters />
      <DataTable
        isLoading={isLoading}
        columns={Columns}
        data={flatData ?? []}
        className="h-full"
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isRowClickble
        isFetchingNextPage={isFetchingNextPage}
      />

      <ActionPage />
    </>
  );
}
