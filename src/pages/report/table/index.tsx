
import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import Filter from "./filter";
import  {useKassaReportTotal } from "./queries";
import CardSort from "@/components/card-sort";
import CardSortSingle from "./card-sort";
import { useDataCashflow, useDataKassa } from "@/pages/cashier/report/queries";
import {  ReportColumns } from "@/pages/cashier/report/page/columns";
import { useQueryState } from "nuqs";
import { KassaColumns } from "./columns";

export default function Page() {
  const { meUser } = useMeStore();
  const [id] = useQueryState(
    "id"
  );

  const [filial] = useQueryState(
    "filial"
  );


  
  const {data:KassaReport} = useKassaReportTotal({
    queries:{
      filialId: meUser?.position?.role == 10  ? filial || undefined :  meUser?.filial?.id || undefined,
    },
    enabled: !id,
})

  const { data:kassaData, isLoading:KassaLoading, fetchNextPage:KassafetchNextPage, hasNextPage:KassafhasNextPage, isFetchingNextPage:KassaisFetchingNextPage } =
    useDataKassa({
    queries: {
      filial: meUser?.position?.role == 10  ? filial || undefined :  meUser?.filial?.id || undefined,
      page: 1,
    },
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useDataCashflow({
    queries: {
      kassaId:  id || undefined,
      limit: 10,
      page: 1,
      filialId: meUser?.position?.role == 10 ? filial || undefined :  meUser?.filial?.id || undefined,
    },
    enabled: Boolean(id || meUser?.position?.role ===  10),
  });


  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
  const flatKasssaData = kassaData?.pages?.flatMap((page) => page?.items || []) || [];
  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">
      {
        meUser?.position?.role === 6 ? <CardSortSingle />:<CardSort KassaReport={id ? undefined : KassaReport}  KassaId={ id || undefined }/>
      }
   
        { Boolean(id) || meUser?.position?.role ===  10  ?  <DataTable
              columns={ReportColumns}
              data={flatData || []}
              isLoading={isLoading}
              isRowClickble={false}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage ?? false}
              isFetchingNextPage={isFetchingNextPage}
            />:
            <DataTable
            columns={KassaColumns || []}
            data={flatKasssaData || []}
            isLoading={KassaLoading}
            fetchNextPage={KassafetchNextPage}
            hasNextPage={KassafhasNextPage ?? false}
            isFetchingNextPage={KassaisFetchingNextPage}
            />
          }
      </div>
    </>
  );
}
