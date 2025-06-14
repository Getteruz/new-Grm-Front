
import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import Filter from "./filter";
import  {  useDataKassa, useKassaReportTotal } from "./queries";
import CardSort from "@/components/card-sort";
import { KassaColumns } from "./columns";
import { parseAsIsoDate, useQueryState } from "nuqs";
import { useParams } from "react-router-dom";

export default function Page() {
  const { meUser } = useMeStore();
  const {id} = useParams()

  const [startDate] = useQueryState("startDate",parseAsIsoDate);
  const [endDate] = useQueryState("endDate",parseAsIsoDate);

  const {data:KassaReport} = useKassaReportTotal({
    queries:{
      filialId:meUser?.filial?.id || '',
    },
    enabled:Boolean(meUser?.filial?.id),
})

  const { data:kassaData, isLoading:KassaLoading, fetchNextPage:KassafetchNextPage, hasNextPage:KassafhasNextPage, isFetchingNextPage:KassaisFetchingNextPage } =
  useDataKassa({
    queries: {
      filial: meUser?.filial?.id || undefined,
      page: 1,
      limit:10,
      report:id || undefined,
      startDate:startDate || undefined ,
      endDate:endDate|| undefined,
    },
  });


  const flatKasssaData = kassaData?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">
     <CardSort  KassaReport={ KassaReport }/>
      <DataTable 
        columns={KassaColumns || []}
        data={flatKasssaData || []}
        isLoading={KassaLoading}
        isRowClickble={true}
        fetchNextPage={KassafetchNextPage}
        hasNextPage={KassafhasNextPage ?? false}
        isFetchingNextPage={KassaisFetchingNextPage}
      />
      </div>
    </>
  );
}
