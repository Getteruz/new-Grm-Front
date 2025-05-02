import { useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, ArrowDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import formatPrice from "@/utils/formatPrice";
import CardSort from "@/components/card-sort";
import Filters from "../page/filter";
import Pricecheck from "../page/price-check";

// Types for our data
interface TransactionItem {
  id: number;
  type: "income" | "expense";
  amount: number;
  product: string;
  code?: string;
  size?: string;
  price?: string;
  quantity?: number;
  discount?: string;
  description?: string;
  operation: string;
  time: string;
}

// This would come from your API in production
const getTransactionDetail = (id: string) => {
  return {
    id,
    date: "10 Март 2025",
    totalAmount: 0,
    items: [
      {
        id: 1,
        type: "income",
        amount: 189.0,
        product: "Sanat Kalipso",
        code: "A1398L",
        size: "200x300",
        price: "35$",
        quantity: 1,
        discount: "10%",
        operation: "Продажа",
        time: "10:37",
      },
      {
        id: 2,
        type: "expense",
        amount: -189.0,
        product: "Магазин расход",
        description: "Arenda uchun fevral oyiga to'lov",
        operation: "Расход",
        time: "10:37",
      },
      {
        id: 3,
        type: "income",
        amount: 189.0,
        product: "Sanat Kalipso",
        code: "A1398L",
        size: "200x300",
        price: "35$",
        quantity: 1,
        operation: "Продажа",
        time: "10:37",
      },
      {
        id: 4,
        type: "income",
        amount: 200.0,
        product: "Sanat Kalipso",
        code: "A1398L",
        size: "200x300",
        price: "35$",
        quantity: 1,
        discount: "10%",
        operation: "Приход",
        time: "10:37",
      },
      {
        id: 5,
        type: "income",
        amount: 189.0,
        product: "Sanat Kalipso",
        code: "A1398L",
        size: "200x300",
        price: "35$",
        quantity: 1,
        discount: "10%",
        operation: "Продажа",
        time: "10:37",
      },
      {
        id: 6,
        type: "expense",
        amount: -189.0,
        product: "Sanat Kalipso",
        code: "A1398L",
        size: "200x300",
        price: "35$",
        quantity: 1,
        operation: "Продажа",
        time: "10:37",
      },
      {
        id: 7,
        type: "income",
        amount: 189.0,
        product: "Sanat Kalipso",
        code: "A1398L",
        size: "200x300",
        price: "35$",
        quantity: 1,
        operation: "Продажа",
        time: "10:37",
      },
    ],
  };
};

export default function TransactionDetail() {
  const { id } = useParams<{ id: string }>();
  const [selectedItems, _setSelectedItems] = useState<number[]>([]);

  const transaction = getTransactionDetail(id || "1");

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
          <p className="text-[13px] text-muted-foreground">{item.product}</p>
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
      <Filters countLength={selectedItems.length} />
      <div className="flex justify-between w-full bg-[#f8f6e9]">
        <div className="flex flex-col h-screen w-full">
          <CardSort />
          {/* Date heading */}
          <div className="px-10 pt-4 w-full bg-[#f8f6e9] sticky top-0">
            <p className="text-sm font-medium">12-Mart</p>
          </div>

          {/* Transaction item list as DataTable */}
          <div className="flex-1 overflow-auto p-4">
            <DataTable
              columns={columns}
              data={transaction?.items as any}
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
