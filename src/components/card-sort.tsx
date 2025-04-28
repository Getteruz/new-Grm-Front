import { ChevronDown } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { toast } from "sonner";

import { apiRoutes } from "@/service/apiRoutes";
import { useKassaReport } from "../pages/cashier/report/queries";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { AddData } from "@/service/apiHelpers";
import { DollarIcon } from "./icons";

export default function CardSort() {
  const queryClient = useQueryClient();

  // Fetch kassa report data
  const { data: reportData, isLoading: isReportLoading } = useKassaReport();

  // State variables for form
  const [sorttype, setSortType] = useQueryState("sorttype", parseAsString);
  const [type, _setType] = useState<string>("Приход");
  const [_filial, _setFilial] = useState<string>("");

  // Fetch necessary data
  const { mutate: _addCashflow } = useMutation({
    mutationFn: (data: any) => AddData(apiRoutes.cashflow, data),
    onSuccess: () => {
      toast.success(
        type === "parish"
          ? "Приход успешно добавлен"
          : "Расход успешно добавлен"
      );
      queryClient.invalidateQueries({ queryKey: [apiRoutes.openKassa] });
      queryClient.invalidateQueries({ queryKey: [apiRoutes.cashflow] });
    },
    onError: (error) => {
      toast.error(`Ошибка: ${error.message || "Не удалось добавить операцию"}`);
    },
  });

  // Prepare column data using report data
  const columns = [
    {
      title: "Продажа",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(reportData?.income || 120)
      ),
    },
    {
      title: "Терминал",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(reportData?.plasticSum || 540)
      ),
    },
    {
      title: "Инкассация",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(reportData?.cashFlowSumBoss || 1350)
      ),
    },
    {
      title: "Навар",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(reportData?.netProfitTotalSum || 0)
      ),
    },
    {
      title: "Скидка",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(reportData?.expenditureShop || 289)
      ),
    },
    {
      title: "Приход",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(reportData?.income || 0)
      ),
    },
    {
      title: "Расход",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        `-${formatPrice(reportData?.expense || 90)}`
      ),
    },
  ];

  // Helper function to format price
  function formatPrice(price: number): string {
    return Number(price).toFixed(2);
  }

  return (
    <>
      <div className="p-6 flex gap-1 sticky top-10 z-10 bg-[#f8f6e9]">
        <div className="bg-sidebar p-5 w-full max-w-[399px]">
          <div className="flex items-center">
            <DollarIcon />
            <div>
              <p className="text-[12px] ">Итого</p>
              {isReportLoading ? (
                <Skeleton className="h-7 w-24 mt-1" />
              ) : (
                <p className="text-[25px] font-bold text-foreground">
                  {formatPrice(reportData?.totalSum || 1000)}
                </p>
              )}
            </div>
          </div>
          <p className="text-[12px] mt-[25px] mb-1 text-[#7E7E72]">
            Дата открытия кассы:
          </p>
          <p className="text-[14px] font-semibold">10 Март 2025</p>
        </div>
        <div className="grid row-start w-full gap-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {columns?.map((e) => {
            return (
              <div
                key={e.title}
                onClick={() => setSortType(e.title)}
                className={`${sorttype == e.title ? "bg-primary text-background" : "bg-sidebar rounded-[3px] text-[#7E7E72]"} cursor-pointer px-2 py-2`}
              >
                <div className="flex justify-between items-center">
                  <p className="text-[12px] mb-0.5 flex items">{e.title}</p>
                </div>
                <p className="text-[15px] font-medium">{e.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
