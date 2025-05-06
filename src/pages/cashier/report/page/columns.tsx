import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowDown,
  MessageSquareText,
  MoreHorizontal,
  ShoppingCart,
} from "lucide-react";
import formatPrice from "@/utils/formatPrice";
import { TransactionItem } from "../type";
import { Button } from "@/components/ui/button";
import { addHours,format } from "date-fns";

export const ReportColumns: ColumnDef<TransactionItem>[] = [
    {
      id: "icon",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div
            className={`w-12 h-12 flex items-center justify-center ${item.type === "Приход" ? "bg-[#89A143] text-white" : "bg-[#E38157] text-white"}`}
          >
            {item?.tip === "order" ? (
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
            {item?.type === "Приход" ? "+" : "-"}
            {formatPrice(item?.price || 0)}$
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
            {item.product || item?.comment}
          </p>
        );
      },
    },
    {
      id: "code",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <p className="text-[13px] text-muted-foreground">
            {item?.tip === "order" && item?.code}
          </p>
        );
      },
    },
    {
      id: "size",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <p className="text-[13px] text-muted-foreground">
            {row.original?.tip === "order" && item.size}
          </p>
        );
      },
    },
    {
      id: "price",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <p className="text-[13px] text-muted-foreground">
            {row.original?.tip === "order" && item?.price}
          </p>
        );
      },
    },
    {
      id: "quantity",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <p className="text-[13px] text-muted-foreground">
            {item?.tip === "order" && (item?.quantity || 0 + "x")}
          </p>
        );
      },
    },
    {
      id: "discount",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <p className="text-[13px] text-[#E38157]">
            {item?.tip === "order" && item?.discount}
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
            className={`${item?.type !== "Приход" ? "text-[#E38157] border-[#E38157] hover:text-[#E38157]" : "text-[#89A143] border-[#89A143] hover:text-[#89A143]"} rounded-[70px] p-[14px] h-10 `}
            variant={"outline"}
          >
            {item?.tip === "order" ? "Продажа" : item?.title}
          </Button>
        );
      },
    },
    {
      id: "time",
      cell: ({ row }) => {
        const item = row.original;
        const updatedDate = addHours(new Date(item?.date), 5); // 5 soat qo‘shish
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