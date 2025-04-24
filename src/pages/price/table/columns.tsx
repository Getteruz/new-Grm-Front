import { ColumnDef } from "@tanstack/react-table";

import TableAction from "@/components/table-action";
import { Input } from "@/components/ui/input";

import { ProductsData } from "../type";

export const IManagerColumns: ColumnDef<ProductsData>[] = [
  {
    header: "collection",
    cell: ({ row }) => {
      return <p>{row.original?.title}</p>;
    },
  },

  {
    header: "Обём",
    cell: ({ row }) => {
      return (
        <p>
          {Number(row.original?.bar_code?.size?.x) *
            Number(
              row.original?.bar_code?.isMetric
                ? row.original?.check_count
                : row.original?.bar_code?.size?.y
            )}
          м²
        </p>
      );
    },
  },
  {
    header: "Количество",
    cell: () => {
      return (
        <p className="p-2.5 text-primary font-medium text-[14px]">
          120 шт
        </p>
      );
    },
  },
  {
    header: "Акция",
    cell: () => {
      return (
        <p className="p-2.5 text-primary font-medium text-[14px]">
          1+0.7
        </p>
      );
    },
  },
  {
    header: "Бонусы",
    cell: () => {
      return (
        <p className="p-2.5 text-primary font-medium text-[14px]">
          100 м² (1 млн)
        </p>
      );
    },
  },
  {
    header: "Промокоды",
    cell: () => {
      return (
        <p className="p-2.5 text-primary font-medium text-[14px]">
          i9823hf
        </p>
      );
    },
  },
  {
    header: "Скидка",
    cell: () => {
      return (
        <p className="p-2.5 text-[#E38157] font-medium text-[14px]">
          -10%
        </p>
      );
    },
  },
  {
    header: "Кас-цена",
    cell: () => {
      return (
        <p className="p-2.5 text-primary font-medium text-[14px]">
          35$
        </p>
      );
    },
  },
  {
    header: "Цена за м²",
    cell: ({ row }) => {
      return (
        <Input
          className="bg-transparent  max-w-[90px]  border-border border rounded-[5px]"
          defaultValue={row?.original?.priceMeter}
          placeholder="$"
          type="number"
          // onChange={() => toast.success("e.target.value")}
        />
      );
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
            url={""}
            ShowUpdate={false}
            ShowDelete={false}
            ShowPreview
            id={row.original?.id}
          />
        );
      },
    },
];

export const Columns: ColumnDef<ProductsData>[] = [
  {
    header: "Коллекция",
    cell: ({ row }) => {
      return <p>{row.original?.title}</p>;
    },
  },

  {
    header: "Обём",
    cell: ({ row }) => {
      return (
        <p>
          {Number(row.original?.bar_code?.size?.x) *
            Number(
              row.original?.bar_code?.isMetric
                ? row.original?.check_count
                : row.original?.bar_code?.size?.y
            )}
          м²
        </p>
      );
    },
  },
  {
    header: "Акция",
    cell: () => {
      return (
        <p className="p-2.5 text-primary font-medium text-[14px] border border-border rounded-[5px]">
          Акция
        </p>
      );
    },
  },
  {
    header: "Бонусы",
    cell: () => {
      return (
        <p className="p-2.5 text-primary font-medium text-[14px] border border-border rounded-[5px]">
          Бонусы
        </p>
      );
    },
  },
  {
    header: "Промокоды",
    cell: () => {
      return (
        <p className="p-2.5 text-primary font-medium text-[14px] border border-border rounded-[5px]">
          Промокоды
        </p>
      );
    },
  },
  {
    header: "Скидка",
    cell: () => {
      return (
        <p className="p-2.5 text-primary font-medium text-[14px] border border-border rounded-[5px]">
          Скидка
        </p>
      );
    },
  },
  {
    header: "Зав-цена за м²",
    cell: ({ row }) => {
      return (
        <Input
          className="bg-transparent max-w-[90px] border-border border rounded-[5px]"
          defaultValue={row?.original?.comingPrice}
          placeholder="$"
          type="number"
          // onChange={(e) => setComingPrice(e.target.value)}
        />
      );
    },
  },
  {
    header: "Цена за м²",
    cell: ({ row }) => {
      // const [priceMeter, setPriceMeter] = useQueryState(
      //   "priceMeter",
      //   parseAsInteger
      // );
      return (
        <Input
          className="bg-transparent  max-w-[90px]  border-border border rounded-[5px]"
          defaultValue={row?.original?.priceMeter}
          placeholder="$"
          type="number"
          // onChange={(e) => setPriceMeter(e.target.value)}
        />
      );
    },
  },
  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
  },
];