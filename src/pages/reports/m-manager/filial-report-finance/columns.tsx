import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {  MoreHorizontal } from "lucide-react";

import { apiRoutes } from "@/service/apiRoutes";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PatchData } from "@/service/apiHelpers";
import { toast } from "sonner";
import { TData } from "./type";
import ActionButton from "@/components/actionButton";
import ActionBadge from "@/components/actionBadge";
import TebleAvatar from "@/components/teble-avatar";

export const KassaColumns: ColumnDef<TData>[] = [
  {
    id: "startDate",
    header: "Дата",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <p className={`${item?.endDate ? "" : "text-[#89A143]"}`}>
          {" "}
          {item?.status == "Филиал приходы и расходы"
            ? item?.status
            : item?.endDate
              ? format(new Date(item?.endDate), "dd MMMM yyyy")
              : "Продалажется"}
        </p>
      );
    },
  },
  {
    header: "Наличие",
    id: "totalSum",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <p className="text-[#89A143]">
          {" "}
          {item?.totalSum &&
            (item?.totalSum - (item?.plasticSum || 0)).toFixed(2) + " $"}{" "}
        </p>
      );
    },
  },

  {
    header: "Терминал",
    id: "plasticSum",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.plasticSum && item?.plasticSum + " $"} </p>;
    },
  },

  {
    header: "Скидка",
    id: "discount",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.discount && item?.discount + "$"} </p>;
    },
  },

  {
    header: "Навар",
    id: "additionalProfitTotalSum",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <p>
          {" "}
          {item?.additionalProfitTotalSum &&
            item?.additionalProfitTotalSum + " $"}{" "}
        </p>
      );
    },
  },

  {
    header: "Объём",
    id: "totalSize",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.totalSize && item?.totalSize + " м²"} </p>;
    },
  },
  {
    header: "Приход",
    id: "income",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.income} $</p>;
    },
  },
  {
    header: "Расход",
    id: "expense",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.expense} $</p>;
    },
  },
  {
    header: "Инкассация",
    id: "cash_collection",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.cash_collection && item?.cash_collection + " $"} </p>;
    },
  },
  {
    header: "Кассир",
    id: "closer",
    cell: ({ row }) => {
         
      const statusObj: Record<string, "success" | "panding" | "fail"> = {
        accepted:"success",
        closed_by_c:"panding",
        rejected:"fail"
      }
      const item = row.original;
      return item?.status != "open" &&
        item?.status != "Мои приходы и расходы" ? (
          <div className="flex items-center">
          {item?.closer?.avatar && (
            <TebleAvatar status={"success"}  url={item?.closer?.avatar?.path} name={item?.closer?.avatar?.name}/>
          )}
          {item?.status != "closed_by_c" && item?.closer_m?.avatar ? (
            <TebleAvatar className="-translate-x-2" status={ statusObj?.[item?.status || "panding"] }  url={item?.closer_m?.avatar?.path} name={item?.closer_m?.avatar?.name}/>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      );
    },
  },
  {
    header: "Статус",
    id: "status",
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const item = row.original;
      const { mutate, isPending } = useMutation({
        mutationFn: () =>
          PatchData(apiRoutes.kassaClose, {
            ids: [row.original?.id],
          }),
        onSuccess: () => {
          toast.success("close");
          queryClient.invalidateQueries({ queryKey: [apiRoutes.kassa] });
        },
      });
      const statusOject = {
        open: "inProgress",
      };
      return (
        <div onClick={(e) => e.stopPropagation()}>
          {item?.status != "Филиал приходы и расходы" ? (
            item?.status == "closed_by_c" ? (
              <ActionButton
                onClick={() => mutate()}
                isLoading={isPending}
                status="accept"
              />
            ) : (
              <ActionBadge
                status={
                  statusOject?.[item?.status as keyof typeof statusOject] ||
                  item?.status ||
                  "inProgress"
                }
              />
            )
          ) : (
            ""
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "actions",
    cell: () => (
      <Button onClick={(e) => e.stopPropagation()} variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];
