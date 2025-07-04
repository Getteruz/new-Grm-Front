import { DataTable } from "@/components/ui/data-table";

import ActionPageQrCode from "../form";
import { Columns, ColumnsColaction } from "./columns";
import Filter from "./filter";
import { useParams } from "react-router-dom";
import useDataFetch, { usePartiyaReport } from "./queries";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";
import { useMeStore } from "@/store/me-store";
import { usePartiyaById } from "../../form/actions";
// import useDataLibrary from "./queries";

export default function ItemsPage() {
  const [search] = useQueryState("search");
  const { id } = useParams();
  const [tip] = useQueryState("tip", parseAsString.withDefault("new"));
  const [type] = useQueryState("type", parseAsString.withDefault("default"));
  const [, setBarCode] = useQueryState("barcode");
  const { meUser } = useMeStore();

  const { data: onePartiya } = usePartiyaById({
    id: id ? id : undefined,
    queries: {
      populate: "*",
    },
  });
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataFetch({
      queries: {
        search: search || undefined,
        partiyaId: id || "",
        type: type || "default",
        tip: tip == "new" ? undefined : tip || undefined,
      },
    });

  const { data: PartiyaReportData, isLoading: PartiyaReportLoading } =
    usePartiyaReport({
      queries: {
        partiyaId: id || "",
        type: tip == "new" ? "дефицит" : tip || undefined,
      },
    });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
  const LocalColums = useMemo(() => {
    if (type == "collection") {
      if (meUser?.position.role == 7) {
        return ColumnsColaction.filter(
          (col) =>
            col.header !== "Сумма" &&
            col.header !== "Зав.цена" &&
            col.header !== "Расход"
        );
      } else {
        return ColumnsColaction;
      }
    } else {
      return Columns;
    }
  }, [type]);


  return (
    <div className="flex w-full">
      <ActionPageQrCode />
      <div className="w-2/3">
        <Filter
          check={onePartiya?.check}
          partiyaStatus={onePartiya?.partiya_status}
        />
        <DataTable
          onRowClick={(e) => {
            if (type == "default") {
              setBarCode(e?.bar_code?.code);
            }
          }}
          isLoading={isLoading}
          columns={LocalColums}
          className={
            tip == "излишки"
              ? "h-[calc(50vh-90px)] scrollCastom"
              : "h-[calc(100vh-175px)] scrollCastom"
          }
          data={flatData || []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
        {tip == "излишки" && (
          <DataTable
            isLoading={isLoading}
            columns={Columns}
            className={
              tip == "излишки"
                ? "h-[calc(50vh-90px)]  scrollCastom"
                : "h-[calc(100vh-165px)] scrollCastom"
            }
            data={flatData || []}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage ?? false}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}

        <div className="w-full flex items-center  justify-end pr-10 border-border border-t  bg-sidebar">
          {PartiyaReportLoading ? (
            "Loading..."
          ) : (
            <>
              <div className="py-[14px] text-[#5D5D53] text-[13px] font-normal  border-border border-l px-[18px]">
                Объем: {Number(PartiyaReportData?.volume)?.toFixed(2) || 0} м²
              </div>
              <div className="py-[14px] text-[#5D5D53] text-[13px] font-normal  border-border border-l px-[18px]">
                Количество: { Number(PartiyaReportData?.count)?.toFixed(2) || 0}
              </div>
              <div className="py-[14px] text-[#5D5D53] text-[13px] font-normal  border-border border-l px-[18px]">
                Сумма: { Number(PartiyaReportData?.total)?.toFixed(2) || 0} $
              </div>
              <div className="py-[14px] text-[#5D5D53] text-[13px] font-normal  border-border border-l px-[18px]">
                Расход: { Number(PartiyaReportData?.expence)?.toFixed(2) || 0} $
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
