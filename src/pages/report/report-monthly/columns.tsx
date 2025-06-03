import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { Statement } from "@/pages/statement/type";
import { Button } from "@/components/ui/button";
import { useStateStatement } from "./mutations";

// Status badge renderer

export const StatementColumns: ColumnDef<Statement>[] = [
  {
    header: "Название",
    accessorKey: "title",
  },
  {
    header: "Дата создание",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return (
        <span className="text-foreground">
          {format(new Date(row.original.createdAt), "dd.MM.yyyy")}
        </span>
      );
    },
  },
  {
    header: "Премии",
    accessorKey: "premiumsTotal",
    cell: ({ row }) => {
      return <span className="text-[#58A0C6]">{row.original.premium} $</span>;
    },
  },
  {
    header: "Бонусы",
    accessorKey: "bonusesTotal",
    cell: ({ row }) => {
      return (
        <span className="text-[#C3AD54]">{row.original.payroll?.bonus} $</span>
      );
    },
  },
  {
    header: "Зарплата",
    accessorKey: "salaryTotal",
    cell: ({ row }) => {
      return <span className="text-[#E38157]">{row.original.total} $</span>;
    },
  },
  {
    header: "Итого сумма",
    accessorKey: "totalSum",
    cell: ({ row }) => {
      return (
        <span className="text-[#5D5D53]">
          {row.original?.total?.toLocaleString()} $
        </span>
      );
    },
  },
  {
    header: "Статус",
    accessorKey: "status",
    cell: ({ row }) => {
      const stateStatement = useStateStatement();
      return (
        <Button
          onClick={row?.original?.status == "Sent" ? (e) =>{
            e.stopPropagation()
             stateStatement.mutateAsync({
              id: String(row.original.id),
              data: { status: "Accepted" },
            })
          }: ()=>{}
          }
          disabled={row?.original?.status != "Sent"}
          className="rounded-[63px] bg-[#89A143]"
        >
          {" "}
          {row?.original?.status == "Sent" ? "Принять" : row?.original?.status}
        </Button>
      );
    },
  },
];
