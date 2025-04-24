import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PencilIcon, PhoneCall,User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Client } from "../type";

// Status badge renderer
const StatusBadge = ({ status }: { status: string }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  
  switch (status) {
    case "Активный":
      variant = "default"; // Green
      break;
    case "Новый":
      variant = "secondary"; // Gray
      break;
    case "Неактивный":
      variant = "outline"; // Outlined
      break;
    default:
      variant = "default";
  }
  
  return (
    <Badge variant={variant}>
      {status}
    </Badge>
  );
};

// Filial name mapper
const getFilialName = (filialCode: string): string => {
  const filialMap: Record<string, string> = {
    "central": "Центральный",
    "east": "Восточный",
    "west": "Западный",
    "north": "Северный",
    "south": "Южный",
  };
  
  return filialMap[filialCode] || filialCode;
};

// Factory pattern for creating columns with edit handler
export const ClientColumns = (): ColumnDef<Client>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getRowModel().rows.length > 0 &&
          table.getRowModel().rows.every(row => 
            row.getIsSelected()
          )
        }
        onCheckedChange={(checked) => {
          table.toggleAllRowsSelected(!!checked);
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(checked) => {
          row.toggleSelected(!!checked);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    id: "name",
    header: "ФИО",
    cell: ({ row }) => (
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
          <User className="h-4 w-4 text-gray-500" />
        </div>
        <div>
          <div className="font-medium">{row.original.name} {row.original.secondName}</div>
          {row.original.status && (
            <StatusBadge status={row.original.status} />
          )}
        </div>
      </div>
    ),
    size: 200,
  },
  {
    id: "phone",
    header: "Телефон",
    accessorKey: "phone",
    cell: ({ row }) => (
      <div className="flex items-center">
        <PhoneCall className="h-4 w-4 mr-2 text-gray-500" />
        <span>{row.original.phone}</span>
      </div>
    ),
    size: 150,
  },
  {
    id: "filial",
    header: "Филиал",
    accessorKey: "filial",
    cell: ({ row }) => (
      <span>{getFilialName(row.original.filial)}</span>
    ),
    size: 120,
  },
  {
    id: "comment",
    header: "Комментарий",
    accessorKey: "comment",
    cell: ({ row }) => {
      const comment = row.original.comment;
      if (!comment) return null;
      
      return (
        <div className="max-w-xs truncate text-gray-500">
          {comment}
        </div>
      );
    },
    size: 200,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function onViewDetails(_original: Client): void {
        throw new Error("Function not implemented.");
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      function onEdit(_original: Client): void {
        throw new Error("Function not implemented.");
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onViewDetails(row.original)}>
              <User className="mr-2 h-4 w-4" /> Подробности
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onEdit(row.original)}>
              <PencilIcon className="mr-2 h-4 w-4" /> Редактировать
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 40,
  },
];