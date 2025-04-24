import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";

import { DataTable } from "@/components/ui/data-table";

import { ProductCharacteristicColumns } from "./columns";
import Filters from "./filters";
import useCharacteristicsFetch from "./queries";

export default function ProductCharacteristics() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  
  // State for selected characteristics
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCharacteristicsFetch({
      queries: {
        limit,
        page,
      },
    });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  // Function to clear selection
  const clearSelection = () => {
    setSelectedItems([]);
  };

  return (
    <>
      <Filters 
        selectedItems={selectedItems}
        clearSelection={clearSelection}
      />
      <DataTable
        isLoading={isLoading}
        columns={ProductCharacteristicColumns}
        data={flatData ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}