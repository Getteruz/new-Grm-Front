import {  parseAsString, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import ActionPageQrCode from "../form";
import { Columns } from "./columns";
import Filter from "./filter";
import useDataLibrary from "./queries";
import { useMeStore } from "@/store/me-store";
// enum ProductReportEnum {
//   SURPLUS = 'излишки',
//   DEFICIT = 'дефицит',
//   INVENTORY = 'переучет',
// }
export default function Page() {
  const [search] = useQueryState("search");
  const {meUser} =useMeStore()
  const [type] = useQueryState('type',parseAsString.withDefault('переучет'))
  const { data, isLoading,fetchNextPage,hasNextPage,isFetchingNextPage } = useDataLibrary({
    queries: {
      search: search || undefined,
      filialId:meUser?.filial?.id ||'',
      type:type||"переучет",
    },
  });
  const flatData = data?.pages?.flatMap(page => page?.items || []) || [];
  return (
    <div className="flex w-full">
      <ActionPageQrCode/>
      <div className="w-2/3 ">
        <Filter/>
        <DataTable
          isLoading={isLoading}
          columns={Columns}
          data={flatData ?? []}
           fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}
