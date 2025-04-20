import { parseAsString, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";
import useDataFetch from "@/pages/deller/table/queries";
import { useMeStore } from "@/store/me-store";

import { paymentColumns } from "./columns";
import Filters from "./filters";
import useTransfers from "./queries";

export default function Page() {
  const { meUser } = useMeStore();

  const { data: filialData } = useDataFetch({});
  const flatDataFilial =
    filialData?.pages?.flatMap((page) => page?.items) || [];
  const [filial, setFilial] = useQueryState(
    "filial",
    parseAsString.withDefault(
      flatDataFilial?.filter((i) => i.type === "filial")?.[0]?.id || ""
    )
  );
  const [type, setType] = useQueryState(
    "type",
    parseAsString.withDefault("In")
  );
  const { data, isLoading } = useTransfers({
    queries: {
      limit: 10,
      page: 1,
      type: type || undefined,
      from: meUser?.filial.id || "",
      to: filial,
    },
  });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-4 flex">
        <div className={`w-full h-full border-r border-border `}>
          <div className="w-full flex h-[64px] items-center justify-between border-border border-solid border-b p-[21.22px] bg-sidebar">
            <h4 className="text-[14px] font-semibold text-foreground">
              Флиалы
            </h4>
          </div>
          <div className="p-3 px-0 mx-5 border-b border-border pb-5">
            {flatDataFilial
              ?.filter((i) => i.type === "filial")
              .map((e) => (
                <p
                  key={e?.id}
                  onClick={() => setFilial(e?.id)}
                  className={`${filial === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between cursor-pointer mb-1 text-[14px]  hover:bg-sidebar px-3  py-2.5`}
                >
                  {e.name}
                </p>
              ))}
          </div>
          <div className="p-3 px-0 mx-5 border-b border-border">
            {flatDataFilial
              ?.filter((i) => i.type === "market")
              .map((e) => (
                <p
                  key={e?.id}
                  onClick={() => setFilial(e?.id)}
                  className={`${filial === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between cursor-pointer mb-1 text-[14px]  hover:bg-sidebar px-3  py-2.5`}
                >
                  {e.name}
                </p>
              ))}
          </div>
          <div className="p-3 px-0 mx-5 border-b border-border">
            {flatDataFilial
              ?.filter((i) => i.type === "dealer")
              .map((e) => (
                <p
                  key={e?.id}
                  onClick={() => setFilial(e?.id)}
                  className={`${filial === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between cursor-pointer mb-1 text-[14px]  hover:bg-sidebar px-3  py-2.5`}
                >
                  {e.name}
                </p>
              ))}
          </div>
          <div className="p-3 px-0 mx-5 ">
            {flatDataFilial
              ?.filter((i) => i.type === "warehouse")
              .map((e) => (
                <p
                  key={e?.id}
                  onClick={() => setFilial(e?.id)}
                  className={`${filial === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between cursor-pointer mb-1 text-[14px]  hover:bg-sidebar px-3  py-2.5`}
                >
                  {e.name}
                </p>
              ))}
          </div>
        </div>
        <div className={`w-full h-full border-r border-border `}>
          <div className="w-full flex h-[64px] items-center justify-between border-border border-solid border-b p-[21.22px] bg-sidebar">
            <h4 className="text-[14px] font-semibold text-foreground">
              Статус транзакции
            </h4>
          </div>
          <div className="p-3 px-0 mx-5">
            {[
              { id: "In", name: "Входящие" },
              { id: "Out", name: "Отправленные" },
            ].map((e) => (
              <p
                key={e?.id}
                onClick={() => setType(e?.id)}
                className={`${type === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between cursor-pointer mb-1 text-[14px]  hover:bg-sidebar px-3  py-2.5`}
              >
                {e.name}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-8">
        <Filters />
        <DataTable
          className="p-4"
          isLoading={isLoading}
          columns={paymentColumns}
          data={flatData}
          // fetchNextPage={fetchNextPage}
          // hasNextPage={hasNextPage ?? false}
          // isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}
