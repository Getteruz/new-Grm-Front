import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, MoreHorizontal, ShoppingCart } from "lucide-react";
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
  type: "income" | "expense";
  amount: number;
  product: string;
  code?: string;
  size?: string;
  price?: string;
  comment: string;
  quantity?: number;
  discount?: string;
  description?: string;
  operation: string;
  time: string;
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
            className={`w-12 h-12 flex items-center justify-center ${item.type === "income" ? "bg-[#89A143] text-white" : "bg-[#E38157] text-white"}`}
          >
            {item.type === "income" ? (
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
            className={`font-bold text-[16px] ${item.type === "income" ? "text-[#89A143]" : "text-[#E38157]"}`}
          >
            {item.type === "income" ? "+" : ""}
            {formatPrice(item.amount)}$
          </span>
        );
      },
    },
    {
      id: "product",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <p className="text-[13px] text-muted-foreground">
            {item.product || item?.comment}
          </p>
        );
      },
    },
    {
      id: "code",
      cell: ({ row }) => {
        const item = row.original;
        return <p className="text-[13px] text-muted-foreground">{item.code}</p>;
      },
    },
    {
      id: "size",
      cell: ({ row }) => {
        const item = row.original;
        return <p className="text-[13px] text-muted-foreground">{item.size}</p>;
      },
    },
    {
      id: "price",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <p className="text-[13px] text-muted-foreground">{item.price}</p>
        );
      },
    },
    {
      id: "quantity",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <p className="text-[13px] text-muted-foreground">{item.quantity}x</p>
        );
      },
    },
    {
      id: "discount",
      cell: ({ row }) => {
        const item = row.original;
        return <p className="text-[13px] text-[#E38157]">{item.discount}</p>;
      },
    },
    {
      id: "type",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <Button
            className={`${item.type !== "income" ? "text-[#E38157] border-[#E38157] hover:text-[#E38157]" : "text-[#89A143] border-[#89A143] hover:text-[#89A143]"} rounded-[70px] p-[14px] h-10 `}
            variant={"outline"}
          >
            {item.type !== "income" ? "Расход" : "Продажа"}
          </Button>
        );
      },
    },
    {
      id: "time",
      cell: ({ row }) => {
        const item = row.original;
        return <p className="text-[13px]">{item.time}</p>;
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
            <p className="text-sm font-medium">04-May</p>
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
