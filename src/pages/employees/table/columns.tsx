import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

import { TData } from "../type";
import { useMeStore } from "@/store/me-store";

export const FilialColumns: ColumnDef<TData>[] = [
  {
    header: "Фамилия имя",
    cell: ({ row }) => {
      return (
        <p>
          {row.original?.firstName} {row.original?.lastName}
        </p>
      );
    },
  },

  {
    header: "Флиал",
    cell: ({ row }) => {
      return <p>{row.original?.filial?.title}</p>;
    },
  },
  {
    header: "Должность",
    cell: ({ row }) => {
      return (
        <p className="border-border border px-4 py-2 rounded-[60px] inline-block">
          {row.original?.position?.title}
        </p>
      );
    },
  },
  {
    header: "Рабочая время",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-1">
          <p className="text-[#E38157]">{row?.original?.from} </p>
          <p>до</p>
          <p className="text-[#89A143]">{row?.original?.to} </p>
        </div>
      );
    },
  },
  {
    header: "Дата риёма",
    cell: ({ row }) => {
      return format(row.original?.hired, "dd.MM.yyyy");
    },
  },
  {
    header: "Зарплата",
    cell: ({ row }) => {
      return (
        <p>{Number(row?.original?.salary).toLocaleString("uz-UZ")} сум </p>
      );
    },
  },
  {
    header: "id для входа",
    accessorKey: "login",
  },
  {
    header: "Телефон",
    accessorKey: "phone",
  },
  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
    cell: ({ row }) => {
      const { meUser } = useMeStore();
      return  meUser?.position.role == 11 && <TableAction url={apiRoutes.user} id={row.original?.id} />;
    },
  },
];
