import { Row } from "@tanstack/react-table";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";

import TabsFilter from "@/components/filters-ui/tabs-filter";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { ProductsData } from "../type";
import { NotPublishedProductColumns } from "./columns";
import Filters from "./filters";
import useNotPublishedDataFetch from "./queries";

export default function NotPublishedPage() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [filial] = useQueryState("filial");
  const [search] = useQueryState("search");
  const { meUser } = useMeStore();
  
  // State for selected product IDs
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotPublishedDataFetch({
      queries: {
        limit,
        page,
        search: search || undefined,
        filialId:
          filial ||
          meUser?.position?.role === 2 ||
          meUser?.position?.role === 3 ||
          meUser?.position?.role === 4 ||
          meUser?.position?.role === 5 ||
          meUser?.position?.role === 7
            ? meUser?.filial?.id
            : undefined,
          isInternetShop: false,
      },
    });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  // Selection handlers
  const clearSelection = () => {
    setSelectedProducts([]);
  };

  const handleRowSelectionChange = (row: Row<ProductsData>, checked: boolean) => {
    if (checked) {
      setSelectedProducts(prev => [...prev, row.original.id]);
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== row.original.id));
    }
  };

  const handleSelectAllChange = (checked: boolean) => {
    if (checked) {
      // Select all visible rows
      const allIds = flatData.map(item => item.id);
      setSelectedProducts(allIds);
    } else {
      // Clear selection
      clearSelection();
    }
  };

  // Enhanced columns with selection
  const columnsWithSelection = [
    {
      id: "select",
      header: ({ table }: { table: import('@tanstack/react-table').Table<ProductsData> }) => (
        <Checkbox
          checked={
            table.getRowModel().rows.length > 0 &&
            table.getRowModel().rows.every(row => 
              selectedProducts.includes(row.original.id)
            )
          }
          onCheckedChange={(checked) => handleSelectAllChange(!!checked)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }: { row: Row<ProductsData> }) => (
        <Checkbox
          checked={selectedProducts.includes(row.original.id)}
          onCheckedChange={(checked) => handleRowSelectionChange(row, !!checked)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...NotPublishedProductColumns
  ];

  return (
    <>
      <Filters 
        isNotPublished={true} 
        selectedProducts={selectedProducts}
        clearSelection={clearSelection}
      />
      {meUser?.position?.role === 9 ||
        (search && (
          <div className="bg-sidebar py-0.5 px-[50px]">
            <TabsFilter />
          </div>
        ))}
      <DataTable
        isLoading={isLoading}
        columns={columnsWithSelection}
        data={flatData ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}