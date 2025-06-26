import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { CollectionColumns, CollectionDealerColumns } from "./columns";
import Filter from "./filter";
import CardSortRemaider from "./card-sort";
import { useCollectionDataFetch } from "@/pages/products/table/queries";
import { parseAsString, useQueryState } from "nuqs";
import useDataFetch from "@/pages/price/table/queries";

export default function PageRemaider() {
  const { meUser } = useMeStore();
  const [sorttype] = useQueryState("sorttype", parseAsString);
  const [sort] = useQueryState("sort", parseAsString.withDefault("delears"));

  const [fromDate] = useQueryState<Date | undefined>("startDate", {
    parse: () => undefined,
  });
  const [toDate] = useQueryState<Date| undefined>("endDate", {
    parse: () => undefined,
  });

  const { 
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useCollectionDataFetch({
    url:'/collection/remaining-factory',
    filialId: meUser?.filial?.id,
    country:sorttype || undefined,
    startDate:fromDate  || undefined,
    endDate:toDate || undefined,
    enabled: sort == "delears",
  });

  const {
    data: CollectionData,
    isLoading: CollectionisLoading,
    fetchNextPage: CollectionfetchNextPage,
    hasNextPage: CollectionhasNextPage,
    isFetchingNextPage: CollectionisFetchingNextPage,
  } = useDataFetch({
    filialId: meUser?.filial?.id || undefined,
    enabled: sort == "collaction",
  });
  const collections = data?.pages?.flatMap((page) => page || []) || [];
  const flatData =
    CollectionData?.pages?.flatMap((page) => page?.items || []) || [];
  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">
      <CardSortRemaider />
      {sort == "delears" ? (
        <DataTable
        columns={CollectionDealerColumns}
        data={collections ||[]}
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
