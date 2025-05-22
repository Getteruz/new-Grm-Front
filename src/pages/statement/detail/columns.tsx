import { ColumnDef } from "@tanstack/react-table";
import { Gem, Gift, IdCardIcon, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Statement } from "../type";
import { DeleteData } from "@/service/apiHelpers";

export const StatementEmployeeColumns = (): ColumnDef<Statement>[] => {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await DeleteData(`/payroll-items`, id);
      toast.success("Сотрудник удалён");
    } catch (error) {
      toast.error("Ошибка при удалении");
    }
  };

  return [
    {
      id: "employee",
      header: "Сотрудник",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <Avatar className="h-9 w-9 mr-2">
              <AvatarImage
                src={
                  row.original.user?.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd_XRGE9j0tQkvkYFKQU5MlZw86IXuV9TbfA&s"
                }
              />
              <AvatarFallback className="bg-primary text-white">
                {row.original.user?.firstName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="font-normal text-foreground tetx-[13px]">
              {row.original.user?.firstName} {` `}
              {row.original.user?.lastName}
            </div>
          </div>
        );
      },
      size: 200,
    },
    {
      header: "Филиал",
      accessorKey: "filial",
      cell: ({ row }) => {
        return (
          <div className="bg-[#F0F0E5] py-[12px] px-[16px] rounded-full inline-block text-[#5D5D53] text-[12px]">
            {row.original.user?.filial}
          </div>
        );
      },
    },
    {
      header: "Зарплата",
      accessorKey: "salary",
      cell: ({ row }) => {
        return (
          <span className="text-[#E38157] flex items-center">
            {" "}
            <IdCardIcon className="mr-1 text-[12px]" size={18} />{" "}
            {row.original.user?.salary} $
          </span>
        );
      },
    },
    {
      header: "Бонус",
      accessorKey: "bonus",
      cell: ({ row }) => {
        return row.original.payroll?.bonus ? (
          <span className="text-[#C3AD54] flex items-center">
            {" "}
            <Gem className="mr-1 text-[12px]" size={18} /> +{row.original.payroll?.bonus} $
          </span>
        ) : (
          <span>—</span>
        );
      },
    },
    {
      header: "Премии",
      accessorKey: "premium",
      cell: ({ row }) => {
        return row.original.payroll?.award ? (
          <span className="text-[#94C3DC] flex items-center">
            <Gift className="mr-1 text-[12px]" size={18} /> +
            {row.original.payroll?.award} $
          </span>
        ) : (
          <span>—</span>
        );
      },
    },
    {
      header: "Аванс",
      accessorKey: "prepayment",
      cell: ({ row }) => {
        return row.original.payroll?.prepayment ? (
          <span className="text-[#E38157] flex items-center">
            {" "}
            <IdCardIcon className="mr-1 text-[12px]" size={18} />{" "}
            {row.original.payroll?.prepayment} $
          </span>
        ) : (
          <span>—</span>
        );
      },
    },
    {
      header: "Итого",
      accessorKey: "total",
      cell: ({ row }) => {
        return (
          <span className="font-medium text-[#5D5D53] text-[16px]">
            {row.original.payroll?.total} $
          </span>
        );
      },
    },
    {
      header: "Пластик",
      accessorKey: "plastic",
      cell: ({ row }) => {
        return (
          <span className="p-2 border bg-[#F0F0E5]">
            {row.original.payroll?.plastic} $
          </span>
        );
      },
    },
    {
      header: "Наличные",
      accessorKey: "cash",
      cell: ({ row }) => {
        return (
          <span className="p-2 border bg-[#EAEADE]">{row.original.payroll?.in_hand} $</span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                Изменить
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={e => {
                  e.stopPropagation();
                  setDeleteId(String(row.original.id));
                }}  
              >
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {deleteId === String(row.original.id) && (
            <Dialog open={true} onOpenChange={() => setDeleteId(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Вы уверены?</DialogTitle>
                </DialogHeader>
                <div className="flex justify-end gap-4 pt-0 p-4">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteId(null)}
                  >
                    Отмена
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await handleDelete(String(row.original.id));
                      setDeleteId(null);
                    }}
                  >
                    Удалить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </>
      ),
    },
  ];
};
