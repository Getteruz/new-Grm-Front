import { useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { KassaColumnsLoc } from "./columns";
import Filter from "./filter";
import CardSortSingle from "../table/card-sort";
import CardSort from "@/components/card-sort";
import { useKassaReportSingle, useKassaReportTotal } from "../table/queries";
import { useKassaReports } from "./queries";
import { useDataKassa } from "@/pages/cashier/report/queries";
import { KassaColumns } from "../table/columns";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PageFinance() {
  const { meUser } = useMeStore();
  const [filial] = useQueryState("filial");
  const [kassaReports,setKassaReports] = useQueryState("kassaReports");
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
        meUser?.position?.role == 10
          ? filial || undefined
          : meUser?.filial?.id || undefined,
      page: 1,
      report: kassaReports || undefined,
    },
  });

  const { data: KassaReport } = useKassaReportTotal({
    queries: {
      filialId:
        meUser?.position?.role == 10
          ? filial || undefined
          : meUser?.filial?.id || undefined,
    },
    enabled:!kassaReports ,
  });

  const { data: KassaReportSingle } = useKassaReportSingle({
    id:kassaReports || undefined,
    enabled: Boolean(kassaReports) ,
  });

  
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useKassaReports({
      queries: {
        filialId:
          meUser?.position?.role == 10
            ? filial || undefined
            : meUser?.filial?.id || undefined,
      },
    });
  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
  const flatKasssaData =
    kassaData?.pages?.flatMap((page) => page?.items || []) || []
    
  return (
    <>
      <Filter ids={seleted} setSeleted={setSeleted} />
      <div className="h-[calc(100vh-140px)] scrollCastom">
        {meUser?.position?.role === 6 ? (
          <CardSortSingle />
        ) : (
          <CardSort KassaReport={kassaReports? KassaReportSingle: KassaReport} />
        )}
        {kassaReports ? (
          <DataTable
            columns={KassaColumns || []}
            data={[
              {
                status:"Мои приходы и расходы",
                income: 0,
                expense: 10,
            }, ...flatKasssaData]}
            isLoading={KassaLoading}
            onRowClick={(data) => data?.id &&
              navigate(`/report?id=${data?.id}`)
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
