import { DataTable } from "@/components/ui/data-table";
// import { useMeStore } from "@/store/me-store";

import Filter from "./filter";
import { SellerCashflowColumns } from "./columns";
import { useDataSellerCashflow } from "./queries";
import { useParams } from "react-router-dom";

export default function PageSellerCashFlow() {
  const {id} = useParams()
  const {
    data: SellerCashflowData,
    isLoading: SellerCashflowLoading,
    fetchNextPage: SellerCashflowfetchNextPage,
    hasNextPage: SellerCashflowfhasNextPage,
    isFetchingNextPage: SellerCashflowisFetchingNextPage,
  } = useDataSellerCashflow({
    queries: {
      reportId: id || undefined,
      page: 1,
      limit: 10,
    },
  });

  const flatSellerCashflowData =
    SellerCashflowData?.pages?.flatMap((page) => page.items || []) || [];
    

  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">
        <DataTable
          columns={SellerCashflowColumns || []}
          data={flatSellerCashflowData}
          isLoading={SellerCashflowLoading}
          isRowClickble={true}
          fetchNextPage={SellerCashflowfetchNextPage}
          hasNextPage={SellerCashflowfhasNextPage ?? false}
          isFetchingNextPage={SellerCashflowisFetchingNextPage}
        />
      </div>
    </>
  );
}
