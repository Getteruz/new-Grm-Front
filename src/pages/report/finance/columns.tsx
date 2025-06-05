import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { TKassareportData } from "../type";

export const KassaColumnsLoc: ColumnDef<TKassareportData>[] = [
  {
    id: "startDate",
    header: "Дата",
    cell: ({ row }) => {
      const item = row.original;
      const isTrue =item?.kassaReportStatus == 2
      return (
        <p className={`${isTrue?  "text-[#89A143]":""}`}>
          { isTrue
            ? "Продалажется"
            : [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь",
              ][item?.month - 1] || ""}
        </p>
      );
    },
  },
  {
    header: "Наличие",
    id: "totalSum",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="text-[#89A143]"> {item?.totalSum} $</p>;
    },
  },

  {
    header: "Терминал",
    id: "totalSum",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.totalSum} $</p>;
    },
  },

  {
    header: "Скидка",
    id: "discount",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.totalDiscount} $</p>;
    },
  },

  {
    header: "Навар",
    id: "additionalProfitTotalSum",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.additionalProfitTotalSum} $</p>;
    },
  },

  {
    header: "Объём",
    id: "totalSize",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.totalSize} м²</p>;
    },
  },
  {
    header: "Приход",
    id: "income",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.totalIncome} $</p>;
    },
  },
  {
    header: "Расход",
    id: "expense",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.totalExpense} $</p>;
    },
  },
  {
    header: "Инкассация",
    id: "cash_collection",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.totalCashCollection} $</p>;
    },
  },
  // {
  //   header: "Кассир",
  //   id: "closer",
  //   cell: ({ row }) => {
  //     const item = row.original;
  //     return item?.status != "open" ? (
  //       <div className="flex items-center">
  //         {
  //           <img
  //             className="w-[40px] rounded-full border-background border h-[40px]"
  //             src={minio_img_url + item?.closer?.avatar?.path}
  //           />
  //         }
  //         {item?.status != "closed_by_c" ? (
  //           <img
  //             className="w-[40px]  border-background border-[2px]  -translate-x-2 rounded-full h-[40px]"
  //             src={minio_img_url + item?.closer_m?.avatar?.path}
  //           />
  //         ) : (
  //           ""
  //         )}
  //       </div>
  //     ) : (
  //       ""
  //     );
  //   },
  // },
  {
    header: "Статус",
    id: "status",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div onClick={(e) => e.stopPropagation()}>
          {
            item?.kassaReportStatus == 2  ?(
              <Button  variant={"outline"} className="rounded-[63px] text-[#89A143] border-[#89A143]"> Продалажется</Button>
            ):item?.status == "closed" ? (
              <Button   className="rounded-[63px] bg-[#E38157]"> Закрыта </Button>
            ) : item?.status == "accepted" ? (
              <Button disabled variant={"outline"} className="rounded-[63px] "> Принято </Button>
            ) : item?.status == "rejected"? (
              <Button disabled variant={"outline"} className="rounded-[63px] text-[#E38157] border-[#E38157]"> Отменено </Button>
            ):  item?.status == "open"?  <Button  variant={"outline"} className="rounded-[63px] text-[#E38157] border-[#E38157]">  Открыто </Button>: <Button  variant={"outline"} className="rounded-[63px] text-[#89A143] border-[#89A143]"> В процессе </Button>
          }
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "actions",
    cell: () => (
      <Button onClick={(e) => e.stopPropagation()} variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];
