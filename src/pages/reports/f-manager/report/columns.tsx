import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Loader } from "lucide-react";

import { apiRoutes } from "@/service/apiRoutes";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PatchData } from "@/service/apiHelpers";
import { toast } from "sonner";
import { minio_img_url } from "@/constants";
import { TData } from "./type";
import ActionButton from "@/components/actionButton";
import ActionBadge from "@/components/actionBadge";
import TableAction from "@/components/table-action";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export const KassaColumns: ColumnDef<TData>[] = [
  {
    id: "startDate",
    header: "Дата",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <p className={`${item?.endDate ? "" : "text-[#89A143]"}`}>
          {item?.status == "Мои приходы и расходы"
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
            (item?.totalSum - item?.plasticSum).toFixed(2) + " $"}{" "}
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
      const item = row.original;
      return item?.status != "open" &&
        item?.status != "Мои приходы и расходы" ? (
        <div className="flex items-center">
          {item?.closer?.avatar && (
            <img
              className="w-[40px] rounded-full object-cover border-background border h-[40px]"
              src={minio_img_url + item?.closer?.avatar?.path}
            />
          )}
          {item?.status != "closed_by_c" && item?.closer_m?.avatar ? (
            <img
              className="w-[40px]  object-cover border-background border-[2px]  -translate-x-2 rounded-full h-[40px]"
              src={minio_img_url + item?.closer_m?.avatar?.path}
            />
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
          {item?.status != "Мои приходы и расходы" ? (
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
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const { mutate, isPending } = useMutation({
        mutationFn: () =>
          PatchData(apiRoutes.kassaCancel, {
            ids: [row.original?.id],
          }),
        onSuccess: () => {
          toast.success("canceled");
          queryClient.invalidateQueries({ queryKey: [apiRoutes.kassa] });
        },
      });
      
      return (
        <TableAction ShowDelete={false} ShowPreview={false} ShowUpdate={false}>
          {row.original?.status == "closed_by_c" || row.original?.status  == "accepted"  ? (
            <DropdownMenuItem
              onClick={() => mutate()}
              disabled={isPending}
              className="cursor-pointer hover:bg-accent px-2 py-1"
            >
              {isPending ? <Loader className="animate-spin" /> : ""} Отменить
            </DropdownMenuItem>
          ) : (
            ""
          )}
        </TableAction>
      );
    },
  },
];
