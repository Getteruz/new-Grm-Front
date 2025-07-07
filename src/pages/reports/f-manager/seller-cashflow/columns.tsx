import { ColumnDef } from "@tanstack/react-table";

import { TData } from "./type";
import { ShoppingCart } from "lucide-react";
import ActionBadge from "@/components/actionBadge";

export const SellerCashflowColumns: ColumnDef<TData>[] = [
  {
    header: "Фото",
    cell: () => {
      return (
        <div
          className={`w-12 h-12 flex items-center justify-center bg-[#89A143] text-white"`}
        >
            <ShoppingCart   className={`text-white h-6 w-6`} />
        </div>
      );
    },
  },
  {
    header: "Сумма",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="text-[#89A143]">{item?.price} $</p>;
    },
  },


  {
    header: "Тип",
    cell: () => {
      return <ActionBadge childen="Продажа" status="accepted"/>;
    },
  },
  {
    header: "Коллекция",
    cell: ({row}) => {
      const item = row.original
      return <p>{item?.product?.bar_code?.collection?.title}</p>;
    },
  },
  {
    header: "Модель",
    cell: ({row}) => {
      const item = row.original
      return <p>{item?.product?.bar_code?.model?.title}</p>;
    },
  },
  {
    header: "Размер",
    cell: ({row}) => {
      const item = row.original
      return <p>{item?.product?.bar_code?.size?.title}</p>;
    },
  },
  {
    header: "Цена",
    cell: ({row}) => {
      const item = row.original
      return <p>{item?.product?.price}$</p>;
    },
  },
  {
    header: "Количество",
    cell: ({row}) => {
      const item = row.original
      return <p>{item?.product?.count}x</p>;
    },
  },
  {
    header: "Скидка",
    cell: ({row}) => {
      const item = row.original
      return <p>{item?.additionalProfitSum}%</p>;
    },
  },
];
