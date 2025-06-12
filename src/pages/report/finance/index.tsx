import { parseAsBoolean, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { KassaColumnsLoc } from "./columns";
import Filter from "./filter";
import CardSort from "@/components/card-sort";
import { useCashflowFilial, useKassaReportSingle, useKassaReportTotal } from "../table/queries";
import { useKassaReports } from "./queries";
import { useDataKassa } from "@/pages/cashier/report/queries";
import { KassaColumns } from "../table/columns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PageFinance() {
  const { meUser } = useMeStore();
  const [filial] = useQueryState("filial");
  const [kassaReports,setKassaReports] = useQueryState("kassaReports");
  const [,setIsBack] = useQueryState("isBack",parseAsBoolean.withDefault(false));
  const navigate = useNavigate();
  const [seleted, setSeleted] = useState<string[]>([]);
  const {
    data: kassaData,
    isLoading: KassaLoading,
    fetchNextPage: KassafetchNextPage,
    hasNextPage: KassafhasNextPage,
    isFetchingNextPage: KassaisFetchingNextPage,
  } = useDataKassa({
    queries: {
      filial:
        meUser?.position?.role == 10 ||meUser?.position?.role == 9
          ? filial || undefined
          : meUser?.filial?.id || undefined,
      page: 1,
      report: kassaReports || undefined,
    },
    // enabled:  meUser?.position?.role == 9
  });

  const { data: KassaReport } = useKassaReportTotal({
    queries: {
      filialId:
        meUser?.position?.role == 10||meUser?.position?.role == 9
          ? filial || undefined
          : meUser?.filial?.id || undefined,
    },
    enabled: !kassaReports ,
  });

  const { data: KassaReportSingle } = useKassaReportSingle({
    id:kassaReports || undefined,
    enabled: Boolean(kassaReports),
  });

  
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useKassaReports({
      queries: {
        filialId:
          meUser?.position?.role == 10 ||  meUser?.position?.role == 9
            ? filial || undefined
            : meUser?.filial?.id || undefined,
      },
    });

    const {data:cashflowFilial} = useCashflowFilial({
      id:kassaReports || undefined,
      enabled:Boolean(kassaReports) 
    })
    

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
  const flatKasssaData =
    kassaData?.pages?.flatMap((page) => page?.items || []) || []
  return (
    <>
      <Filter  setSeleted={setSeleted} />
      <div className="h-[calc(100vh-140px)] scrollCastom">
    
          <CardSort KassaReport={kassaReports? KassaReportSingle: KassaReport} />
        {kassaReports ? (
          <DataTable
            columns={KassaColumns || []}
            data={[
              {
                status:"Мои приходы и расходы",
                income: cashflowFilial?.income,
                expense: cashflowFilial?.expense,
            }, ...flatKasssaData]}
            isLoading={KassaLoading}
            isRowClickble={false}
            onRowClick={(data) => data?.id ?
              navigate(`/report?id=${data?.id}`) : navigate(`/report?Myid=myReport&kassaReports=${kassaReports}`)
            }
            fetchNextPage={KassafetchNextPage}
            hasNextPage={KassafhasNextPage ?? false}
            isFetchingNextPage={KassaisFetchingNextPage}
          />
        ) : (
          <DataTable
            columns={KassaColumnsLoc}
            data={
              flatData.length
                ? flatData
                : [
                    {
                      id: "",
                      totalSellCount: 0,
                      additionalProfitTotalSum: 0,
                      netProfitTotalSum: 0,
                      totalSize: 0,
                      year: 0,
                      kassaReportStatus:0,
                      month: 0,
                      status: "open",
                      totalPlasticSum: 0,
                      totalInternetShopSum: 0,
                      totalSale: 0,
                      totalSaleReturn: 0,
                      totalCashCollection: 0,
                      totalDiscount: 0,
                      totalIncome: 0,
                      totalExpense: 0,
                      totalSum: 0,
                    },
                  ]
            }
            isLoading={isLoading}
            isRowClickble={false}
            onRowClick={(data) =>{ 
              if(data?.id){
                setKassaReports(data?.id)
                setIsBack(true)
              }
            }
            }
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
        )}
      </div>
    </>
  );
}
