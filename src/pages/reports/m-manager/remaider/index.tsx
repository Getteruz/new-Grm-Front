import { DataTable } from "@/components/ui/data-table";

import { CollectionColumns, CollectionDealerColumns } from "./columns";
import Filter from "./filter";
import CardSortRemaider from "./card-sort";
import { parseAsString, useQueryState } from "nuqs";
import { useCollectionReport, useFactoryReport } from "./queries";

export default function PageRemaider() {
  const [fromDate] = useQueryState<Date | undefined>("startDate", {
    parse: () => undefined,
  });
  const [toDate] = useQueryState<Date | undefined>("endDate", {
    parse: () => undefined,
  });
  const [filialId] = useQueryState("filial", parseAsString);
  const [sort] = useQueryState("sort", parseAsString.withDefault("delears"));

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
  useFactoryReport({
      queries:{
        filialId: filialId || undefined,
        from: fromDate || undefined,
        to: toDate || undefined,
      },
    enabled: sort == "delears",
    });

  const {
    data: CollectionData,
    isLoading: CollectionisLoading,
    fetchNextPage: CollectionfetchNextPage,
    hasNextPage: CollectionhasNextPage,
    isFetchingNextPage: CollectionisFetchingNextPage,
  } = useCollectionReport({
    queries:{
      filialId: filialId || undefined,
      from: fromDate || undefined,
      to: toDate || undefined,
    },
  enabled: sort == "collaction",
  });
  const flatData =
    CollectionData?.pages?.flatMap((page) => page?.data || []) || [];

  const collections = data?.pages?.flatMap((page) => page?.data || []) || [];
  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">
        {<CardSortRemaider />}
        {sort == "delears" ? (
          <DataTable
            columns={CollectionDealerColumns}
            data={collections || []}
            isLoading={isLoading}
            isRowClickble={false}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage ?? false}
            isFetchingNextPage={isFetchingNextPage}
          />
        ) : (
          <DataTable
            columns={CollectionColumns}
            data={flatData || []}
            isLoading={CollectionisLoading}
            isRowClickble={false}
            fetchNextPage={CollectionfetchNextPage}
            hasNextPage={CollectionhasNextPage ?? false}
            isFetchingNextPage={CollectionisFetchingNextPage}
          />
        )}
      </div>
    </>
  );
}
