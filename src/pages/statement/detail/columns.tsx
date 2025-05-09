import { ColumnDef } from "@tanstack/react-table";
import { Gem, Gift, IdCardIcon, MoreHorizontal } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Statement } from "../type";

export const StatementEmployeeColumns = (): ColumnDef<Statement>[] => [
  {
    id: "employee",
    header: "Сотрудник",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar className="h-9 w-9 mr-2">
            <AvatarImage
              src={
                row.original.avatar ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd_XRGE9j0tQkvkYFKQU5MlZw86IXuV9TbfA&s"
              }
            />
            <AvatarFallback className="bg-primary text-white">
              {row.original.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="font-normal text-foreground tetx-[13px]">
            {row.original.name}
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
          {row.original.filial}
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
          {row.original.salary} $
        </span>
      );
    },
  },
  {
    header: "Бонус",
    accessorKey: "bonus",
    cell: ({ row }) => {
      return row.original.bonus ? (
        <span className="text-[#C3AD54] flex items-center">
          {" "}
          <Gem className="mr-1 text-[12px]" size={18} /> +{row.original.bonus} $
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
      return row.original.premium ? (
        <span className="text-[#94C3DC] flex items-center">
          <Gift className="mr-1 text-[12px]" size={18} /> +
          {row.original.premium} $
        </span>
      ) : (
        <span>—</span>
      );
    },
  },
  {
    header: "Аванс",
    accessorKey: "advance",
    cell: ({ row }) => {
      return row.original.advance ? (
        <span className="text-[#E38157] flex items-center">
          {" "}
          <IdCardIcon className="mr-1 text-[12px]" size={18} />{" "}
          {row.original.advance} $
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
          {row.original.total} $
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
          {row.original.plastic} $
        </span>
      );
    },
  },
  {
    header: "Наличные",
    accessorKey: "cash",
    cell: ({ row }) => {
      return (
        <span className="p-2 border bg-[#EAEADE]">{row.original.cash} $</span>
      );
    },
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Редактировать</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Удалить
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
