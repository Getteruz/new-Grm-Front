import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import TableAction from "@/components/table-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { minio_img_url } from "@/constants";
import { apiRoutes } from "@/service/apiRoutes";

import { TData } from "../type";

export const FilialColumns: ColumnDef<TData>[] = [
  {
    header: "Фото",
    cell: ({ row }) => {
      return (
        <Avatar className="w-[40px] h-[40px]">
          <AvatarImage src={minio_img_url + row.original?.user?.avatar?.path} />
          <AvatarFallback className="bg-primary text-white w-[40px] flex items-center justify-center h-[40px]">
            {row.original?.user?.firstName?.[0]}
            {row.original?.user?.lastName?.[0]}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    header: "Фамилия имя",
    cell: ({ row }) => {
      return (
        <p>
          {row.original?.user?.firstName} {row.original?.user?.lastName}
        </p>
      );
    },
  },

  {
    header: "Флиал",
    cell: ({ row }) => {
      return <p>{row.original?.user?.filial?.title}</p>;
    },
  },
  {
    header: "Должность",
    cell: ({ row }) => {
      return (
        <p className="border-border border px-4 py-2 rounded-[60px] inline-block">
          {row.original?.user?.position?.title}
        </p>
      );
    },
  },
  {
    header: "Приход",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          {/* <p className="text-[#E38157]">{row?.original?.user?.from} </p>
          <p>до</p> */}
          <p className="text-[#89A143]">
            {format(row?.original?.enter, "HH:mm")}
          </p>
        </div>
      );
    },
  },
  {
    header: "Уход",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          {/* <p className="text-[#E38157]">{row?.original?.user?.from} </p>
          <p>до</p> */}
          <p className="text-[#89A143]">
            {row?.original?.leave ? format(row?.original?.leave, "HH:mm") : "~"}
          </p>
        </div>
      );
    },
  },
  {
    header: "Часы на работе",
    cell: ({ row }) => {
      return <p>{row?.original?.totalTime} ч </p>;
    },
  },

  {
    header: "Зарплата",
    cell: ({ row }) => {
      const currency = Number(localStorage.getItem("currencyNow"));

      return (
        <p>
          {(
            (row?.original?.totalTime * row?.original?.user?.salary) /
            currency
          ).toFixed(2)}
          ${" "}
        </p>
      );
    },
  },

  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
    cell: ({ row }) => {
      return <TableAction url={apiRoutes.filial} id={row.original?.id} />;
    },
  },
];
