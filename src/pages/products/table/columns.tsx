import { ColumnDef } from "@tanstack/react-table";

import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

import { ProductsData } from "../type";

export const ProductColumns: ColumnDef<ProductsData>[] = [
  {
    accessorKey: "id",
    header: "#N",
    size: 50,
  },
  {
    id: "code",
    header: "code",
    accessorKey: "code",
  },
  {
    header: "collection",
    cell: ({ row }) => {
      return <p>{row.original.model?.collection?.title}</p>;
    },
  },
  {
    header: "model",
    cell: ({ row }) => {
      return <p>{row.original.model?.title}</p>;
    },
  },
  {
    header: "size",
    cell: ({ row }) => {
      return <p>{row.original.size}</p>;
    },
  },
  {
    header: "count",
    cell: ({ row }) => {
      return <p>{row.original.count}шт</p>;
    },
  },
  {
    header: "shape",
    cell: ({ row }) => {
      return <p>{row.original.shape}</p>;
    },
  },
  {
    header: "style",
    cell: ({ row }) => {
      return <p>{row.original.style}</p>;
    },
  },
  {
    header: "color",
    cell: ({ row }) => {
      return <p>{row.original.color?.title}</p>;
    },
  },
  {
    header: "price",
    cell: ({ row }) => {
      return <p>{row.original.price} $</p>;
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
