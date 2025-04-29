import { useState } from "react";

import CardSort from "@/components/card-sort";
import { Skeleton } from "@/components/ui/skeleton";

import { IData } from "../../home/type";
import { useKassaReport } from "../queries";
import Filters from "./filter";
import Pricecheck from "./price-check";
import TransactionsTable from "./table/transactions-table";

export default function Content() {
  // Fetch report data
  const { data: reportData, isLoading } = useKassaReport();
  const [selected, ] = useState<IData[]>([])

  return (
    <>
      <Filters countLength={selected.length} />
      <div className="flex justify-between w-full bg-[#f8f6e9]">
        <div className="flex flex-col h-screen w-full">
          <CardSort />
          <div className="flex-1 overflow-auto p-4">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            ) : (
              <TransactionsTable report={reportData} />
            )}
          </div>
        </div>
        <Pricecheck />
      </div>
    </>
  )
}