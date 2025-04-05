import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";


import { DataTable } from "@/components/ui/data-table";

const data: unknown[] = [
  {
    id: 1,
    image: ["/image.png"],
    barcode: "234472932",
    collection: "Elexus Kalipso",
    model: "A9230",
    color: "Кремовая",
    style: "Классик",
    shape: "Прямоугольный",
    size: "200X300",
    quantity: 12,
    branch: "3 - Филиалах",
    price: 12,
    total: 380000,
  },
  {
    id: 2,
    image: ["/image.png"],
    barcode: "234472933",
    collection: "Elexus Kalipso",
    model: "A9231",
    color: "Белая",
    style: "Классик",
    shape: "Прямоугольный",
    size: "200X300",
    quantity: 12,
    branch: "3 - Филиалах",
    price: 12,
    total: 380000,
  },
  {
    id: 3,
    image: ["/image.png"],
    barcode: "234472934",
    collection: "Elexus Kalipso",
    model: "A9232",
    color: "Серая",
    style: "Классик",
    shape: "Прямоугольный",
    size: "200X300",
    quantity: 12,
    branch: "3 - Филиалах",
    price: 12,
    total: 380000,
  },
];
export default function List() {
  const [pagination, setPagination] = useState<any>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns: [
      { accessorKey: "barcode", header: "Баркод" },
      { accessorKey: "collection", header: "Коллекция" },
      { accessorKey: "model", header: "Модель" },
      { accessorKey: "color", header: "Цвет" },
      { accessorKey: "price", header: "Цена" },
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
  });
  return (
    <div className="border-[#CBCBC1]  border w-[65%]">
      <DataTable
        className="mx-4"
        isLoading={false}
        columns={table.getAllColumns()}
        data={data ?? []}
      />
    </div>
  );
}