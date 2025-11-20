import { DataTable } from "@/components/ui/data-table";
import { FactoryColumns } from "@/pages/reports/m-manager/remaider/columns";
import { useFactoryReport } from "@/pages/reports/m-manager/remaider/queries";

import { parseAsString, useQueryState } from "nuqs";
import { Dispatch, SetStateAction } from "react";

export default function FoctoryRemainderTable({
  setRemainder,
  remainder,
}: {
  setRemainder: Dispatch<
    SetStateAction<{
      id: string;
      name: string;
    }>
  >;
  remainder?: {
    id: string;
    name: string;
  };
}) {
  const [filialId] = useQueryState("filial", parseAsString);
  const [month] = useQueryState("month", parseAsString);
  
  const [typeOther] = useQueryState(
    "typeOther",
    parseAsString.withDefault("none")
  );
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFactoryReport({
      queries: {
        filialId: filialId || undefined,
        month: month || undefined,
        country: remainder?.id,
        typeOther,
      },
      enabled: true,
    });

  const collections = data?.pages?.flatMap((page) => page?.data || []) || [];

  return (
    <>
      <div className="bg-[#EEEEEE] flex">
        <p className=" p-[25px] border-border border-r  text-[17px] w-full">
          Итого
        </p>
        <p className=" p-[25px] border-border border-r  text-[17px] w-full">
          {data?.pages?.[0]?.meta.totals?.totalKv || 0} м²
        </p>
        <p className=" p-[25px] border-border border-r  text-[17px] w-full">
          {data?.pages?.[0]?.meta.totals?.totalPrice || 0}м²
        </p>
        <p className=" p-[25px]  text-[17px] w-full">
          {data?.pages?.[0]?.meta.totals?.totalCount || 0} шт
        </p>
      </div>

      <div className="px-5 bg-card ">
          <DataTable
            columns={FactoryColumns}
            data={collections || []}
            isLoading={isLoading}
            isRowClickble={false}
            hasHeader={false}
            ischeckble={false}
            onRowClick={(row) => { 
              setRemainder({
                id: row.id ||"",
                name: "",
              })
            }}
            className="max-h-[calc(100vh-135px)]  scrollCastom"
            classNameBody="border-none"
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage ?? false}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
    </>
  );
}
