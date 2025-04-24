import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import TableAction from "@/components/table-action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { apiRoutes } from "@/service/apiRoutes";

import { TData } from "../type";

export const FinanceColumns: ColumnDef<TData>[] = [
  {
    header: "Дата",
    accessorKey: "date",

    cell: ({ row }) => {
      return <p>{format(row.original.date, "MMMM")} </p>;
    },
  },
  {
    header: "Сумма",
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
    header: "Скидка",
    cell: () => {
      return <p className={` text-[#E38157] `}></p>;
    },
  },

  {
    header: "Навар",
    accessorKey: "model.title",
  },
  {
    header: "Объём",
    accessorKey: "size.title",
  },
  {
    header: "Приход",
    accessorKey: "filial.title",
  },
  {
    header: "Расход",
    accessorKey: "sller.title",
    cell: () => {
      return <p className={` text-[#E38157] `}></p>;
    },
  },
  {
    header: "Закрыл",
    accessorKey: "casher.title",
  },
  {
    header: "Принял",
    accessorKey: "casher.title",
    cell: () => {
      return (
        <Avatar className="w-[40px] h-[40px]">
          <AvatarImage src="" />
        </Avatar>
      );
    },
  },
  {
    header: "Статус",
    accessorKey: "",
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
