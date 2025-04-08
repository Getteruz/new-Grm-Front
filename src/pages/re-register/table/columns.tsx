import { ColumnDef } from "@tanstack/react-table";

import { TData } from "../type";
import { parseAsString, useQueryState } from "nuqs";
import { apiRoutes } from "@/service/apiRoutes";
import TableAction from "@/components/table-action";

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
      return <p>{ row.original?.bar_code?.isMetric ? "Метражный":"Штучный"}</p>;
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
      const [type] = useQueryState('type',parseAsString.withDefault('переучет'))
      return <p>
        {row.original?.bar_code?.isMetric ? row.original?.check_count -row.original?.y : <>
          {type === "переучет"  && row.original?.count }
        { type === "дефицит" &&  row.original?.count - row.original?.check_count}
        { type === "излишки" && row.original?.check_count - row.original?.count}
        </> }
     
        {row.original?.bar_code?.isMetric ? "sm":"x"}
      </p>;
    },
  },
  {
    header: "Обём",
    cell: ({ row }) => {
      return <p>{Number(row.original?.bar_code?.size?.x) * Number(row.original?.bar_code?.isMetric   ?  row.original?.check_count:row.original?.bar_code?.size?.y) }м²</p>;
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
  {
    header: "Партия",
    cell: ({ row }) => {
      return <p>{row.original?.partiya ?row.original?.partiya?.title: row.original?.partiya_title}</p>;
    },
  },
  {
    header: "price",
    cell: ({ row }) => {
      return <p>{row.original?.collection_price?.priceMeter}$</p>;
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