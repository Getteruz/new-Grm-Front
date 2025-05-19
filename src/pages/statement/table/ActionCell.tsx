import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useQueryState } from "nuqs";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { Statement } from "../type";
import { useDeleteStatement } from "./mutations";

export const ActionCell = ({ row }: { row: Row<Statement> }) => {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useQueryState("deleteId");
  const [, setEditId] = useQueryState("editId");
  const deleteStatement = useDeleteStatement();

  const handleDelete = async () => {
    if (deleteId) {
      await deleteStatement.mutateAsync(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
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
          <DropdownMenuItem onClick={() => setEditId(String(row.original.id))}>
            Редактировать
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-red-600"
            onClick={() => setDeleteId(String(row.original.id))}
          >
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить ведомость</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите удалить эту ведомость? Это действие нельзя отменить.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              disabled={deleteStatement.isPending}
            >
              Отмена
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteStatement.isPending}
            >
              {deleteStatement.isPending ? "Удаление..." : "Удалить"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};