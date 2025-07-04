import { DataTable } from "@/components/ui/data-table";
import { KassaColumnsLoc } from "./columns";
import { useKassaReports } from "./queries";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useReportsSingle } from "../../m-manager/report-finance-single/queries";
import CardSort from "../report/card-sort";

export default function PageKassaReport() {
  const {id}  =useParams()
  const [seleted, setSeleted] = useState<string[]>([]);
  const {
    data: ReportsSingle,
    // isLoading: ReportsSingleLoading,
  
  } = useReportsSingle({
    id: id,
    enabled: Boolean(id),
  queries:{}
  });
  
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useKassaReports({
      queries: {
        reportId:id,
      },
    });


  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <div className="h-[calc(100vh-70px)] scrollCastom">
          <CardSort  SortData={ReportsSingle}  />
          <DataTable
            columns={KassaColumnsLoc}
            data={
              flatData.length
                ? flatData
                : []
            }
            isLoading={isLoading}
            isRowClickble={true}
            onSelectionChange={(e) => {
              const newIds = e.map((item) => item.id);
                if (JSON.stringify(seleted) != JSON.stringify(newIds)) {
                  setSeleted(newIds);
                }
            }}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage ?? false}
            isFetchingNextPage={isFetchingNextPage}
          />
      </div>
    </>
  );
}
