import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import Filter from "./filter";
import CardSort from "@/components/card-sort";
import {  parseAsIsoDate, useQueryState } from "nuqs";
import { useParams } from "react-router-dom";
import { Columns } from "./columns";
import { useDataCashflow } from "./queries";

export default function SinglePage() {
  const { meUser } = useMeStore();

  const { id } = useParams();

  const [startDate] = useQueryState("startDate",parseAsIsoDate);
  const [endDate] = useQueryState("endDate",parseAsIsoDate);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataCashflow({
      queries: {
        kassaId: id,
        limit: 10,
        page: 1,
        filialId: meUser?.filial?.id || undefined,
        fromDate: startDate || undefined,
        toDate: endDate || undefined,
      },
      enabled: Boolean( id),
    });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">
        <CardSort KassaId={id || undefined} />
        <DataTable
          columns={Columns}
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
