import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useQueryState } from "nuqs";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Statement } from "../type";

export const ActionCell = ({ row }: { row: Row<Statement> }) => {
     const navigate = useNavigate();
      const [, setDeleteId] = useQueryState("deleteId");
      const [, setEditId] = useQueryState("editId");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigate(`/statement/${row.original.id}`)}>
              Подробности
            </DropdownMenuItem>
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
}