import { ColumnDef } from "@tanstack/react-table";

import TableAction from "@/components/table-action";

import { TData } from "../type";


export const Columns: ColumnDef<TData>[] = [
 
  {
    header: "code",
    accessorKey: "code",
  },

  {
    header: "country",
    cell: ({ row }) => {
      return <p>{row.original?.country?.title}</p>;
    },
  },
  {
    header: "collection",
    cell: ({ row }) => {
      return <p>{row.original?.collection?.title}</p>;
    },
  },
  {
    header: "size",
    cell: ({ row }) => {
      return <p>{row.original?.model?.title}</p>;
    },
  },
  {
    header: "isMetric",
    cell: ({ row }) => {
      return <p>{row.original?.isMetric}</p>;
    },
  },
  {
    header: "shape",
    cell: ({ row }) => {
      return <p>{row.original.shape.title}</p>;
    },
  },
  {
    header: "size",
    cell: ({ row }) => {
      return <p>{row.original.size?.x}X{row.original.size?.y}</p>;
    },
  },
  {
    header: "style",
    cell: ({ row }) => {
      return <p>{row.original.style?.title}</p>;
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
          url={'/bugalteriya/data-library'}
          ShowDelete={false}
          ShowPreview
          id={row.original?.id}
        />
      );
    },
  },
];
