// table/index.tsx
import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import CreateBonusModal from "../table/CreateBonusModal";
import { BonusColumns } from "./columns";
import Filters from "./filters";
import useBonusesData from "./queries";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search");
  const [id, setId] = useQueryState("id");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useBonusesData({
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
        columns={BonusColumns}
        data={flatData ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
      
      <CreateBonusModal 
        isOpen={id === "new"} 
        onClose={() => setId(null)} 
      />
    </>
  );
}