import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { TKassareportData } from "./type";
import ActionBadge from "@/components/actionBadge";
import ActionButton from "@/components/actionButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "@/service/apiRoutes";
import { PatchData } from "@/service/apiHelpers";
import { toast } from "sonner";
import TebleAvatar from "@/components/teble-avatar";
import { useMeStore } from "@/store/me-store";

export const KassaColumnsLoc: ColumnDef<TKassareportData>[] = [
  {
    id: "Филиал",
    header: "Дата",
    cell: ({ row }) => {
      return (
        <p >
          {row?.original?.filial?.title}
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
          {item?.totalSum &&
            item?.totalPlasticSum &&
            (item?.totalSum - item?.totalPlasticSum).toFixed(2) + " $"}{" "}
          $
        </p>
      );
    },
  },

  {
    header: "Терминал",
    id: "totalSum",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="text-[#58A0C6]"> {item?.totalPlasticSum} $</p>;
    },
  },
  {
    header: "Задолжность",
    id: "totalSum",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="text-[#FF6600]"> {item?.totalExpense} $</p>;
    },
  },

  {
    header: "D-менеджер",
    cell: () => {
      const  {meUser}= useMeStore()
      return (
        <div className="flex gap-2 items-center">
          <TebleAvatar url={meUser?.avatar?.path} name={meUser?.firstName || "A"}/>
        </div>
      ) 
    },
  },
  {
    header: "Статус",
    id: "status",
    cell: ({ row }) => {
      const item = row.original;
      const queryClient = useQueryClient();
      const { mutate, isPending } = useMutation({
        mutationFn: () =>
          PatchData(apiRoutes.kassaReports +"/" +row?.original?.id+"/close-dmanage" , { }),
        onSuccess: () => {
          toast.success("Accepted");
          queryClient.invalidateQueries({ queryKey: [apiRoutes.kassaReports] });
        },
      });
      
      return (
        <div onClick={(e) => e.stopPropagation()}>
          {item?.kassaReportStatus == 2 ? (
            <ActionBadge status={"willSell"} />
          ) : item?.status == "open" ? (
            <ActionButton onClick={()=>mutate()} isLoading={isPending}  status="accept"></ActionButton>
          ) : (
            <ActionBadge status={item?.status} />
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
