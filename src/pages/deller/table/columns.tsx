import { ColumnDef } from "@tanstack/react-table";

import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

import { TData } from "../type";

export const Columns: ColumnDef<TData>[] = [
  {
    header: "№",
    cell: ({ row }) => {
      return <p>{row?.index + 1}</p>;
    },
  },
  {
    header: "Название",
    accessorKey: "title",
    id: "title",
  },
  {
    header: "Адресс",
    accessorKey: "address",
    id: "address",
  },
  {
    header: "Ответственное лицо",
    accessorKey: "address",
    id: "address",
    cell: ({ row }) => {
      return (
        <p>
          {row?.original?.firstName} {row?.original?.lastName}
        </p>
      );
    },
  },

  {
    header: "Телефон",
    accessorKey: "phone1",
    id: "phone1",
  },
  {
    header: "Задолжность",
  },
  {
    header: "Дано",
  },
  {
    header: "Статус",
    cell: ({ row }) => {
      return <p>{row?.original?.isActive ? "Активный" : "Не активен"}</p>;
    },
  },
  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
    cell: ({ row }) => {
      return <TableAction url={apiRoutes.filial} id={row.original?.id} />;
    },
  },
];
