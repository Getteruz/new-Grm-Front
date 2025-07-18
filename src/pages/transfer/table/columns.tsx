import { ColumnDef } from "@tanstack/react-table";

import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

import { TransferData } from "../type";
import { Input } from "@/components/ui/input";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { parseAsString, useQueryState } from "nuqs";
import { minio_img_url } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ActionButton from "@/components/actionButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {  UpdateData, UpdatePatchData } from "@/service/apiHelpers";
import { toast } from "sonner";
import { useMeStore } from "@/store/me-store";
import ActionBadge from "@/components/actionBadge";
import { TData } from "@/pages/deller/type";
import { Loader } from "lucide-react";
// import { useTranslation } from "react-i18next";
// flatDataFilial
export const paymentColumns =(flatDataFilial:TData[]): ColumnDef<TransferData>[] => {
  return[
    {
      accessorKey: "id",
      header: "№",
      size: 50,
      cell: ({ row }) => {
        return <p>{row.index + 1}</p>;
      },
    },
    {
      header: "courier",
      cell: ({ row }) => {
        return (
          <Avatar className="w-[40px] h-[40px]">
            <AvatarImage
              src={minio_img_url + row?.original?.courier?.avatar?.path}
            />
            <AvatarFallback className="bg-primary text-white w-[40px] flex items-center justify-center h-[40px]">
              {row.original?.courier?.firstName?.[0]}
              {row.original?.courier?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
        );
      },
    },
  
    {
      header: "collection",
      id: "product.bar_code.collection.title",
      accessorKey: "product.bar_code.collection.title",
    },
    {
      header: "model",
      id: "product.bar_code.model.title",
      accessorKey: "product.bar_code.model.title",
    },
    {
      header: "size",
      id: "product.bar_code.size.title",
      accessorKey: "product.bar_code.size.title",
    },
    {
      header: "Обьём",
      id: "product.bar_code.shape.title",
      accessorKey: "product.bar_code.shape.title",
      cell: ({ row }) => {
        return (
          <p>
            {`${(row.original?.product?.bar_code?.size?.x * (row.original.product?.bar_code?.isMetric ? +row.original.count / 100 : +row.original.count * +row.original?.product?.y)).toFixed(2)}`}
            м²
          </p>
        );
      },
    },
  
    {
      header: "shape",
      id: "product.bar_code.shape.title",
      accessorKey: "product.bar_code.shape.title",
    },
    {
      header: "style",
      id: "product.bar_code.style.title",
      accessorKey: "product.bar_code.style.title",
    },
    {
      header: "color",
      id: "product.bar_code.color.title",
      accessorKey: "product.bar_code.color.title",
    },
    {
      header: "country",
      id: "product.bar_code.country.title",
      accessorKey: "product.bar_code.country.title",
    },
    {
      header: "count",
      cell: ({ row }) => {
        return <p>{row.original.count} x</p>;
      },
    },
  
    {
      header: "Статус",
      cell: ({ row }) => {
        const [type] = useQueryState("type", parseAsString.withDefault("In"));
        const [filial] = useQueryState(
          "filial",
          parseAsString.withDefault(
            flatDataFilial?.filter((i) => i.type === "filial")?.[0]?.id || ""
          )
        );
        const [filialTo] = useQueryState(
          "filialTo",
          parseAsString.withDefault(
            flatDataFilial?.filter((i) => i.type === "filial")?.[1]?.id || ""
          )
        );
        const { meUser } = useMeStore();
        const queryClient = useQueryClient();
        const status = row?.original?.progres;
  
        const { mutate, isPending } = useMutation({
          mutationFn: () =>
            UpdateData(apiRoutes.transferAccept , "", {
              from: meUser?.position.role === 9 ? filial : type=="In" ? filial : meUser?.filial?.id ,
              to: meUser?.position.role === 9 ? filialTo : type=="In" ? meUser?.filial?.id : filial ,
               include: [row?.original?.id], exclude: [] ,
            }),
          onSuccess: () => {
            toast.success("Accepted");
            queryClient.invalidateQueries({ queryKey: [apiRoutes.reports] });
            queryClient.invalidateQueries({ queryKey: [apiRoutes.transfers] });

          },
        });
  
        const isRejected = status === "Rejected";
        const isAccepted = status === "Accepted";
        const isRole9 = meUser?.position?.role === 9;
        const isAcceptedFinalIn = (type == "In" && status == "Accepted_F");
        // const isProcessingOut =  (type == "Out" && status == "Processing");
        if (isRejected) {
          return <ActionBadge status="rejected" />;
        }
        
        if (isRole9) {
          const role9Status = isAccepted ? "accepted" : "inProgress";
          return <ActionBadge status={role9Status} />;
        }
        
        if (isAccepted) {
          return <ActionBadge status="accepted" />;
        }
        
        if (isAcceptedFinalIn ) {
          return <ActionButton onClick={()=>mutate()} isLoading={isPending} status={ "accept"} btnText={"Принять"} />;
        }
        
        return <ActionBadge status="inProgress" />;
        
  
      },
    },
    {
      id: "actions",
      enableHiding: true,
      header: () => <div className="text-right">{"actions"}</div>,
      size: 50,
      cell: ({ row }) => {
        const queryClient = useQueryClient();
        const { mutate, isPending } = useMutation({
          mutationFn: () =>
          UpdatePatchData(apiRoutes.transferReject,row?.original?.id,{}),
          onSuccess: () => {
            toast.success("canceled");
            queryClient.invalidateQueries({ queryKey: [apiRoutes.transfers] });
          },
        });
        return (
          <TableAction
            url={apiRoutes.transfers}
            id={row.original?.id}
            ShowDelete={false}
            ShowUpdate={false}
            
          >
              <DropdownMenuItem disabled={isPending} onClick={() =>mutate()}>
              {isPending?<Loader/>:"" }Отменить
            </DropdownMenuItem>
          </TableAction>
        );
      },
    },
  ];
}

export const collactionColumns: ColumnDef<TransferData>[] = [
  {
    accessorKey: "id",
    header: "№",
    size: 50,
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },

  {
    header: "Коллекция",
    cell: () => {
      return <p>Doku</p>;
    },
  },
  {
    header: "Обём",
    cell: () => {
      return <p>230 м²</p>;
    },
  },
  {
    header: "Cумма",
    cell: () => {
      return <p>980 $</p>;
    },
  },
  {
    header: "Цена",
    cell: () => {
      const [type] = useQueryState("type");
      return type == "New" ? (
        <Input className="w-[60px] py-0" placeholder="0$" />
      ) : (
        <p className="w-[60px] py-2">980 $</p>
      );
    },
  },
  {
    header: "Кол-во",
    cell: () => {
      return <p>6 шт</p>;
    },
  },
  {
    header: "Статус",
    cell: () => {
      return <p>~</p>;
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
          url={apiRoutes.transfers}
          ShowDelete={false}
          ShowUpdate={false}
          id={row.original?.id}
        >
          <DropdownMenuItem>Отменить</DropdownMenuItem>
        </TableAction>
      );
    },
  },
];
