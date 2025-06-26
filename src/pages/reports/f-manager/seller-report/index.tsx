import { DataTable } from "@/components/ui/data-table";
// import { useMeStore } from "@/store/me-store";

import Filter from "./filter";
import { SellerReportsColumns } from "./columns";
import {  parseAsString, useQueryState } from "nuqs";
import { useDataSellerReports } from "./queries";
import { getMonth } from "date-fns";

export default function PageSellerReport() {
  const [month] = useQueryState("month", parseAsString.withDefault(getMonth(new Date()) + 1 + "" ));
  const {
    data: SellerReportsData,
    isLoading: SellerReportsLoading,
    fetchNextPage: SellerReportsfetchNextPage,
    hasNextPage: SellerReportsfhasNextPage,
    isFetchingNextPage: SellerReportsisFetchingNextPage,
  } = useDataSellerReports({
    queries: {
      // filial: meUser?.filial?.id || undefined,
      page: 1,
      limit: 10,
      month:month,
    },
  });

  const flatSellerReportsData =
    SellerReportsData?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">
        <DataTable
          columns={SellerReportsColumns || []}
          data={flatSellerReportsData}
          isLoading={SellerReportsLoading}
          isRowClickble={true}
          fetchNextPage={SellerReportsfetchNextPage}
          hasNextPage={SellerReportsfhasNextPage ?? false}
          isFetchingNextPage={SellerReportsisFetchingNextPage}
        />
      </div>
    </>
  );
}
