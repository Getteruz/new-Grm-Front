import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import ActionPage from "../form";
import { Columns } from "./columns";
import Filters from "./filters";
import useDataFetch from "./queries";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search");
  const { data, isLoading } = useDataFetch({
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
      className="mx-4"
        isLoading={isLoading}
        columns={Columns}
        data={data?.items ?? []}
      />


      <ActionPage/>
    </>
  );
}
