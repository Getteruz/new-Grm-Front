import { ColumnDef } from "@tanstack/react-table";

import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

import { ProductsData } from "../type";

export const ProductColumns: ColumnDef<ProductsData>[] = [
  {
    accessorKey: "id",
    header: "№",
    size: 50,
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },
  {
    header: "Баркод",
    id: "bar_code.code",
    accessorKey: "bar_code.code",
  },
  {
    header: "collection",
    id: "bar_code.collection.title",
    accessorKey: "bar_code.collection.title",
  },
  {
    header: "model",
    id: "bar_code.model.title",
    accessorKey: "bar_code.model.title",
  },
  {
    header: "size",
    cell: ({ row }) => {
      return (
        <p>{`${row.original?.bar_code.size.x * 100}X${(row.original?.y * 100).toFixed()}`}</p>
      );
    },
  },
  {
    header: "Обьём",
    id: "bar_code.shape.title",
    accessorKey: "bar_code.shape.title",
    cell: ({ row }) => {
      return (
        <p>
          {`${(row.original?.bar_code.size.x * row.original?.y).toFixed(1)}`} м²
        </p>
      );
    },
  },

  {
    header: "shape",
    id: "bar_code.shape.title",
    accessorKey: "bar_code.shape.title",
  },
  {
    header: "style",
    id: "bar_code.style.title",
    accessorKey: "bar_code.style.title",
  },
  {
    header: "color",
    id: "bar_code.color.title",
    accessorKey: "bar_code.color.title",
  },
  {
    header: "country",
    id: "bar_code.country.title",
    accessorKey: "bar_code.country.title",
  },
  {
    header: "factory",
    id: "bar_code.factory.title",
    accessorKey: "bar_code.factory.title",
  },
  {
    header: "Партия",
    id: "bar_code.partiya_no.title",
    accessorKey: "bar_code.partiya_no.title",
  },
  {
    header: "count",
    cell: ({ row }) => {
      return <p>{row.original.count} x</p>;
    },
  },
  {
    header: "Кас-цена",
    cell: ({ row }) => {
      return <p>{row.original.priceMeter} $</p>;
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
          ShowUpdate={false}
          ShowDelete={false}
          ShowPreview
          id={row.original?.id}
        />
      );
    },
  },
];
