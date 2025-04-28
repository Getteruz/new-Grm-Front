// table/index.tsx
import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import CreateAwardModal from "../form/CreateAwardModal";
import { AwardColumns } from "./columns";
import Filters from "./filters";
import useAwardsData from "./queries";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search");
  const [id, setId] = useQueryState("id");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useAwardsData({
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
        className="m-4"
        isLoading={isLoading}
        columns={AwardColumns}
        data={flatData ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
      
      <CreateAwardModal 
        isOpen={id === "new"} 
        onClose={() => setId(null)} 
      />
    </>
  );
}