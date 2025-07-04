
import { DataTable } from "@/components/ui/data-table";

import ActionPageQrCode from "../form";
import { Columns, ColumnsColaction } from "./columns";
import Filter from "./filter";
import { useParams } from "react-router-dom";
import useDataFetch from "./queries";
import {  parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";
import { useMeStore } from "@/store/me-store";
import { usePartiyaById } from "../../form/actions";
// import useDataLibrary from "./queries";


export default function ItemsPage() {
  const [search] = useQueryState("search");
  const {id} = useParams();
  const [tip] = useQueryState("tip",parseAsString.withDefault("new"));
  const [type] = useQueryState("type",parseAsString.withDefault("default"));
  const [,setBarCode] = useQueryState("barcode");
  const { meUser } = useMeStore();

  const { data:onePartiya } = usePartiyaById({
    id: id  ? id : undefined,
    queries: {
      populate: "*",
    },
  });
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
      useDataFetch({
      queries: {
        search: search || undefined,
        partiyaId: id|| "",
        type: type ||"default",
        tip :tip == "new" ? undefined : tip || undefined
      },
    });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
const LocalColums = useMemo(()=>{
  if(type == "collection" ){
    if(meUser?.position.role==7){
      return ColumnsColaction.filter((col) => col.header !== "Сумма" && col.header !== "Зав.цена" && col.header !== "Расход")
    }else{
      return ColumnsColaction 
    }
  }else{
    return Columns
  }
},[type])

console.log(onePartiya)
  return (
    <div className="flex w-full">
      <ActionPageQrCode />
      <div className="w-2/3">
        <Filter  check={onePartiya?.check} partiyaStatus={onePartiya?.partiya_status}/>
        <DataTable
          onRowClick={(e)=>{
            if(type == "default"){
              setBarCode(e?.bar_code?.code)
            }
          }}
          isLoading={isLoading}
          columns={LocalColums}
          className={tip == "излишки" ? "h-[calc(50vh-61px)] scrollCastom":"h-[calc(100vh-103px)] scrollCastom"}
          data={flatData ||[]}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
         {tip == "излишки" &&   <DataTable
          isLoading={isLoading}
          columns={Columns}
          className={tip == "излишки" ? "h-[calc(50vh-61px)]  scrollCastom":"h-[calc(100vh-103px)] scrollCastom"}
          data={flatData ||[]}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />}
      </div>
    </div>
  );
}
