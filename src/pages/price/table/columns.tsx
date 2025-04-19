import { ColumnDef } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import { ProductsData } from "../type";

export const Columns: ColumnDef<ProductsData>[] = [
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
