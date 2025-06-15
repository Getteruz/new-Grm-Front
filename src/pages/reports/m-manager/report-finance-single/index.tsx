import { DataTable } from "@/components/ui/data-table";

import CardSort from "@/components/card-sort";
import { KassaColumnsLoc } from "./columns";
import { useReportsSingle } from "./queries";
import { useNavigate, useParams } from "react-router-dom";
import { TKassareportData } from "./type";
import { parseAsBoolean, useQueryState } from "nuqs";

export default function PageFinanceSingle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [,setMyCashFlow] = useQueryState("myCashFlow",parseAsBoolean)
  const {
    data: kassaData,
    isLoading: KassaLoading,
    // fetchNextPage: KassafetchNextPage,
    // hasNextPage: KassafhasNextPage,
    // isFetchingNextPage: KassaisFetchingNextPage,
  } = useReportsSingle({
    id: id,
    enabled: Boolean(id),
    queries: {
      page: 1,
    },
  });

  // const flatKasssaData =
  //   kassaData?.pages?.flatMap((page) => page?.items || []) || []

  const myData: TKassareportData = {
    status: "my",
    totalIncome: kassaData?.totalIncome,
    totalExpense: kassaData?.totalExpense,
  } as TKassareportData;

  const ReportSingleData = kassaData?.kassaReport
    ? [myData,
        ...(kassaData?.kassaReport as TKassareportData[]),
      ]
    : [myData];

  return (
    <>
      <div className="h-[calc(100vh-140px)] scrollCastom">
        <CardSort reportId={id} isAddible={true} KassaReport={kassaData} />

        <DataTable
          columns={KassaColumnsLoc || []}
          data={ReportSingleData || []}
          isLoading={KassaLoading}
          isRowClickble={true}
          onRowClick={(item) => {
            if(item?.status == "my"){
              navigate(item?.status )
              setMyCashFlow(true)
            }
          }}

          // fetchNextPage={KassafetchNextPage}
          // hasNextPage={KassafhasNextPage ?? false}
          // isFetchingNextPage={KassaisFetchingNextPage}
        />
      </div>
    </>
  );
}
