import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { TKassareportData } from "./type";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const KassaColumnsLoc: ColumnDef<TKassareportData>[] = [
  {
    id: "startDate",
    header: "Дата",
    cell: ({ row }) => {
      const month =[
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
      ]
      const item = row.original;
      const isTrue =item?.kassaReportStatus == 2
      return (
        <p className={`${isTrue?  "text-[#89A143]":""}`}>
          { isTrue
            ? month[item?.month - 1] +  "-Продалажется"
            : month[item?.month - 1] || ""}
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
      return <p className="text-[#58A0C6]"> {item?.totalSum} $</p>;
    },
  },

  {
    header: "Скидка",
    id: "discount",
    cell: ({ row }) => {
      const item = row.original;
      return <p className={ item?.totalDiscount !=  0? 'text-[#E38157]' :""}> {item?.totalDiscount} $</p>;
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
      return <p className="text-[#E38157]"> {item?.totalExpense} $</p>;
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
  {
    header: "Принял",
    id: "closer",
    cell: () => {
      return (
        <div className="flex gap-2 items-center">
             <Avatar className="w-[40px] h-[40px]">
                {/* <AvatarImag src={minio_img_url + seller?.avatar?.path}/> */}
                <AvatarFallback className="bg-primary text-white w-[40px] flex items-center justify-center h-[40px]">
                  MM
                </AvatarFallback>
              </Avatar>
              <Avatar className="w-[40px] h-[40px]">
                {/* <AvatarImag src={minio_img_url + seller?.avatar?.path}/> */}
                <AvatarFallback className="bg-primary text-white w-[40px] flex items-center justify-center h-[40px]">
                  AA
                </AvatarFallback>
              </Avatar>
          {/* {
            <img
              className="w-[40px] rounded-full border-background border h-[40px]"
              src={minio_img_url + item?.closer?.avatar?.path}
            />
          } */}
          {/* {item?.status != "closed_by_c" ? (
            <img
              className="w-[40px]  border-background border-[2px]  -translate-x-2 rounded-full h-[40px]"
              src={minio_img_url + item?.closer_m?.avatar?.path}
            />
          ) : (
            ""
          )} */}
        </div>
      ) 
    },
  },
  {
    header: "Статус",
    id: "status",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div onClick={(e) => e.stopPropagation()}>
          {
            item?.reportStatus ==1 &&  <Button variant={"outline"}   className="rounded-[63px] text-primary/40"> Принято </Button>
          }
          {
            item?.reportStatus ==2 &&  <Button  variant={"outline"} className="rounded-[63px] text-[#89A143] border-none"> Продалажется</Button>
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
