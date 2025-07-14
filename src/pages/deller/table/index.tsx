import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";
import ActionPageDealer from "@/pages/filial/formDealer";

import { Columns } from "./columns";
import Filter from "./filter";
import useDataFetch from "./queries";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  // const [search ] = useQueryState("search");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataFetch({
      queries: {
        limit,
        page,
        type: "dealer",
        // search:search || undefined,
      },
    });
  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filter />
      <DataTable
        isRowClickble={false}
        link="/report-monthly"
     
        isLoading={isLoading}
        columns={Columns}
        ischeckble={false}
        data={flatData ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
      <ActionPageDealer />
    </>
  );
}
