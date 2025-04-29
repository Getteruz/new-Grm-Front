import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

import TableAction from "@/components/table-action";
import { Input } from "@/components/ui/input";
import { apiRoutes } from "@/service/apiRoutes";
import api from "@/service/fetchInstance";
import debounce from "@/utils/debounce";

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
        <p className="p-2.5 text-primary font-medium text-[14px]">120 шт</p>
      );
    },
  },
  {
    header: "Акция",
    cell: () => {
      return (
        <p className="p-2.5 text-primary font-medium text-[14px]">1+0.7</p>
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
        <p className="p-2.5 text-primary font-medium text-[14px]">i9823hf</p>
      );
    },
  },
  {
    header: "Скидка",
    cell: () => {
      return (
        <p className="p-2.5 text-[#E38157] font-medium text-[14px]">-10%</p>
      );
    },
  },
  {
    header: "Кас-цена",
    cell: () => {
      return <p className="p-2.5 text-primary font-medium text-[14px]">35$</p>;
    },
  },
  {
    header: "Цена за м²",
    cell: ({ row }) => {
      return <>{row?.original?.collection_prices?.[0]?.priceMeter}$</>;
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
      const changePrices = (val: number, id: string) => {
        const body = [
          {
            comingPrice: val,
            collectionId: id,
          },
        ];
        toast.warning("Действие отправлено");
        api
          .post(apiRoutes.collectionMultiple, body)
          .then(() => toast.success("Действие завершено."))
          .catch(() => toast.error("Действие не удалось"));
      };

      return (
        <Input
          className="bg-transparent max-w-[90px] border-border border rounded-[5px]"
          defaultValue={row?.original?.collection_prices?.[0]?.comingPrice}
          placeholder="$"
          type="number"
          onChange={debounce((e) => {
            const val = Number(e.target.value); // konvert qilish muhim
            changePrices(val, row.original.id);
          }, 800)}
        />
      );
    },
  },
  {
    header: "Цена за м²",
    cell: ({ row }) => {
      const changePrices = (val: { val: number }, id: string) => {
        const body = [
          {
            priceMeter: val,
            collectionId: id,
          },
        ];
        toast.warning("Действие отправлено");
        api
          .post(apiRoutes.collectionMultiple, body)
          .then(() => toast.success("Действие завершено."))
          .catch(() => toast.error("Действие не удалось"));
      };
      return (
        <Input
          className="bg-transparent  max-w-[90px]  border-border border rounded-[5px]"
          defaultValue={row?.original?.collection_prices?.[0]?.priceMeter}
          placeholder="$"
          type="number"
          onChange={debounce((e) => {
            changePrices(e.target.value, row.original.id);
          }, 800)}
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
export const AColumns: ColumnDef<ProductsData>[] = [
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
      return <p className="">~</p>;
    },
  },
  {
    header: "Бонусы",
    cell: () => {
      return <p className="">~</p>;
    },
  },
  {
    header: "Промокоды",
    cell: () => {
      return <p className="">~</p>;
    },
  },
  {
    header: "Скидка",
    cell: () => {
      return <p className="">~</p>;
    },
  },
  {
    header: "Зав-цена за м² ($)",
    cell: ({ row }) => {
      return <>{row?.original?.collection_prices?.[0]?.comingPrice}</>;
    },
  },
  {
    header: "Цена за м² ($)",
    cell: ({ row }) => {
      return <>{row?.original?.collection_prices?.[0]?.priceMeter}</>;
    },
  },
  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
  },
];
