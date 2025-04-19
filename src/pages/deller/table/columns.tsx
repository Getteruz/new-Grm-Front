import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

export const Columns = [
  {
    header: "№",
    cell: ({ row, i, k }) => {
      return <p>{row?.index + 1}</p>;
    },
  },
  {
    header: "Название",
    cell: ({ row }) => {
      return <p>{row?.original?.name}</p>;
    },
  },
  {
    header: "Адресс",
    cell: ({ row }) => {
      return <p>{row?.original?.address}</p>;
    },
  },

  {
    header: "Телефон",
    cell: ({ row }) => {
      return <p>{row?.original?.phone1}</p>;
    },
  },
  {
    header: "Задолжность",
    cell: ({ row }) => {
      return <p>?</p>;
    },
  },
  {
    header: "Дано",
    cell: ({ row }) => {
      return <p>?</p>;
    },
  },
  {
    header: "Статус",
    cell: ({ row }) => {
      return <p>{row?.original?.isActive ? "Активный" : "Не активен"}</p>;
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
