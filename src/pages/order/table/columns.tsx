import { ColumnDef } from "@tanstack/react-table";


import { TData } from "../type";
import ActionBadge from "@/components/actionBadge";

export const FilialColumns: ColumnDef<TData>[] = [
  {
    header: "№",
    cell: ({ row }) => {
      return <p>{row?.index + 1}</p>;
    },
  },
  {
    id: "buyer",
    header: "Покупатель",
    accessorKey: "user.firstName",
    cell: ({ row }) => {
      return <p>{row.original.user?.firstName} {row.original.user?.lastName}</p>;
    },
  },

  {
    id: "phone",
    header: "Номер",
    accessorKey: "user.phone",
    cell: ({ row }) => {
      return <p>{row.original.user?.phone}</p>;
    },
  },
  {
    id: "totalPrice",
    header: "Стоимость заказа",
    accessorKey: "totalPrice",
    cell: ({ row }) => {
      return <p className="text-[#E38157]">{row.original.totalPrice?.toLocaleString()} сум</p>;
    },
  },
  {
    id: "payment_type",
    header: "Тип оплаты",
    accessorKey: "payment_type",
    cell: ({ row }) => {
      return <p className="text-[#58A0C6]">{row.original.payment_type}</p>;
    },
  },
  {
    id: "payment_status",
    header: "Статус оплаты",
    accessorKey: "payment_status",
    cell: ({ row }) => {
      return <p className="text-[#58A0C6]">{row.original.payment_status}</p>;
    },
  },
  {
    id: "pre_payment",
    header: "Оплачено",
    accessorKey: "pre_payment",
    cell: ({ row }) => {
      return <p >{row.original.pre_payment} сум</p>;
    },
  },
  {
    id: "promo",
    header: "Промокод",
    cell: () => {
      return <p >нет</p>;
    },
  },
  {
    id: "discount",
    header: "Скидка",
    cell: () => {
      return <p className="text-[#F05B58]">0 сум</p>;
    },
  },
  {
    id: "order_status",
    header: "Статус заказа",
    accessorKey: "order_status",
    cell: ({ row }) => {
      return <ActionBadge status={row.original.order_status} />
    },
  },
  {
    id: "date",
    header: "Время",
    accessorKey: "date",
    cell: ({ row }) => <p>{row.original.date}</p>
  },

  // {
  //   id: "actions",
  //   enableHiding: true,
  //   header: () => <div className="text-right">{"actions"}</div>,
  //   size: 50,
  //   cell: ({ row }) => {
  //     return (
  //       <TableAction
  //         url={apiRoutes.filial}
  //         ShowPreview
  //         id={row.original?.id}
  //       >
  //       </TableAction>
  //     );
  //   },
  // },
];
