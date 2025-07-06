import { ColumnDef } from "@tanstack/react-table";
import { parseAsInteger, parseAsString, useQueryState } from "nuqs";

import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

import { TData } from "../type";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import {  PatchData, UpdateData } from "@/service/apiHelpers";
import { toast } from "sonner";
import debounce from "@/utils/debounce";
import { useParams } from "react-router-dom";
import { useMeStore } from "@/store/me-store";

export const Columns: ColumnDef<TData>[] = [
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
    header: "type-corpet",
    cell: ({ row }) => {
      return (
        <p>{row.original?.bar_code?.isMetric ? "Метражный" : "Штучный"}</p>
      );
    },
  },

  {
    header: "size",
    cell: ({ row }) => {
      return <p>{row.original?.bar_code?.size?.title}</p>;
    },
  },
  {
    header: "count",
    cell: ({ row }) => {
      const [tip] = useQueryState("tip", parseAsString.withDefault("new"));
      return (
        <p>
          {row.original?.bar_code?.isMetric ? (
            tip === "излишки" ? (
              row.original?.check_count - row.original?.y * 100
            ) : tip === "дефицит" ? (
              row.original?.y * 100 - row.original?.check_count
            ) : (
              row.original?.y * 100
            )
          ) : (
            <>
              {tip === "переучет" && row.original?.check_count}
              {tip === "дефицит" &&
                row.original?.count - row.original?.check_count}
              {tip === "излишки" &&
                row.original?.check_count - row.original?.count}
              {tip === "new" && row.original?.count}
            </>
          )}

          {row.original?.bar_code?.isMetric ? "sm" : "x"}
        </p>
      );
    },
  },
  {
    header: "Обём",
    cell: ({ row }) => {
      return (
        <>
          {/* {row.original?.bar_code?.isMetric && ( */}
          <p>
            {Number(row.original?.bar_code?.size?.kv).toFixed(1)}
            м²
          </p>
          {/* )}
          {!row.original?.bar_code?.isMetric && (
            <p>
              {Math.ceil(
                Number(row.original?.bar_code?.size?.x) *
                  Number( row.original?.bar_code?.size?.y)
              )}
              м²
            </p>
          )} */}
        </>
      );
    },
  },
  {
    header: "shape",
    cell: ({ row }) => {
      return <p>{row.original?.bar_code?.shape?.title}</p>;
    },
  },
  {
    header: "color",
    cell: ({ row }) => {
      return <p>{row.original?.bar_code?.color?.title}</p>;
    },
  },
  {
    header: "style",
    cell: ({ row }) => {
      return <p>{row.original?.bar_code?.style?.title}</p>;
    },
  },
  {
    header: "country",
    cell: ({ row }) => {
      return <p>{row.original?.bar_code?.country?.title}</p>;
    },
  },
  // {
  //   header: "factory",
  //   cell: ({ row }) => {
  //     return <p>{row.original?.factory?.title }</p>;
  //   },
  // },

  // {
  //   header: "price",
  //   cell: ({ row }) => {
  //     return <p>{row.original?.collection_price?.priceMeter}$</p>;
  //   },
  // },
  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
    cell: ({ row }) => {
      const { meUser } = useMeStore();
      const [tip] = useQueryState("tip", parseAsString.withDefault(meUser?.position?.role ==7 ? "переучет": "new"));
      return (
     tip != "излишки" ?   <TableAction
          url={apiRoutes.excelProducts}
          ShowPreview={false}
          ShowUpdate={false}
          costomDelete={()=>PatchData(`/excel/change-count/${row?.original?.id}?tip${tip}`,{} )}
          id={row.original?.id}
          refetchUrl={apiRoutes.excelProducts}
        />:""

        
      );
    },
  },
];

export const ColumnsColaction: ColumnDef<TData>[] = [
  {
    header: "collection",
    cell: ({ row }) => {
      return <p>{row.original?.title}</p>;
    },
  },

  {
    header: "Обём",
    cell: ({ row }) => {
      return (
        <>
          <p>
            {Number(row.original?.kv).toFixed(1)}
            м²
          </p>
        </>
      );
    },
  },
  {
    header: "Сумма",
    cell: ({ row }) => {
      const [localPrice] = useQueryState(
        "localPrice",
        parseAsInteger.withDefault(row?.original?.displayPrice || 0)
      );
      return (
        <>
          <p>{Number(localPrice * row.original?.kv).toFixed(1)}$</p>
        </>
      );
    },
  },
  {
    header: "Колво",
    cell: ({ row }) => {
      return <p>{row.original?.count || 0}</p>;
    },
  },
  // {
  //   header: "Сумма",
  //   cell: () => {
  //     return <p>{0}</p>;
  //   },
  // },
  // {
  //   header: "Расход",
  //   cell: ({ row }) => {
  //     return <p>{row.original?.expence}</p>;
  //   },
  // },
  {
    header: "Расход за м²",
    cell: ({ row }) => {
      return <p>{row?.original?.expense} $</p>;
    },
  },
  {
    header: "Зав.цена",
    cell: ({ row }) => {
      const [, setLocalPrice] = useQueryState(
        "localPrice",
        parseAsInteger.withDefault(row?.original?.displayPrice || 0)
      );
      const { id } = useParams();
      const { mutate } = useMutation({
        mutationFn: ({
          cost,
          collectionId,
        }: {
          cost: number;
          collectionId: string;
        }) =>
          UpdateData(apiRoutes.excelCollection, id || "", [
            {
              cost,
              collectionId,
            },
          ]),
        onSuccess: () => {
          toast.success("changed");
          // queryClient.invalidateQueries({ queryKey: [apiRoutes.kassaReports] });
        },
      });
      return (
        <Input
          defaultValue={row?.original?.displayPrice}
          className="w-[120px]"
          onChange={debounce((e) => {
            setLocalPrice(e?.target.value);
            mutate({
              cost: Number(e?.target.value),
              collectionId: row?.original?.id,
            });
          }, 900)}
          placeholder="0"
          type="number"
        />
      );
    },
  },
  {
    header: "Касса за м²",
    cell: ({ row }) => {
      return <p>{row?.original?.collectionPrice?.priceMeter} $</p>;
    },
  },

  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
    cell: ({ row }) => {
      const { meUser } = useMeStore();
      const [tip] = useQueryState("tip", parseAsString.withDefault(meUser?.position?.role ==7 ? "переучет": "new"));
      return (
     tip != "излишки" ?   <TableAction
          url={apiRoutes.excelProducts}
          ShowPreview={false}
          ShowUpdate={false}
          costomDelete={()=>PatchData(`/excel/change-count/${row?.original?.id}?tip${tip}`,{} )}
          id={row.original?.id}
          refetchUrl={apiRoutes.excelProducts}
        />:""

        
      );
    },
  },
];
