import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { CollectionColumns } from "./columns";
import Filter from "./filter";
import CardSortRemaider from "./card-sort";
import { useCollectionDataFetch } from "@/pages/products/table/queries";
import { parseAsString, useQueryState } from "nuqs";

export default function PageRemaider() {
  const { meUser } = useMeStore();
  const [sorttype] = useQueryState("sorttype", parseAsString);
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
    endDate:toDate || undefined
  });

  const collections = data?.pages?.flatMap((page) => page || []) || [];

  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">
      {
       <CardSortRemaider />
      }
      <DataTable
         columns={CollectionColumns}
         data={collections ||[]}
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
