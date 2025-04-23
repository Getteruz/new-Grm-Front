import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

import { TData } from "../type";

export const Columns: ColumnDef<TData>[] = [
  {
    header: "Дата",
    accessorKey: "date",

    cell: ({ row }) => {
      return <p>{format(row.original.date, "d-MMMM")} </p>;
    },
  },
  {
    header: "Наличие",
    accessorKey: "price",

    cell: ({ row }) => {
      return <p className="text-[#89A143]">{row.original.price} $</p>;
    },
  },
  {
    header: "Онлайн",
    accessorKey: "price",

    cell: ({ row }) => {
      return <p className="text-[#58A0C6]">{row.original.price} $</p>;
    },
  },
  {
    header: "Тип",
    cell: ({ row }) => {
      return (
        <div className="flex">
          <p
            className={`${row.original.type === "Приход" ? "border-[#89A143] text-[#89A143]" : "border-[#E38157] text-[#E38157]"} rounded-4xl px-[14px]  w-[100px] text-center py-3 border `}
          >
            {row.original.tip === "order" ? "Продажа" : row.original.tip}
          </p>
        </div>
      );
    },
  },
  {
    header: "collection",
    accessorKey: "collection.title",
  },
  {
    header: "model",
    accessorKey: "model.title",
  },
  {
    header: "size",
    accessorKey: "size.title",
  },
  {
    header: "Филиал",
    accessorKey: "filial.title",
  },
  {
    header: "Продавец",
    accessorKey: "filial.title",
  },
  {
    header: "Кассир",
    accessorKey: "filial.title",
  },
  {
    header: "Время",
    accessorKey: "date",

    cell: ({ row }) => {
      return <p>{format(row.original.date, "HH:mm")} </p>;
    },
  },
  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
    cell: ({ row }) => {
      return <TableAction url={apiRoutes.qrBase} id={row.original?.id} />;
    },
  },
];
