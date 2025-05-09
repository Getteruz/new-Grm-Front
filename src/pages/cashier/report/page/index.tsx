import { format } from "date-fns";
import { useState } from "react";

import CardSort from "@/components/card-sort";
import { DataTable } from "@/components/ui/data-table";
import { useOpenKassa } from "@/pages/report/table/queries";
import { useMeStore } from "@/store/me-store";

import Filters from "../page/filter";
import Pricecheck from "../page/price-check";
import { useDataCashflow } from "../queries";
import { ReportColumns } from "./columns";

export default function Page() {
  const [selectedItems] = useState<number[]>([]);

  const { meUser } = useMeStore();
  const { data: reportData } = useOpenKassa({ id: meUser?.filial?.id });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataCashflow({
      queries: {
        kassaId: reportData?.id || "",
        limit: 10,
        page: 1,
      },
      enabled: !!reportData?.id,
    });
  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filters countLength={selectedItems?.length} />
      <div className="flex justify-between w-full bg-[#f8f6e9]">
        <div className="flex flex-col h-screen w-full">
          <CardSort />
          <div className="px-10 pt-4 w-full bg-[#f8f6e9] sticky top-0">
            <p className="text-sm font-medium">
              {format(new Date(), "dd-MMMM")}
            </p>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <DataTable
              columns={ReportColumns}
              data={flatData || []}
              isLoading={isLoading}
              className="border-none"
              hasHeader={false}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage ?? false}
              isFetchingNextPage={isFetchingNextPage}
            />
          </div>
        </div>
        <Pricecheck />
      </div>
    </>
  );
}
