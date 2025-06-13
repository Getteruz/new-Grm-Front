import { ColumnDef } from "@tanstack/react-table";

import TableAction from "@/components/table-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiRoutes } from "@/service/apiRoutes";

import { TData } from "./type";

export const Columns: ColumnDef<TData>[] = [
  {
    id: "startDate",
    header: "Дата",
    cell: () => {
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
      const isTrue =false
      return (
        <p className={`${isTrue?  "text-[#89A143]":""}`}>
          { isTrue
            ? month[2] +  "-Продалажется"
            : month[2] || ""}
        </p>
      );
    },
  },
  {
    header: "Отправлено",
    accessorKey: "price",
    cell: () => {
      return <p>50 450 $</p>;
    },
  },
  {
    header: "Получено",
    accessorKey: "size.title",
    cell: () => {
      return <p>50 450 $</p>;
    },
  },
  {
    header: "Навар",
    accessorKey: "sller.title",
    cell: () => {
      return (
          <p className="text-[##E38157] ">
         67 890 $
          </p>
      );
    },
  },
  {
    header: "Расход",
    accessorKey: "filial.title",
    cell: () => {
      return (
        <p className="text-[#E38157] ">
       -90 $
        </p>
      );
    },
  },
  {
    header: "Менеджера",
    accessorKey: "casher.title",
    cell: () => {
      return (
        <div className="flex gap-1 justify-start">
          <Avatar className="w-12 h-12">
            <AvatarImage src={undefined} />
            <AvatarFallback>DD</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    header: "Статус",
    accessorKey: "date",

    cell: ({ row }) => {
      return (
        <div className="flex">
          <p
            className={`${row.original.tip === "Приход" ? "border-[#E38157] text-[#E38157]" : "border-border text-primary"}  rounded-4xl px-[14px]  text-center py-2 border `}
          >
            {row.original.tip === "order" ? "Принято" : "Не принято"}
          </p>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
    cell: ({ row }) => {
      return <TableAction url={apiRoutes.qrBase} id={row.original?.id} />;
    },
  },
];

