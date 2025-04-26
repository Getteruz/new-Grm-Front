import Filters from "./filter";
import Pricecheck from "./price-check";
import CardSort from "@/components/card-sort";
import { useKassaReport } from "../queries";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionsTable from "./table/transactions-table";
import { useState } from "react";
import { IData } from "../../home/type";

export default function Content() {
  // Fetch report data
  const { data: reportData, isLoading } = useKassaReport();
  const [selected, setSelected] =useState<IData[]>([])

  return (
    <div className="flex">
      <div className="w-full">
        <Filters countLength={selected.length} />
        <CardSort />
        <div className="my-[13px] mx-[30px]">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          ) : (
            <TransactionsTable report={reportData} />
          )}
        </div>
      </div>
      <Pricecheck/>
    </div>
  )
}