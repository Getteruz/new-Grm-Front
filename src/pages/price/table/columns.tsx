import { ColumnDef } from "@tanstack/react-table";
import { useQueryState } from "nuqs";

import TableAction from "@/components/table-action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { apiRoutes } from "@/service/apiRoutes";
import api from "@/service/fetchInstance";
import debounce from "@/utils/debounce";

import { ProductsData } from "../type";
import { ChevronDown } from "lucide-react";

export const IManagerColumns: ColumnDef<ProductsData>[] = [
  {
    header: "Заголовок",
   accessorKey:"title"
  },
  {
    header: "Объём",
    cell: ({row}) => {
      return (
        <p className="p-2.5 text-primary font-medium text-[14px]">{row.original?.totalKv} м²</p>
      );
    },
  },
 
  {
    header: "Цена",
    cell: ({row}) => {
      return (
        <p className="p-2.5 text-primary font-medium text-[14px]">
          {row.original?.collection_prices?.[0]?.priceMeter} $
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
      return (
        <TableAction
          url={""}
          ShowUpdate={false}
          ShowDelete={false}
          ShowPreview={false}
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
          {row.original?.totalKv}
          м²
        </p>
      );
    },
  },
  {
    header: "Акция",
    cell: () => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p className="p-2.5 flex justify-between items-center text-primary font-medium text-[14px] border border-border rounded-[5px]">
                Акция <ChevronDown width={20} />
              </p>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>1 шт 400x300+1 Afra</DropdownMenuItem>
              <DropdownMenuItem>1+Joy namoz</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
        // <p className="p-2.5 text-primary font-medium text-[14px] border border-border rounded-[5px]">
        //   Акция
        // </p>
      );
    },
  },
  {
    header: "Бонусы",
    cell: () => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p className="p-2.5 flex justify-between items-center text-primary font-medium text-[14px] border border-border rounded-[5px]">
                Бонусы <ChevronDown width={20} />
              </p>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>12 шт</DropdownMenuItem>
              <DropdownMenuItem>20 шт</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
        // <p className="p-2.5 text-primary font-medium text-[14px] border border-border rounded-[5px]">
        //   Бонусы
        // </p>
      );
    },
  },
  {
    header: "Промокоды",
    cell: () => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p className="p-2.5 flex justify-between items-center text-primary font-medium text-[14px] border border-border rounded-[5px]">
                Промокоды <ChevronDown width={20} />
              </p>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem>i98349d4</DropdownMenuItem>
              <DropdownMenuItem>i98349d4</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
        // <p className="p-2.5 text-primary font-medium text-[14px] border border-border rounded-[5px]">
        //   Промокоды
        // </p>
      );
    },
  },
  {
    header: "Скидка",
    cell: () => {
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <p className="p-2.5 flex justify-between items-center text-primary font-medium text-[14px] border border-border rounded-[5px]">
                Скидка <ChevronDown width={20} />
              </p>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="center">
              <DropdownMenuItem className="text-[#E38157]">
                -5%
              </DropdownMenuItem>
              <DropdownMenuItem className="text-[#E38157]">
                -10%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
        // <p className="p-2.5 text-primary font-medium text-[14px] border border-border rounded-[5px]">
        //   Скидка
        // </p>
      );
    },
  },
  {
    header: "Зав-цена за м²",
    cell: ({ row }) => {
      const [edit] = useQueryState("edit");
      const changePrices = (val: number, id: string) => {
        const body = [
          {
            comingPrice: val,
            collectionId: id,
          },
        ];
        api.post(apiRoutes.collectionMultiple, body);
      };

      return (
        <div className="relative max-w-[90px]">
          <Input
            readOnly={!(edit === "edit")}
            className={`${edit !== "edit" ? "bg-[#DEDED0]" : "bg-transparent"}   border-border border rounded-[5px] `}
            defaultValue={row?.original?.collection_prices?.[0]?.comingPrice}
            placeholder="0"
            type="number"
            onChange={debounce((e) => {
              const val = Number(e.target.value); // konvert qilish muhim
              changePrices(val, row.original.id);
            }, 800)}
          />
          <p className="absolute right-2 top-3 ">$</p>
        </div>
      );
    },
  },
  {
    header: "Цена за м²",
    cell: ({ row }) => {
      const [edit] = useQueryState("edit");

      const changePrices = (val: { val: number }, id: string) => {
        const body = [
          {
            priceMeter: Number(val),
            collectionId: id,
          },
        ];
        api.post(apiRoutes.collectionMultiple, body);
      };
      return (
        <div className="relative max-w-[90px]">
          <Input
            readOnly={!(edit === "edit")}
            className={`${edit !== "edit" ? "bg-[#DEDED0]" : "bg-transparent"}   border-border border rounded-[5px] `}
            defaultValue={row?.original?.collection_prices?.[0]?.priceMeter}
            placeholder="0"
            type="number"
            onChange={debounce((e) => {
              changePrices(e.target.value, row.original.id);
            }, 800)}
          />
          <p className="absolute right-2 top-3 ">$</p>
        </div>
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
          {row.original?.totalKv}
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
  // {
  //   header: "Зав-цена за м² ($)",
  //   cell: ({ row }) => {
  //     return <>{row?.original?.collection_prices?.[0]?.comingPrice}</>;
  //   },
  // },
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
