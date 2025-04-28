import { parseAsInteger, useQueryState } from "nuqs";

import CardSort from "@/components/card-sort";
import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { Columns, ColumnsDManager, ColumnsFManager } from "./columns";
import Filter from "./filter";
import useDataLibrary from "./queries";

export default function Page() {
  const { meUser } = useMeStore();

  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search");
  const { data, isLoading } = useDataLibrary({
    queries: {
      limit,
      page,
      search: search || undefined,
    },
  });
  const staticData = [
    {
      id: "0daa0741-2447-40d6-830f-3a8a9a715ab0",
      price: 12,
      type: "Приход",
      tip: "cashflow",
      comment: "avdfd",
      title: null,
      date: "2025-04-23T08:55:08.309Z",
      is_online: true,

      cashflow_type: {
        title: "Приход",
      },
      order: null,
    },
    {
      id: "babb5613-f874-4876-b19f-e8c44c440f82",
      price: 12,
      type: "Расход",
      tip: "cashflow",
      comment: "asddsasd",
      title: null,
      date: "2025-04-23T08:53:17.593Z",
      is_online: true,

      cashflow_type: {
        title: "Трансфер",
      },
    },
    {
      id: "74391b1c-ae16-4850-8298-052ceb4f5c10",
      price: 500,
      type: "Приход",
      tip: "cashflow",
      comment: "",

      date: "2025-04-18T01:11:39.001Z",
      is_online: true,

      cashflow_type: {
        title: "Трансфер",
      },
    },
    {
      id: "015dce02-876c-4a05-a4c9-bf0c40cd7948",
      price: 500,
      type: "Приход",
      tip: "order",
      comment: "",

      date: "2025-04-18T06:15:47.277Z",
      is_online: true,
      cashflow_type: {
        title: "Приход",
      },
    },
  ];

  return (
    <>
      <Filter />
      <CardSort />
      <DataTable
        className="px-4"
        isLoading={isLoading}
        columns={
          meUser?.position?.role === 6
            ? ColumnsDManager
            : meUser?.position?.role === 4
              ? ColumnsFManager
              : Columns
        }
        data={data?.items ?? []}
      />
    </>
  );
}
