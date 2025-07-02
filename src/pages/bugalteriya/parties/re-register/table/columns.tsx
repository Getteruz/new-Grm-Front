import { ColumnDef } from "@tanstack/react-table";
import { parseAsString, useQueryState } from "nuqs";

import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

import { TData } from "../type";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { UpdateData } from "@/service/apiHelpers";
import { toast } from "sonner";
import debounce from "@/utils/debounce";

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
            row.original?.y * 100
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
      return (
        <TableAction
          url={apiRoutes.products}
          ShowPreview={false}
          ShowUpdate={false}
          id={row.original?.id}
          refetchUrl={apiRoutes.productReport}
        />
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
    header: "Зав.цена",
    cell: ({ row }) => {
      const { mutate } = useMutation({
        mutationFn: ({cost}:{cost:number}) =>
          UpdateData(apiRoutes.excelCollection, row?.original?.id, {
            cost:cost
          }),
        onSuccess: () => {
          toast.success("changed");
          // queryClient.invalidateQueries({ queryKey: [apiRoutes.kassaReports] });
        },
      });
      return (
        <Input
          defaultValue={row?.original?.commingPrice}
          className="w-[120px]"
          onChange={debounce((e)=>mutate({cost:Number(e?.target.value)}),900)}
          placeholder="0"
          type="number"
        />
      );
    },
  },
  {
    header: "Касса за м²",
    cell: ({ row }) => {
      return <p>{row?.original?.collection_price?.priceMeter} $</p>;
    },
  },
  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
    cell: ({ row }) => {
      return (
        <TableAction
          url={apiRoutes.products}
          ShowPreview={false}
          ShowUpdate={false}
          id={row.original?.id}
          refetchUrl={apiRoutes.productReport}
        />
      );
    },
  },
];
