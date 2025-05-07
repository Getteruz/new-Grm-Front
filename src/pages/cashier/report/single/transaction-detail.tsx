import { ColumnDef } from "@tanstack/react-table";
import { addHours, format } from "date-fns";
import {
  ArrowDown,
  MessageSquareText,
  MoreHorizontal,
  ShoppingCart,
} from "lucide-react";
import { useState } from "react";

import CardSort from "@/components/card-sort";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import formatPrice from "@/utils/formatPrice";

import Filters from "../page/filter";
import Pricecheck from "../page/price-check";
import { useReport } from "../queries";

// Types for our data
interface TransactionItem {
  id: number;
  type: string;
  amount: number;
  tip: string;
  product: string;
  code?: string;
  size?: string;
  price?: number;
  order: {
    bar_code: { model: { title: string }; collection: { title: string } };
    x: number;
    price: number;
    discountPercentage: string;
  };
  comment: string;
  quantity?: number;
  discount?: string;
  description?: string;
  operation: string;
  time: string;
  title: string;
  date: string;
}

export default function TransactionDetail() {
  const [selectedItems] = useState<number[]>([]);

  const { data: reportData } = useReport();

  // Define columns for the DataTable
  const columns: ColumnDef<TransactionItem>[] = [
    {
      id: "icon",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div
            className={`w-12 h-12 flex items-center justify-center ${item.type === "Приход" ? "bg-[#89A143] text-white" : "bg-[#E38157] text-white"}`}
          >
            {item.tip === "order" ? (
              <ShoppingCart className="h-6 w-6" />
            ) : (
              <ArrowDown className="h-6 w-6" />
            )}
          </div>
        );
      },
    },
    {
      id: "amount",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <span
            className={`font-bold text-[16px] ${item.type === "Приход" ? "text-[#89A143]" : "text-[#E38157]"}`}
          >
            {item.type === "Приход" ? "+" : "-"}
            {formatPrice(item.price || 0)}$
          </span>
        );
      },
    },
    {
      id: "product",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <p className="text-[13px] text-muted-foreground flex gap-1">
            {item?.comment && <MessageSquareText width={14} />}
            {item?.order?.bar_code?.collection?.title || item?.comment}
          </p>
        );
      },
    },
    {
      accessorKey: "order.bar_code.model.title",
      id: "order.bar_code.model.title",
    },
    {
      id: "size",
      accessorKey: "order.bar_code.size.title",
    },

    {
      id: "order.x",
      accessorKey: "order.x",
      cell: ({ row }) => {
        const item = row.original;
        return <>{item?.order?.x}x</>;
      },
    },
    {
      id: "discount",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <p className="text-[13px] text-[#E38157]">
            {item?.order?.discountPercentage}%
          </p>
        );
      },
    },
    {
      id: "type",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <Button
            className={`${item.type !== "Приход" ? "text-[#E38157] border-[#E38157] hover:text-[#E38157]" : "text-[#89A143] border-[#89A143] hover:text-[#89A143]"} rounded-[70px] p-[14px] h-10 `}
            variant={"outline"}
          >
            {item.tip === "order" ? "Продажа" : item.title}
          </Button>
        );
      },
    },
    {
      id: "time",
      cell: ({ row }) => {
        const item = row.original;
        const updatedDate = addHours(new Date(item.date), 5); // 5 soat qo‘shish
        return <p className="text-[13px]">{format(updatedDate, "HH:mm")}</p>;
      },
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      ),
    },
  ];
  return (
    <>
      <Filters countLength={selectedItems?.length} />
      <div className="flex justify-between w-full bg-[#f8f6e9]">
        <div className="flex flex-col h-screen w-full">
          <CardSort />
          {/* Date heading */}
          <div className="px-10 pt-4 w-full bg-[#f8f6e9] sticky top-0">
            <p className="text-sm font-medium">
              {format(new Date(), "dd-MMMM")}
            </p>
          </div>

          {/* Transaction item list as DataTable */}
          <div className="flex-1 overflow-auto p-4">
            <DataTable
              columns={columns}
              data={reportData?.items || []}
              isLoading={false}
              className="border-none"
              hasHeader={false}
            />
          </div>
        </div>
        <Pricecheck />
      </div>
    </>
  );
}
