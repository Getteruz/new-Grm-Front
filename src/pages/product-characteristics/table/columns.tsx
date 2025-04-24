import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ProductCharacteristic } from "../type";

export const ProductCharacteristicColumns: ColumnDef<ProductCharacteristic>[] =
  [
    {
      id: "index",
      header: "№",
      cell: ({ row }) => {
        return <p>{row.index + 1}</p>;
      },
      size: 50,
    },
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getRowModel().rows.length > 0 &&
            table.getRowModel().rows.every((row) => row.getIsSelected())
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
      id: "collection",
      header: "Коллекция",
      accessorKey: "collection.title",
    },
    {
      id: "characteristics1",
      header: "Характеристика",
      accessorKey: "characteristics1",
      cell: ({ row }) => (
        <div className="max-w-md truncate">{row.original.characteristics1}</div>
      ),
    },
    {
      id: "characteristics2",
      header: "Характеристика",
      accessorKey: "characteristics2",
      cell: ({ row }) => (
        <div className="max-w-md truncate">{row.original.characteristics2}</div>
      ),
    },
    {
      id: "installmentParams",
      header: "Параметры рассрочки",
      accessorKey: "installmentParams",
    },
    {
      id: "actions",
      header: "",
      cell: () => {
        // Modal state
        // const [isModalOpen, setIsModalOpen] = useState(false);
        // const [selectedCharacteristic, setSelectedCharacteristic] =
        //   useState<ProductCharacteristic | null>(null);

        // const openEditModal = () => {
        //   setSelectedCharacteristic(row.original.id);
        //   setIsModalOpen(true);
        // };

        // const closeEditModal = () => {
        //   setIsModalOpen(false);
        //   setSelectedCharacteristic(null);
        // };

        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                // onClick={openEditModal}
                >
                  <PencilIcon className="mr-2 h-4 w-4" /> Редактировать
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Edit Modal */}
            {/* <EditCharacteristicModal
              isOpen={isModalOpen}
              onClose={closeEditModal}
              characteristic={selectedCharacteristic}
            /> */}
          </>
        );
      },
      size: 40,
    },
  ];
