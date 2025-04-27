// table/columns.tsx
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Award } from "../type";

export const AwardColumns: ColumnDef<Award>[] = [
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
    header: "Дата создания премии",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      return format(new Date(row.original.createdAt), "dd.MM.yyyy");
    },
  },
  {
    header: "Сумма",
    accessorKey: "amount",
    cell: ({ row }) => {
      return <span>{row.original.amount} $</span>;
    },
    size: 120,
  },
  {
    id: "actions",
    enableHiding: true,
    cell: function ActionsCell({ row }) {
      const [, setEditId] = useQueryState("editId");
      const [, setDeleteId] = useQueryState("deleteId");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setEditId(row.original.id)}>
              Редактировать
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-600"
              onClick={() => setDeleteId(row.original.id)}
            >
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];