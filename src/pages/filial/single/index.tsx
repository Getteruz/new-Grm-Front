import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import { Columns } from "./columns";
import Filter from "./filter";
import useDataFetch from "./queries";
import { useParams } from "react-router-dom";

export default function SinglePage() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search");
  const {id} = useParams()
  const { data, isLoading } = useDataFetch({
    queries: {
      limit,
      page,
      search: search || undefined,
      filialId:id || undefined
    },
  });

  return (
    <div className=" w-full">
        <Filter/>
        <DataTable
          isLoading={isLoading}
          columns={Columns}
          data={data?.items ?? []}
        />
    </div>
  );
}
