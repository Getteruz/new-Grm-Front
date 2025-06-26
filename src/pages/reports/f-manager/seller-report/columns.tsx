import { ColumnDef } from "@tanstack/react-table";

import { TData } from "./type";
import TebleAvatar from "@/components/teble-avatar";

export const SellerReportsColumns: ColumnDef<TData>[] = [
  {
    header: "Фото",
    cell: ({ row }) => {
      const item = row.original;
      return <TebleAvatar name={item?.user?.firstName} />;
    },
  },
  {
    header: "Фамилия имя",
    cell: ({ row }) => {
      const item = row.original;
      return <p>{item?.user?.firstName + " " + item?.user?.lastName}</p>;
    },
  },

  {
    header: "Время работы ",
    cell: () => {
      return <p>0 час</p>;
    },
  },
  {
    header: "Количество",
    cell: ({ row }) => {
      const item = row.original;
      return <p>{item?.totalSellCount} шт</p>;
    },
  },
  {
    header: " Объём продаж",
    cell: ({ row }) => {
      const item = row.original;
      return <p>{item?.totalSellKv.toFixed(2)} м²</p>;
    },
  },
  {
    header: "Сумма",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="text-[#89A143]">{item?.totalSellPrice.toFixed(2)} $</p>;
    },
  },
  {
    header: "Скидка",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="text-[#E38157]">{item?.totalDiscount.toFixed(2)} $</p>;
    },
  },

];
