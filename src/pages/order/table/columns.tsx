import { ColumnDef } from "@tanstack/react-table";

import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

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
    id: "title",
    header: "Покупатель",
    accessorKey: "title",
    cell: () => {
      return <p>Аббос Жанизаков</p>;
    },
  },
 
  {
    id: "title",
    header: "Номер",
    accessorKey: "title",
    cell: () => {
      return <p>+94 609-34-44</p>;
    },
  },
  {
    id: "title",
    header: "Стоимость заказа",
    accessorKey: "title",
    cell: () => {
      return <p className="text-[#E38157]">7 690 000 сум</p>;
    },
  },
  {
    id: "title",
    header: "Тип оплаты",
    accessorKey: "title",
    cell: () => {
      return <p className="text-[#58A0C6]">Наличные</p>;
    },
  },
  {
    id: "title",
    header: "Статус оплаты",
    accessorKey: "title",
    cell: () => {
      return <p className="text-[#58A0C6]">Наличные</p>;
    },
  },
  {
    id: "title",
    header: "Оплачено",
    accessorKey: "title",
    cell: () => {
      return <p >0~ сум</p>;
    },
  },
  {
    id: "title",
    header: "Промокод",
    accessorKey: "title",
    cell: () => {
      return <p >нет</p>;
    },
  },
  {
    id: "title",
    header: "Скидка",
    accessorKey: "title",
    cell: () => {
      return <p className="text-[#F05B58]">-7 690 000 сум</p>;
    },
  },
  {
    id: "title",
    header: "Статус заказа",
    accessorKey: "title",
    cell: () => {
      return <ActionBadge status="inprogress"/>
    },
  },
  {
    id: "title",
    header: "Время",
    accessorKey: "title",
    cell: () =><p>21.12.2025 -10:47</p>
  },
   
  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
    cell: ({ row }) => {
      return (
        <TableAction
          url={apiRoutes.filial}
          ShowPreview
          id={row.original?.id}
        >
          {/* {row.original?.need_get_report ? (
            <>
              <DropdownMenuItem>Переучёт отправлен</DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                UpdatePatchData(
                  apiRoutes.filialMakeReport,
                  row.original?.id,
                  {}
                )
                  .then(() => toast.success("Переучёт отправлен"))
              }}
            >
              Запросить переучёт
            </DropdownMenuItem>
          )} */}
        </TableAction>
      );
    },
  },
];
