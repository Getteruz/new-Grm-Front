import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import ActionPageQrCode from "../form";
import { Columns } from "./columns";
import Filter from "./filter";
import useDataLibrary from "./queries";
import { useMeStore } from "@/store/me-store";
enum ProductReportEnum {
  SURPLUS = 'излишки',
  DEFICIT = 'дефицит',
  INVENTORY = 'переучет',
}
export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search");
  const {meUser} =useMeStore()
  const { data, isLoading } = useDataLibrary({
    queries: {
      limit,
      page,
      search: search || undefined,
      filialId:meUser?.filial?.id ||'',
      type:"излишки",
    },
  });



  return (
    <div className="flex w-full">
      <ActionPageQrCode/>
      <div className="w-2/3 ">
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
