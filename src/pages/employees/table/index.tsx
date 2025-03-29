import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import { FilialColumns } from "./columns";
import useFilial from "./queries";
import Filters from "./filters";
import ActionPage from "../form";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const [search] = useQueryState("search");
  const { data, isLoading } = useFilial({
    queries: {
      limit,
      page,
      title: search || undefined,
    },
  });

  return (
    <>
     <Filters />
    
      <DataTable
        className="m-4"
        isLoading={isLoading}
        columns={FilialColumns}
        data={data?.items ?? []}
      />
            <ActionPage/>
    </>
  );
}
