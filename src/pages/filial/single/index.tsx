import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import ActionPageQrCode from "../form";
import { Columns } from "./columns";
import Filter from "./filter";
import useDataFetch from "./queries";
// enum ProductReportEnum {
//   SURPLUS = 'излишки',
//   DEFICIT = 'дефицит',
//   INVENTORY = 'переучет',
// }
export default function SinglePage() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search");
  const { data, isLoading } = useDataFetch({
    queries: {
      limit,
      page,
      search: search || undefined,
      type:"излишки",
    },
  });

  return (
    <div className="flex w-full">
      <ActionPageQrCode/>
      <div className="w-full ">
        <Filter/>
        <DataTable
          isLoading={isLoading}
          columns={Columns}
          data={data?.items ?? []}
        />
      </div>
    </div>
  );
}
