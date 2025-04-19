import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import { FilialColumns } from "./columns";
import useData from "./queries";
import Filters from "./filters";
import ActionPage from "../form";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const [search] = useQueryState("search");

  const { data, isLoading,fetchNextPage,hasNextPage,isFetchingNextPage } = useData({
    queries: {
      limit,
      page,
      title: search || undefined,
    },
  });
  const flatData = data?.pages?.flatMap(page => page?.items || []) || [];
  return (
    <>
     <Filters />
    
      <DataTable
        className="m-4"
        isLoading={isLoading}
        columns={FilialColumns}
        // className={'max-h-screen overflow-y-scroll'}
        data={flatData ?? []}
         fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
            <ActionPage/>
    </>
  );
}
