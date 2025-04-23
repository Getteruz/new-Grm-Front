import { parseAsInteger, useQueryState } from "nuqs";

import CardSort from "@/components/card-sort";
import { DataTable } from "@/components/ui/data-table";

import { Columns } from "./columns";
import Filter from "./filter";
import useDataLibrary from "./queries";

export default function Page() {
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
      <CardSort />
      <DataTable
        className="px-4"
        isLoading={isLoading}
        columns={Columns}
        data={data?.items ?? []}
      />
    </>
  );
}
