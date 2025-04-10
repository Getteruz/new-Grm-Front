import { ColumnDef } from "@tanstack/react-table";

import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

import { ProductsData } from "../type";
import { Input } from "@/components/ui/input";

export const ProductColumns: ColumnDef<ProductsData>[] = [

  {
    header: "collection",
    cell: ({ row }) => {
      return <p>{row.original?.bar_code?.collection?.title}</p>;
    },
  },
  {
    header: "price",
    cell: ({ row }) => {
      return <p>{row.original?.price}$</p>;
    },
  },
  {
    header: "Обём",
    cell: ({ row }) => {
      return <p>{Number(row.original?.bar_code?.size?.x) * Number(row.original?.bar_code?.isMetric   ?  row.original?.check_count:row.original?.bar_code?.size?.y) }м²</p>;
    },
  },
  {
    header: "Акция",
    cell: () => {
      return <p className="p-2.5 text-primary font-medium text-[14px] border border-border rounded-[5px]">Акция</p>;
    },
  },
  {
    header: "Бонусы",
    cell: () => {
      return <p className="p-2.5 text-primary font-medium text-[14px] border border-border rounded-[5px]">Бонусы</p>;
    },
  },
  {
    header: "Промокоды",
    cell: () => {
      return  <p className="p-2.5 text-primary font-medium text-[14px] border border-border rounded-[5px]">Промокоды</p>;
    },
  },
  {
    header: "Скидка",
    cell: () => {
      return  <p className="p-2.5 text-primary font-medium text-[14px] border border-border rounded-[5px]">Скидка</p>;
    },
  },
  {
    header: "Зав-цена за м²",
    cell: ({ row }) => {
      return <Input  className="bg-transparent max-w-[90px] border-border border rounded-[5px]" defaultValue={row?.original?.comingPrice}  placeholder="$"/>;
    },
  },
  {
    header: "Цена за м²",
    cell: ({ row }) => {
      return <Input className="bg-transparent  max-w-[90px]  border-border border rounded-[5px]" defaultValue={row?.original?.priceMeter}  placeholder="$"/>;
    },
  },
  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
    cell: ({ row }) => {
      return (
        <TableAction
          url={apiRoutes.products}
          ShowUpdate={false}
          ShowDelete={false}
          ShowPreview
          id={row.original?.id}
        />
      );
    },
  },
];
