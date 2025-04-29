import { ColumnDef } from "@tanstack/react-table";

import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

import { TransferData } from "../type";

export const paymentColumns: ColumnDef<TransferData>[] = [
  {
    accessorKey: "id",
    header: "№",
    size: 50,
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },

  {
    header: "collection",
    id: "product?.bar_code?.collection?.title",
    accessorKey: "product.bar_code.collection.title",
  },
  {
    header: "model",
    id: "product.bar_code.model.title",
    accessorKey: "product.bar_code.model.title",
  },
  {
    header: "size",
    cell: ({ row }) => {
      return (
        <p>{`${row.original?.product.bar_code.size.x * 100}X${(row.original?.product.y * 100).toFixed()}`}</p>
      );
    },
  },
  {
    header: "Обьём",
    id: "product.bar_code.shape.title",
    accessorKey: "product.bar_code.shape.title",
    cell: ({ row }) => {
      return (
        <p>
          {`${(row.original?.product.bar_code.size.x * row.original?.product.y).toFixed(1)}`}{" "}
          м²
        </p>
      );
    },
  },

  {
    header: "shape",
    id: "product.bar_code.shape.title",
    accessorKey: "product.bar_code.shape.title",
  },
  {
    header: "style",
    id: "product.bar_code.style.title",
    accessorKey: "product?.bar_code?.style?.title",
  },
  {
    header: "color",
    id: "product.bar_code.color.title",
    accessorKey: "product.bar_code.color.title",
  },
  {
    header: "country",
    id: "product.bar_code.country.title",
    accessorKey: "product.bar_code.country.title",
  },

  {
    header: "count",
    cell: ({ row }) => {
      return <p>{row.original.count} x</p>;
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
          url={apiRoutes.transfers}
          ShowPreview
          id={row.original?.id}
        />
      );
    },
  },
];
