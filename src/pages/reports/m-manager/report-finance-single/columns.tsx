import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { Loader } from "lucide-react";
import { TKassareportData } from "./type";
import TableAction from "@/components/table-action";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "@/service/apiRoutes";
import {  UpdatePatchData } from "@/service/apiHelpers";
import { toast } from "sonner";
import TebleAvatar from "@/components/teble-avatar";

export const KassaColumnsLoc: ColumnDef<TKassareportData>[] = [
  {
    id: "startDate",
    header: "Филиалы",
    cell: ({ row }) => {
      const isMy = row?.original?.status == "my";
     return <p className={isMy ? "text-[#89A143]":""}>{ isMy ?"Мои приходы и расходы":  row?.original?.filial?.title}</p>
    },
  },
  {
    header: "Наличие",
    id: "totalSum",
    cell: ({ row }) => {
      const item = row.original;
      const isMy = row?.original?.status == "my";
      return <p className="text-[#89A143]">   {  isMy ?"": (item?.totalSum || 0) - (item?.totalPlasticSum||0)} { item?.totalSum?"$":""}</p>;
    },
  },

  {
    header: "Терминал",
    id: "totalSum",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="text-[#58A0C6]"> {item?.totalPlasticSum} {item?.totalPlasticSum?"$":""}</p>;
    },
  },

  {
    header: "Скидка",
    id: "discount",
    cell: ({ row }) => {
      const item = row.original;
      return <p className={ item?.totalDiscount !=  0? 'text-[#E38157]' :""}> {item?.totalDiscount} {item?.totalDiscount?"$":""}</p>;
    },
  },

  {
    header: "Навар",
    id: "additionalProfitTotalSum",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.additionalProfitTotalSum} {item?.additionalProfitTotalSum?"$":""}</p>;
    },
  },

  {
    header: "Объём",
    id: "totalSize",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.totalSize}  {item?.totalSize?"м²":""} </p>;
    },
  },
  {
    header: "Приход",
    id: "income",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.totalIncome} {item?.totalIncome?"$":""}</p>;
    },
  },
  {
    header: "Расход",
    id: "expense",
    cell: ({ row }) => {
      const item = row.original;
      return <p className="text-[#E38157]"> {item?.totalExpense} {item?.totalExpense?"$":""}</p>;
    },
  },
  {
    header: "Инкассация",
    id: "cash_collection",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.totalCashCollection} {item?.totalCashCollection?"$":""}</p>;
    },
  },
  {
    header: "Принял",
    id: "closer",
    cell: () => {
      return (
        <div className="flex gap-2 items-center">
          <TebleAvatar url={''} name='A'/>
          <TebleAvatar url={''} name='A'/>
            
        </div>
      ) 
    },
  },
  {
    header: "Статус",
    id: "status",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div onClick={(e) => e.stopPropagation()}>
          {
            item?.kassaReportStatus ==1 &&  <Button variant={"outline"}   className="rounded-[63px] text-primary"> {item?.status}</Button>
          }
          {
            item?.kassaReportStatus ==2 &&  <Button  variant={"outline"} className="rounded-[63px] text-[#89A143] border-none"> Продалажется</Button>
          }
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "actions",
    cell: ({row}) =>{
      const queryClient = useQueryClient();
      const { mutate,isPending } = useMutation({
        mutationFn: async () => {
            return await UpdatePatchData(apiRoutes.kassaReports+'/reject', row?.original?.id,{});
        },
        onSuccess: () => {
          toast.success("Status changed successfully");
          queryClient.invalidateQueries({ queryKey: [apiRoutes.reports] });
        },
      });
      return(
          <Button onClick={(e) => e.stopPropagation()} variant="ghost" size="icon">
            <TableAction  ShowDelete={false} ShowPreview={false} ShowUpdate={false}>
              <DropdownMenuItem disabled={isPending} onClick={()=>mutate()} >
                  {isPending ? <Loader/>:""} Отменить
                </DropdownMenuItem>
            </TableAction>
          </Button>
      )
    },
  },
];
