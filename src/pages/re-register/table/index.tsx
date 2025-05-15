import { parseAsString, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import ActionPageQrCode from "../form";
import { Columns } from "./columns";
import Filter from "./filter";
import useDataLibrary from "./queries";
// import { z } from "zod";
// enum ProductReportEnum {
//   SURPLUS = 'излишки',
//   DEFICIT = 'дефицит',
//   INVENTORY = 'переучет',
// }
// const schema = z.object({
//   id: z.array(z.string()),

// })

export default function Page() {
  const [search] = useQueryState("search");
  const { meUser } = useMeStore();
  const [type] = useQueryState("type", parseAsString.withDefault("переучет"));
  // const [, setIds] = useQueryState('ids',parseAsJson(schema.parse))

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataLibrary({
      queries: {
        search: search || undefined,
        filialId: meUser?.filial?.id || "",
        type: type == "all" ? undefined : type || "переучет",
      },
    });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
  return (
    <div className="flex w-full">
      <ActionPageQrCode />
      <div className="w-2/3">
        <Filter />
        <DataTable
          // onSelectionChange={(e) => {
          //   if(e?.length){
          //    setIds({id:e?.map(items=>items?.id)});
          //   }
          // }}
          isLoading={isLoading}
          columns={Columns}
          className={"max-h-[calc(100vh-63px)] scrollCastom"}
          data={flatData ?? []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}
