import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { Columns, ColumnsDManager, ColumnsFManager } from "./columns";
import Filter from "./filter";
import useDataLibrary from "./queries";
import CardSort from "./card-sort";

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

  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">
      <CardSort />

      <DataTable
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
      </div>
    </>
  );
}
