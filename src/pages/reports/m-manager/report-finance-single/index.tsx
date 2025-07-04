import { DataTable } from "@/components/ui/data-table";

import CardSort from "@/components/card-sort";
import { KassaColumnsLoc } from "./columns";
import {  useReportDealer, useReportsSingle } from "./queries";
import { useNavigate, useParams } from "react-router-dom";
import { TKassareportData } from "./type";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useMeStore } from "@/store/me-store";

export default function PageFinanceSingle() {
  const {meUser}=useMeStore()
  const { id } = useParams();
  const navigate = useNavigate();
  const [,setMyCashFlow] = useQueryState("myCashFlow",parseAsBoolean)
  const {
    data: kassaData,
    isLoading: KassaLoading,

  } = useReportsSingle({
    id: id,
    enabled: Boolean(id),
    queries: {
      page: 1,
    },
  });


  const {
    data: ReportDealer
  } = useReportDealer({
    enabled:Boolean(kassaData),
    queries: {
      month: kassaData?.month,
      year:kassaData?.year
    },
  });

  

  const myData: TKassareportData = {
    status: "my",
    totalIncome: kassaData?.totalIncome,
    totalExpense: kassaData?.totalExpense,
  } as TKassareportData;

  const DealerData: TKassareportData = {
    
    totalSum:ReportDealer?.[0]?.totalIncome ||0 ,
    totalPlasticSum:ReportDealer?.[0]?.totalPlasticSum|| 0,
    totalExpense: ReportDealer?.[0]?.totalExpense|| 0,
    status:ReportDealer?.[0]?.status ,
    
  } as TKassareportData;
  const ReportSingleData = kassaData?.kassaReport
    ? [myData,DealerData,
        ...(kassaData?.kassaReport as TKassareportData[]),
      ]
    : [myData];

  return (
    <>
      <div className="h-[calc(100vh-70px)] scrollCastom">
        <CardSort reportId={id} isAddible={true} isOnlyCash={Boolean(meUser?.position?.role ==9) } isOnlyTerminal={Boolean(meUser?.position?.role == 10)} KassaReport={kassaData} />
        <DataTable
          columns={KassaColumnsLoc || []}
          data={ReportSingleData || []}
          isLoading={KassaLoading}
          isRowClickble={true}
          onRowClick={(item) => {
            if(item?.status == "my"){
              navigate(item?.status )
              setMyCashFlow(true)
            }else{
              setMyCashFlow(false)
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
