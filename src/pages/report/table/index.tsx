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

  return (
    <>
      <Filter />
      <CardSort KassaId="" />
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
