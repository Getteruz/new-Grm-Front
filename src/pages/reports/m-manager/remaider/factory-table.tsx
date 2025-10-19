import { DataTable } from "@/components/ui/data-table";

import {  FactoryColumns } from "./columns";
import Filter from "./filter";
import { parseAsString, useQueryState } from "nuqs";
import {  useFactoryReport } from "./queries";
import { useNavigate, useParams } from "react-router-dom";

export default function FoctoryTable() {
  const [filialId] = useQueryState("filial", parseAsString);
  const [month] = useQueryState("month", parseAsString);
  const {countryId} = useParams()
  const navigate = useNavigate()

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useFactoryReport({
      queries: {
        filialId: filialId || undefined,
        month: month || undefined,
        country:countryId
      },
      enabled: true,
    });

  const collections = data?.pages?.flatMap((page) => page?.data || []) || [];

  return (
    <>
      <Filter
        totalKv={data?.pages?.[0]?.meta.totals?.totalKv || 0}
        totalPrice={data?.pages?.[0]?.meta.totals?.totalPrice || 0}
        totalCount={data?.pages?.[0]?.meta.totals?.totalCount || 0}
      />
      <div className="h-[calc(100vh-140px)] scrollCastom">
        <DataTable
          columns={FactoryColumns}
          data={collections || []}
          isLoading={isLoading}
          isRowClickble={false}
          fetchNextPage={fetchNextPage}
          onRowClick={(item)=>navigate(`/m-manager/report-remaider/${countryId}/${item?.factory?.id}`)}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </>
  );
}
