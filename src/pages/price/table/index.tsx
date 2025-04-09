import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import { ProductColumns } from "./columns";
import useProduct from "./queries";
import Filters from "./filters";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const [search] = useQueryState("search");
  const { data, isLoading } = useProduct({
    queries: {
      limit,
      page,
      search: search || undefined,
    },
  });

  return (
    <>
     <Filters />
      <DataTable
        className="m-4"
        isLoading={isLoading}
        columns={ProductColumns}
        data={data?.items ?? []}
      />
    </>
  );
}
