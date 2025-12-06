import { DataTable } from "@/components/ui/data-table";

import CardSort from "@/components/card-sort";
import { useReports } from "./queries";
import { KassaColumnsLoc } from "./columns";
import { useMeStore } from "@/store/me-store";

export default function PageFinance() {
  const { meUser } = useMeStore();
  const {
    data: kassaData,
    isLoading: KassaLoading,
    fetchNextPage: KassafetchNextPage,
    hasNextPage: KassafhasNextPage,
    isFetchingNextPage: KassaisFetchingNextPage,
  } = useReports({
    queries: {
      page: 1,
    },
  });

  const flatKasssaData =
    kassaData?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
       <p className="text-[#272727] text-[20px] m-4 mr-auto">Финансовый учёт</p>
        <CardSort
          KassaReport={undefined}
          isOnlyCash={Boolean(meUser?.position?.role == 9)}
          isOnlyTerminal={Boolean(meUser?.position?.role == 10)}
        />
        <DataTable
          columns={KassaColumnsLoc || []}
          data={flatKasssaData}
          isLoading={KassaLoading}
          isRowClickble={true}
          className="h-[calc(100vh-240px)] scrollCastom"
          fetchNextPage={KassafetchNextPage}
          hasNextPage={KassafhasNextPage ?? false}
          isFetchingNextPage={KassaisFetchingNextPage}
        />
    </>
  );
}
