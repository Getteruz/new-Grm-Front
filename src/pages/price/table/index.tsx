import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import { Columns } from "./columns";
import Filters from "./filters";
import useDataFetch from "./queries";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const [search] = useQueryState("search");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataFetch({
      queries: {
        limit,
        page,
        search: search || undefined,
      },
    });
  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filters />
      <DataTable
        // onSelectionChange={(e) => {
        //   if(e?.length){
        //    setIds({id:e?.map(items=>items?.id)});
        //   }
        // }}
        isLoading={isLoading}
        columns={Columns}
        data={flatData ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}
