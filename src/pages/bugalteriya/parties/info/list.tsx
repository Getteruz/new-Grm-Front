import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  CheckIcons,
  EditIcons,
  FilterIcons,
  Remove1Icons,
  SearchAIIcons,
} from "@/components/icons";
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
      <div className="bg-[#DBDAD1] border-[#CBCBC1] border-b  flex gap-1 p-[5px] ">
        <div className="flex items-center pl-2 justify-center bg-[#E0DFD6] border-[#CBCBC1] w-full max-w-[240px] border ">
          <SearchAIIcons />
          <input
            placeholder="search"
            className=" rounded-[2px]  py-[9px] pl-1 px-[12px]  text-[16px] w-full leading-[19px]"
          />
        </div>
        <button className="border-[#D1D0C8] text-black text-[12px] py-[5px] px-[16px] leading-[19px]  gap-1 shadow-none rounded-none border-[1px]  flex items-center justify-center bg-[#E0DFD6] hover:bg-[#D1D0C8]">
          <FilterIcons /> Фильтр
        </button>
        <button className="border-[#D1D0C8] text-black text-[12px] py-[5px] px-[16px] leading-[19px]  gap-1 shadow-none rounded-none border-[1px]  flex items-center justify-center bg-[#E0DFD6] hover:bg-[#D1D0C8]">
          Сортировка
          <FilterIcons />
        </button>
        <button className="gap-[1.5px] rounded-[2px] ml-auto text-[#767671]  py-[5px] px-[12px] text-[16px] border-[#CBCBC1] border  leading-[19px] bg-[#E0DFD6] flex items-center justify-center">
          <EditIcons color={"#767671"} />
          Изменить
        </button>
        <button className="gap-[1.5px] rounded-[2px] text-[#767671] ml-1 py-[5px] px-[12px] text-[16px] border-[#CBCBC1] border  leading-[19px] bg-[#E0DFD6] flex items-center justify-center">
          <Remove1Icons />
          Убрать
        </button>
      </div>
      <DataTable
        className="mx-4"
        isLoading={false}
        columns={table.getAllColumns()}
        data={data ?? []}
      />
      <div className="bg-[#DBDAD1] border-[#CBCBC1] border-b  flex gap-1 p-[5px] ">
        <div className="border text-[13px] py-1 px-2 rounded-[2px] leaaing-[15] text-[#78786C] border-[#CBCBC1] bg-[#E0DFD6] flex items-center ">
          <CheckIcons /> Выбранные:
          <span className="ml-2">82</span>
        </div>
        <div className="border text-[13px] mx-auto py-1 px-2 rounded-[2px] leaaing-[15] text-[#78786C] border-[#CBCBC1] gap-2 bg-[#E0DFD6] flex items-center ">
          Объем:
          <span>1 208 м²</span>
        </div>
        <div className="border text-[13px] py-1 px-2 rounded-[2px] leaaing-[15] text-[#78786C] border-[#CBCBC1] gap-2 bg-[#E0DFD6] flex items-center ">
          Сумма:
          <span>27 784 $</span>
        </div>
        <div className="border text-[13px] py-1 px-2 rounded-[2px] leaaing-[15] text-[#78786C] border-[#CBCBC1] gap-2 bg-[#E0DFD6] flex items-center ">
          Количество:
          <span>122s</span>
        </div>
      </div>
    </div>
  );
}