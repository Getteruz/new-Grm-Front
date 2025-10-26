import { DataTable } from "@/components/ui/data-table";

import {  SizeColumns } from "./columns";
import Filter from "./filter";
import { parseAsString, useQueryState } from "nuqs";
import { useSizeReport } from "./queries";
import {  useParams } from "react-router-dom";

export default function SizeTable() {
  const [filialId] = useQueryState("filial", parseAsString);
  const [month] = useQueryState("month", parseAsString);
  const [sort] = useQueryState("sort", parseAsString.withDefault("delears"));
  const [typeOther] = useQueryState("typeOther", parseAsString.withDefault("none"));
    const {modelId} = useParams()

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSizeReport({
      queries: {
        filialId: filialId || undefined,
        month: month || undefined,
        model:modelId,
        typeOther
      },
      enabled: sort == "delears",
    });

  const Sizes = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filter
        totalKv={data?.pages?.[0]?.meta.totals?.totalKv || 0}
        totalPrice={data?.pages?.[0]?.meta.totals?.totalPrice || 0}
        totalCount={data?.pages?.[0]?.meta.totals?.totalCount || 0}
      />
      <div className="h-[calc(100vh-140px)] scrollCastom">
        <DataTable
          columns={SizeColumns}
          data={Sizes || []}
          isLoading={isLoading}
          isRowClickble={false}
          isNumberble
          // onRowClick={(item)=>navigate(`${item?.id}`)}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </>
  );
}
