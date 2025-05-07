import { useState } from "react";

import CardSort from "@/components/card-sort";
import { DataTable } from "@/components/ui/data-table";

import Filters from "../page/filter";
import Pricecheck from "../page/price-check";
import { useReport } from "../queries";
import { useMeStore } from "@/store/me-store";
import { parseAsString, useQueryState } from "nuqs";
import { ReportColumns } from "./columns";
import { format } from "date-fns";

export default function Page() {
  const [selectedItems] = useState<number[]>([]);
  const [status] = useQueryState("sort", parseAsString.withDefault("open"));
  const { meUser } = useMeStore();
  const { data: reportData } = useReport({
    queries: {
      filial: meUser?.filial?.id || "",
      status: status,
    },
  });

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
              data={reportData?.items || []}
              isLoading={false}
              className="border-none"
              hasHeader={false}
            />
          </div>
        </div>
        <Pricecheck />
      </div>
    </>
  );
}
