import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import { ClientColumns } from "./columns";
import { SORT_OPTIONS } from "./constants";
import Filters from "./filters";
import useCharacteristicsFetch from "./queries";

export default function ProductCharacteristics() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCharacteristicsFetch({
      queries: {
        limit,
        page,
      },
    });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filters sortOptions={SORT_OPTIONS} selectedItems={[]} clearSelection={function (): void {
        throw new Error("Function not implemented.");
      } } onCreateClient={function (): void {
        throw new Error("Function not implemented.");
      } } />
      <DataTable
        isLoading={isLoading}
        columns={ClientColumns()}
        data={flatData ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}
