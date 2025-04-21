import { ColumnDef } from "@tanstack/react-table";
import { MinusSquare, PlusSquare } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ProductData } from "@/pages/filial/type";

import { Columns } from "./columns";
import Filter from "./filter";
import useDataFetch from "./queries";

export default function SinglePage() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const [search] = useQueryState("search");
  const { id, uuid } = useParams();

  const [transferData, setTransferData] = useState<ProductData[]>([]);
  const [seleted, setSeleted] = useState<string[]>([]);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataFetch({
      queries: {
        limit,
        page,
        search: search || undefined,
        filialId: id || undefined,
      },
    });
  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
  const filteredData = flatData
    .filter((item) => seleted?.includes(item.id))
    .map((i) => ({ ...i, from: id, to: uuid, product: i.id, count: 1 }));

  const TransferColumns: ColumnDef<ProductData>[] = [
    {
      header: "№",
      cell: ({ row }) => {
        return <p>{row.index + 1}</p>;
      },
    },

    {
      header: "collection",
      cell: ({ row }) => {
        return <p>{row.original?.bar_code?.collection?.title}</p>;
      },
    },

    {
      header: "model",
      cell: ({ row }) => {
        return <p>{row.original?.bar_code?.model?.title}</p>;
      },
    },
    {
      header: "size",
      cell: ({ row }) => {
        return <p>{row.original?.bar_code?.size?.title}</p>;
      },
    },

    {
      header: "Обём",
      cell: ({ row }) => {
        return (
          <p>
            {(
              Number(row.original?.bar_code?.size?.x) *
              Number(row.original?.bar_code?.size?.y)
            ).toFixed(1)}
            м²
          </p>
        );
      },
    },
    {
      header: "color",
      cell: ({ row }) => {
        return <p>{row.original?.bar_code?.color?.title}</p>;
      },
    },

    {
      header: "country",
      cell: ({ row }) => {
        return <p>{row.original?.bar_code?.country?.title}</p>;
      },
    },
    {
      header: "count",
      cell: ({ row }) => {
        return (
          <>
            {row.original.bar_code.isMetric ? (
              <input
                type="number"
                min={0}
                max={row.original?.count}
                value={row.original?.count}
                className="w-16 h-4 border rounded p-2.5 outline-none"
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setTransferData((prevData) => {
                    return prevData.map((item) => {
                      if (item.id === row.original.id) {
                        return { ...item, count: value };
                      } else return item;
                    });
                  });
                }}
              />
            ) : (
              <div className="flex items-center">
                <button
                  disabled={row.original.count === 1}
                  onClick={() => {
                    setTransferData((prevData) => {
                      return prevData.map((item) => {
                        if (item.id === row.original.id) {
                          return { ...item, count: row.original.count - 1 };
                        } else return item;
                      });
                    });
                  }}
                >
                  <MinusSquare color="#21212180" />
                </button>

                <p className="  rounded font-medium w-8 h-[22px] flex justify-center items-center text-center border border-[#21212180] ">
                  {row.original?.count}
                </p>
                <button
                  disabled={
                    row.original.count <=
                    (transferData?.find((i) => i?.id === row.original.id)
                      ?.count ?? 0)
                  }
                  onClick={() => {
                    setTransferData((prevData) => {
                      return prevData.map((item) => {
                        if (item.id === row.original.id) {
                          return { ...item, count: row.original.count + 1 };
                        } else return item;
                      });
                    });
                  }}
                >
                  <PlusSquare color="#21212180" />
                </button>
              </div>
            )}
          </>
        );
      },
    },
  ];

  return (
    <div className=" w-full h-full">
      <Filter
        setTransferData={setTransferData}
        selectedData={filteredData}
        transferData={transferData}
      />
      <div className="grid grid-cols-2 h-[calc(100%-100px)]">
        <DataTable
          isLoading={isLoading}
          columns={Columns}
          data={flatData ?? []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
          onSelectionChange={(e) => {
            const newIds = e.map((item) => item.id);

            if (JSON.stringify(seleted) !== JSON.stringify(newIds)) {
              setSeleted(newIds);
            }
          }}
        />

        <div className=" border-l h-full flex flex-col justify-between">
          <DataTable
            isLoading={false}
            columns={TransferColumns}
            data={transferData || []}
          />
          <div className="bg-[#E6E6D9] h-[44px] flex justify-end">
            <Button className="h-full w-[172px]" variant={"outline"}>
              Отменить
            </Button>
            <Button className="h-full w-[172px]"> Сохранить</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
