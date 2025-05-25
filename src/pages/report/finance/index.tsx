import {  useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { KassaColumns } from "./columns";
import Filter from "./filter";
import CardSortSingle from "../table/card-sort";
import CardSort from "@/components/card-sort";
import { useKassaReportTotal } from "../table/queries";
import { useKassaReports } from "./queries";

export default function PageFinance() {
  const { meUser } = useMeStore();

  const [id] = useQueryState(
    "id"
  );

  const {data:KassaReport} = useKassaReportTotal({
    queries:{
      filialId:meUser?.filial?.id || ""
    },
    enabled: !id,
})

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useKassaReports({
    queries: {
      filialId: meUser?.filial?.id || "",
    },
  });
  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">

      {
        meUser?.position?.role === 6? <CardSortSingle />:<CardSort KassaReport={id? undefined : KassaReport}  KassaId={ id || undefined }/>
      }
      <DataTable
         columns={KassaColumns}
         data={flatData || []}
         isLoading={isLoading}
         isRowClickble={false}
         fetchNextPage={fetchNextPage}
         hasNextPage={hasNextPage ?? false}
         isFetchingNextPage={isFetchingNextPage}

      />
      </div>
    </>
  );
}
