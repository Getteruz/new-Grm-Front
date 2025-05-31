
import { DataTable } from "@/components/ui/data-table";

import ActionPageQrCode from "../form";
import { Columns } from "./columns";
import Filter from "./filter";
// import useDataLibrary from "./queries";


export default function ItemsPage() {
  // const [search] = useQueryState("search");
  // const { meUser } = useMeStore();
  // const [type] = useQueryState("type", parseAsString.withDefault("переучет"));
  // const [, setIds] = useQueryState('ids',parseAsJson(schema.parse))

  // const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
  //   useDataLibrary({
  //     queries: {
  //       search: search || undefined,
  //       filialId: meUser?.filial?.id || "",
  //       type: type == "all" ? undefined : type || "переучет",
  //     },
  //   });

  // const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
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
          isLoading={false}
          columns={Columns}
          className={"max-h-[calc(100vh-63px)] scrollCastom"}
          data={ []}
          // fetchNextPage={fetchNextPage}
          // hasNextPage={hasNextPage ?? false}
          // isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}
