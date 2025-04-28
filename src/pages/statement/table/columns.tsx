import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Statement } from "../type";
import { ActionCell } from "./ActionCell";
import { StatusBadge } from "./StatusBadge";

// Status badge renderer


export const StatementColumns: ColumnDef<Statement>[] = [
  {
    accessorKey: "number",
    header: "№",
    size: 60,
  },
  {
    header: "Название",
    accessorKey: "name",
  },
  {
    header: "Дата создание",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return <span className="text-foreground">{format(new Date(row.original.createdAt), "dd.MM.yyyy")}</span>
    },
  },
  {
    header: "Премии",
    accessorKey: "premiumsTotal",
    cell: ({ row }) => {
      return <span className="text-[#58A0C6]">{row.original.premiumsTotal} $</span>;
    },
  },
  {
    header: "Бонусы",
    accessorKey: "bonusesTotal",
    cell: ({ row }) => {
      return <span className="text-[#C3AD54]">{row.original.bonusesTotal} $</span>;
    },
  },
  {
    header: "Зарплата",
    accessorKey: "salaryTotal",
    cell: ({ row }) => {
      return <span className="text-[#E38157]">{row.original.salaryTotal} $</span>;
    },
  },
  {
    header: "Итого сумма",
    accessorKey: "totalSum",
    cell: ({ row }) => {
      return <span className="text-[#5D5D53]">{row.original.totalSum.toLocaleString()} $</span>;
    },
  },
  {
    header: "Статус",
    accessorKey: "status",
    cell: ({ row }) => {
      return <StatusBadge status={row.original.status} />;
    },
  },
  {
    id: "actions",
    enableHiding: true,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];

