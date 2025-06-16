import { DataTable } from "@/components/ui/data-table";

import Filter from "./filter";
import CardSort from "@/components/card-sort";
import {
  parseAsBoolean,
  parseAsIsoDate,
  parseAsString,
  useQueryState,
} from "nuqs";
import { useKassaReportTotal } from "../../f-manager/report/queries";
import { useDataCashflow } from "./queries";
import { Columns } from "./columns";
import { useParams } from "react-router-dom";
import { useMeStore } from "@/store/me-store";
import { useKassaReportSingle } from "../filial-report-finance/queries";
import { useReportsSingle } from "../report-finance-single/queries";

export default function ReportPage() {
  const tipFilter = {
    income: "cashflow",
    expense: "cashflow",
    sale: "order",
    return: "order",
    // terminal:"Терминал",
    // discount:"Скидка",
    // navar:"Навар",
  };

  const typeFilter = {
    income: "Приход",
    expense: "Расход",
    sale: "Приход",
    return: "Расход",
  };

  const { id, kassaReportId } = useParams();

  const [myCashFlow] = useQueryState(
    "myCashFlow",
    parseAsBoolean.withDefault(false)
  );

  const [FManagerCashFlow] = useQueryState(
    "FManagerCashFlow",
    parseAsBoolean.withDefault(false)
  );

  const { meUser } = useMeStore();
  const [filial] = useQueryState("filial");

  const [tip] = useQueryState("tip", parseAsString);

  const [startDate] = useQueryState("startDate", parseAsIsoDate);
  const [endDate] = useQueryState("endDate", parseAsIsoDate);

  const { data: KassaReport } = useKassaReportTotal({
    queries: {
      filialId: filial || undefined,
    },
    enabled: !id && !FManagerCashFlow && !myCashFlow ,
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataCashflow({
      queries: {
        limit: 10,
        page: 1,
        filialId: filial || undefined,
        kassaId:
          id === "undefined" || !id || myCashFlow || FManagerCashFlow
            ? undefined
            : id,
        casherId: id === "undefined" ? meUser?.id : undefined,
        // @ts-ignore
        type: typeFilter[tip as string],
        // @ts-ignore
        tip: tipFilter[tip],
        fromDate: startDate || undefined,
        toDate: endDate || undefined,
        cashflowSlug: tip == "collection" ? "Инкассация" : undefined,
        report: myCashFlow && !FManagerCashFlow ? id : undefined,
        kassaReport: FManagerCashFlow ? kassaReportId || undefined : undefined,
      },
      enabled: true,
    });

  const { data: KassaReportSingle } = useKassaReportSingle({
    id: kassaReportId || undefined,
    enabled: Boolean(kassaReportId),
  });

  const { data: myCashFlowReports } = useReportsSingle({
    id: id || undefined,
    enabled: Boolean(myCashFlow && id),
  });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filter />
      <div className="h-[calc(100vh-140px)] scrollCastom">
        {
          <CardSort
            isAddible={myCashFlow}
            kassaReportId={FManagerCashFlow ? kassaReportId : undefined}
            reportId={myCashFlow && !FManagerCashFlow ? id : undefined}
            KassaReport={
              id === "undefined" || FManagerCashFlow
                ? KassaReportSingle
                : myCashFlow
                  ? myCashFlowReports
                  : KassaReport
            }
            KassaId={id === "undefined" || !id ? undefined : id}
          />
        }
        <DataTable
          columns={Columns}
          data={flatData || []}
          isLoading={isLoading}
          isRowClickble={false}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </>
  );
}
