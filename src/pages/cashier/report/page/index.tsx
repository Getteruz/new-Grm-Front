import { format } from "date-fns";
import { useEffect, useState } from "react";

import CardSort from "@/components/card-sort";
import { DataTable } from "@/components/ui/data-table";
import { useOpenKassa } from "@/pages/report/table/queries";
import { useMeStore } from "@/store/me-store";

import Filters from "../page/filter";
import Pricecheck from "../page/price-check";
import { useDataCashflow, useDataKassa } from "../queries";
import { KassaColumns, ReportColumns } from "./columns";
import { parseAsString, useQueryState } from "nuqs";
import CashierHeader from "@/layouts/main-layout/cashier-header";

export default function Page() {
  const [selectedItems] = useState<number[]>([]);
  const { meUser } = useMeStore();
  const [sort] = useQueryState("sort", parseAsString.withDefault("open"));
  const [sortSingle] = useQueryState(
    "sortSingle",
    parseAsString.withDefault("Все")
  );
  const [id, setId] = useQueryState("id");

  useEffect(() => {
    setId(null);
  }, [sort]);
  const { data: reportData } = useOpenKassa({
    id: sort == "open" ? meUser?.filial?.id : undefined,
  });

  const {
    data: kassaData,
    isLoading: KassaLoading,
    fetchNextPage: KassafetchNextPage,
    hasNextPage: KassafhasNextPage,
    isFetchingNextPage: KassaisFetchingNextPage,
  } = useDataKassa({
    queries: {
      filial: meUser?.filial?.id || "",
      limit: 10,
      status: sort,
      page: 1,
    },
    enabled: sort != "open" && !id,
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataCashflow({
      queries: {
        kassaId: reportData?.id || id || "",
        limit: 10,
        page: 1,

        type: sortSingle == "Все" ? undefined : sortSingle || undefined,
      },
      enabled: !!reportData?.id || Boolean(id),
    });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
  const flatKasssaData =
    kassaData?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <CashierHeader>
        <Filters kassaId={reportData?.id} countLength={selectedItems?.length} />
      </CashierHeader>
      <div className="flex w-full ">
        <div className=" mr-2 w-full">
          {sort === "open" || Boolean(id) ? (
            <CardSort
              isKassa={true}
              KassaId={sort == "open" ? reportData?.id || "" : id || ""}
            />
          ) : (
            ""
          )}
          {sort === "open" ? (
            ""
          ) : (
            <div className="px-4 pt-2 mb-1 w-full  sticky top-0">
              <p className="text-sm font-medium ">
                {format(new Date(), "dd-MMMM")}
              </p>
            </div>
          )}
        <div className="h-[calc(100vh-285px)] scrollCastom ">

            {sort === "open" || Boolean(id) ? (
              <DataTable
                columns={ReportColumns}
                data={flatData || []}
                isLoading={isLoading}
                hasHeader={false}
                isRowClickble={false}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage ?? false}
                isFetchingNextPage={isFetchingNextPage}
              />
            ) : (
              <DataTable
                columns={KassaColumns || []}
                data={flatKasssaData || []}
                isLoading={KassaLoading}
                fetchNextPage={KassafetchNextPage}
                hasNextPage={KassafhasNextPage ?? false}
                isFetchingNextPage={KassaisFetchingNextPage}
              />
            )}
        </div>
       
        </div>
        {sort === "open" ? (
          <Pricecheck disabled={!flatData.length} id={reportData?.id || ""} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
