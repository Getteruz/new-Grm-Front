import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";
import useDataFetch from "@/pages/deller/table/queries";
import { useMeStore } from "@/store/me-store";

import { collactionColumns, paymentColumns } from "./columns";
import Filters from "./filters";
import useTransfers from "./queries";
import { TransferData } from "../type";

export default function Page() {
  const { meUser } = useMeStore();
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(50));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const { data: filialData } = useDataFetch({
    queries: {
      limit,
      page,
    },
  });

  const flatDataFilial =
    filialData?.pages?.flatMap((page) => page?.items) || [];
  // .filter((i) => i.id !== meUser?.filial?.id) || [];
  const [filial, setFilial] = useQueryState(
    "filial",
    parseAsString.withDefault(
      flatDataFilial?.filter((i) => i.type === "filial")?.[0]?.id || ""
    )
  );
  const [filialTo, setFilialTo] = useQueryState(
    "filialTo",
    parseAsString.withDefault(
      flatDataFilial?.filter((i) => i.type === "filial")?.[1]?.id || ""
    )
  );
  const [type, setType] = useQueryState(
    "type",
    parseAsString.withDefault("In")
  )

  const { data, isLoading } = useTransfers({
    queries: {
      limit: 50,
      page: 1,
      from: meUser?.position.role === 9 ? filial : type=="In" ? filial : meUser?.filial?.id ,
      to: meUser?.position.role === 9 ? filialTo : type=="In" ? meUser?.filial?.id : filial ,
    },
  });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <div className="grid grid-cols-12 h-full">
      <div className="col-span-4 flex">
        <div className={`w-full h-full border-r border-border `}>
          <div className="w-full flex h-[64px] items-center justify-between border-border border-solid border-b p-[21.22px] bg-sidebar">
            <h4 className="text-[14px] font-semibold text-foreground">
              {meUser?.position.role === 9 ? "Из филиал" : "Филиалы"}
            </h4>
          </div>
          {meUser?.position.role !== 6 && (
            <div className="p-3 px-0 mx-5 border-b border-border pb-5">
              {flatDataFilial
                ?.filter((i) => i.type === "filial")
                ?.filter((i) => i.id !== meUser?.filial?.id)
                .map((e) => (
                  <button
                    key={e?.id}
                    disabled={filialTo === e.id}
                    onClick={() => setFilial(e?.id)}
                    className={`${filial === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between  mb-1 text-[14px]  w-full hover:bg-sidebar px-3  py-2.5`}
                  >
                    {e.title}
                  </button>
                ))}
            </div>
          )}
          {meUser?.position.role !== 6 && (
            <div className="p-3 px-0 mx-5 border-b border-border">
              {flatDataFilial
                ?.filter((i) => i.type === "market")
                .map((e) => (
                  <button
                    key={e?.id}
                    disabled={filialTo === e.id}
                    onClick={() => setFilial(e?.id)}
                    className={`${filial === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between  mb-1 text-[14px]  w-full hover:bg-sidebar px-3  py-2.5`}
                  >
                    {e.title}
                  </button>
                ))}
            </div>
          )}
          <div
            className={`p-3 px-0 mx-5 ${meUser?.position.role !== 6 && "border-b border-border"} `}
          >
            {flatDataFilial
              ?.filter((i) => i.type === "dealer")
              .map((e) => (
                <button
                  key={e?.id}
                  disabled={filialTo === e.id}
                  onClick={() => setFilial(e?.id)}
                  className={`${filial === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between  mb-1 text-[14px]  w-full hover:bg-sidebar px-3  py-2.5`}
                >
                  {e.title}
                </button>
              ))}
          </div>
          {meUser?.position.role !== 6 && (
            <div className="p-3 px-0 mx-5 ">
              {flatDataFilial
                ?.filter((i) => i.type === "warehouse")
                .map((e) => (
                  <button
                    key={e?.id}
                    disabled={filialTo === e.id}
                    onClick={() => setFilial(e?.id)}
                    className={`${filial === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between  mb-1 text-[14px]  w-full hover:bg-sidebar px-3  py-2.5`}
                  >
                    {e.title}
                  </button>
                ))}
            </div>
          )}
        </div>
        {meUser?.position.role === 9 ? (
          <div className={`w-full h-full border-r border-border `}>
            <div className="w-full flex h-[64px] items-center justify-between border-border border-solid border-b p-[21.22px] bg-sidebar">
              <h4 className="text-[14px] font-semibold text-foreground">
                В филиал
              </h4>
            </div>
            <div className="p-3 px-0 mx-5 border-b border-border pb-5">
              {flatDataFilial
                ?.filter((i) => i.type === "filial")
                .map((e) => (
                  <button
                    key={e?.id}
                    disabled={filial === e.id}
                    onClick={() => setFilialTo(e?.id)}
                    className={`${filialTo === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between  mb-1 text-[14px]  w-full hover:bg-sidebar px-3  py-2.5`}
                  >
                    {e.title}
                  </button>
                ))}
            </div>
            <div className="p-3 px-0 mx-5 border-b border-border">
              {flatDataFilial
                ?.filter((i) => i.type === "market")
                .map((e) => (
                  <button
                    key={e?.id}
                    disabled={filial === e.id}
                    onClick={() => setFilialTo(e?.id)}
                    className={`${filialTo === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between  mb-1 text-[14px]  w-full hover:bg-sidebar px-3  py-2.5`}
                  >
                    {e.title}
                  </button>
                ))}
            </div>
            <div className="p-3 px-0 mx-5 border-b border-border">
              {flatDataFilial
                ?.filter((i) => i.type === "dealer")
                .map((e) => (
                  <button
                    key={e?.id}
                    disabled={filial === e.id}
                    onClick={() => setFilialTo(e?.id)}
                    className={`${filialTo === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between  mb-1 text-[14px]  w-full hover:bg-sidebar px-3  py-2.5`}
                  >
                    {e.title}
                  </button>
                ))}
            </div>
            <div className="p-3 px-0 mx-5 ">
              {flatDataFilial
                ?.filter((i) => i.type === "warehouse")
                .map((e) => (
                  <button
                    key={e?.id}
                    disabled={filial === e.id}
                    onClick={() => setFilialTo(e?.id)}
                    className={`${filialTo === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between  mb-1 text-[14px]  w-full hover:bg-sidebar px-3  py-2.5`}
                  >
                    {e.title}
                  </button>
                ))}
            </div>
          </div>
        ) : (
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
                // { id: "New", name: "Новые" },
              ].map((e) => (
                <button
                  key={e?.id}
                  disabled={filial === e.id}
                  onClick={() => setType(e?.id)}
                  className={`${type === e.id ? "bg-sidebar" : ""} group text-foreground flex items-center justify-between  mb-1 text-[14px]  w-full hover:bg-sidebar px-3  py-2.5`}
                >
                  {e.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="col-span-8">
        <Filters />
        <DataTable
          isLoading={isLoading}
          columns={meUser?.position.role == 6 ? collactionColumns: paymentColumns}
          data={meUser?.position.role == 6 ? [{ id: 1 }, { id: 1 }] as unknown as  TransferData[] : flatData}
          // fetchNextPage={fetchNextPage}
          // hasNextPage={hasNextPage ?? false}
          // isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}
