import { ColumnDef } from "@tanstack/react-table";

import { ProductData } from "@/pages/filial/type";

export const Columns: ColumnDef<ProductData>[] = [
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
      return <p>{row.original?.count}x</p>;
    },
  },
];
