import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  Loader2,
  MoreHorizontal,
} from "lucide-react";


import { apiRoutes } from "@/service/apiRoutes";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PatchData } from "@/service/apiHelpers";
import { toast } from "sonner";
import { minio_img_url } from "@/constants";
import { TData } from "./type";



export const KassaColumns: ColumnDef<TData>[] = [
  {
    id: "startDate",
    header: "Дата",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <p className={`${item?.endDate ? "" : "text-[#89A143]"}`}>
          {item?.status== "Мои приходы и расходы" ? item?.status: item?.endDate
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
      return <p className="text-[#89A143]"> { item?.totalSum  && (item?.totalSum  - item?.plasticSum).toFixed(2) + ' $'} </p>;
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
      return <p>  {item?.additionalProfitTotalSum && item?.additionalProfitTotalSum +" $"} </p>;
    },
  },

  {
    header: "Объём",
    id: "totalSize",
    cell: ({ row }) => {
      const item = row.original;
      return <p> {item?.totalSize &&  item?.totalSize + " м²"} </p>;
    },
  },
  {
    header: "Приход",
    id: "income",
    cell: ({ row }) => {
      const item = row.original;
      return <p> { item?.income} $</p>;
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
      return item?.status != "open" && item?.status != "Мои приходы и расходы" ?  <div className="flex items-center">
       {item?.closer?.avatar && <img  className="w-[40px] rounded-full object-cover border-background border h-[40px]" src={minio_img_url + item?.closer?.avatar?.path}/>}
        {item?.status != "closed_by_c" && item?.closer_m?.avatar ?  <img className="w-[40px]  object-cover border-background border-[2px]  -translate-x-2 rounded-full h-[40px]" src={minio_img_url + item?.closer_m?.avatar?.path}/>:""}
      </div>:"";
    },
  },
  {
    header: "Статус",
    id: "status",
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const item = row.original;
      const { mutate, isPending } = useMutation({
        mutationFn: () => PatchData(apiRoutes.kassaClose, {
          ids:[row.original?.id]
        }),
        onSuccess: () => {
          toast.success("close");
          queryClient.invalidateQueries({ queryKey: [apiRoutes.kassa] });
        },
      
      });
      return (
        <div onClick={(e) => e.stopPropagation()}>
          {item?.status == "closed_by_c" ? (
            <Button disabled={isPending}  onClick={()=>mutate()} className="rounded-[63px] bg-[#E38157]">{isPending? <Loader2/> :""}  Принят </Button>
          ) : item?.status == "accepted" ? (
            <Button disabled variant={"outline"} className="rounded-[63px] "> Принято </Button>
          ) : item?.status == "rejected"? (
            <Button disabled variant={"outline"} className="rounded-[63px] text-[#E38157] border-[#E38157]"> Отменено </Button>
          ):   item?.status != "Мои приходы и расходы"  ?<Button variant={"outline"} className="rounded-[63px] text-[#89A143] border-[#89A143]"> В процессе </Button>:""}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "actions",
    cell: () => (
      <Button onClick={(e)=>e.stopPropagation()} variant="ghost" size="icon">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    ),
  },
];
