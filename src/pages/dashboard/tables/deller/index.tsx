import { DataTable } from "@/components/ui/data-table";
import useTransferDealersFetch from "@/pages/deller/single/queries";
import { parseAsInteger, useQueryState } from "nuqs";
import { collactionColumns } from "./columns";
import { TransferCollectionDealerData } from "@/pages/reports/d-manager/transfer/type";
import Filters from "./filters";

export default function DilerTable() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [dellerFilial] = useQueryState("dellerFilial");

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTransferDealersFetch({
      queries: {
        limit: limit,
        page: page,
        toId: dellerFilial || undefined,
        mode: "collection",
      },
    });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
  return (
    <>
      <Filters/>
      <div className="bg-[#EEEEEE] flex">
        <p className=" p-[25px] border-border border-r  text-[17px] w-full">
          Итого
        </p>
        <p className=" p-[25px] border-border border-r  text-[17px] w-full">
          {data?.pages?.[0]?.totals?.totalKv || 0} м² 
        </p>
        <p className=" p-[25px] border-border border-r  text-[17px] w-full">
          {data?.pages?.[0]?.totals?.total_sum || 0} $
        </p>
        <p className=" p-[25px]  text-[17px] w-full">
          {data?.pages?.[0]?.totals?.total_profit_sum || 0} $
        </p>
      </div>
      <div className="px-5 bg-card ">
        <DataTable
          isLoading={isLoading}
          className="max-h-[calc(100vh-140px)]  scrollCastom"
          classNameBody="border-none"
          columns={collactionColumns}
          data={flatData as unknown as TransferCollectionDealerData[]}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          ischeckble={false}
          hasHeader={false}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </>
  );
}
