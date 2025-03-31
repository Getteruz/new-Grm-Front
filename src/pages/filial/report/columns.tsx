import { ColumnDef } from "@tanstack/react-table";
import { FilialReportData } from "../type";
import { format } from "date-fns";
import TableAction from "@/components/table-action";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";


export const Columns: ColumnDef<FilialReportData>[] = [
  {
    header: "Дата переучёта",
    cell: ({ row }) => {
      return (
        <>
          <p>{format(row.original?.date, "MM-dd-yyyy")}</p>
        </>
      );
    },
  },
  {
    header: "Обьём",
    cell: ({ row }) => {
      return <p>{row.original?.volume}м²</p>;
    },
  },
 
  {
    header: "Стоимость",
    cell: ({ row }) => {
      return <p>
        { row.original?.cost }$
      </p>;
    },
  },
  {
    header: "Статус пратии",
    cell: ({ row }) => {
      if(row.original.status == "Open"){
        return <p className="px-4 py-3 rounded-[1000px] inline-block text-[#F0F0E5] bg-[#89A143] ">Принять</p>;
      }else{
        return <p className="px-4 py-3 rounded-[1000px] inline-block  border-border border">{row.original.status}</p>;
      }
    },
  },
  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
    cell: ({ row }) => {
      if(row.original.status == "Open"){
        return (
          <TableAction
            id=""
            url=""
            ShowPreview={false}
            ShowDelete={false}
            ShowUpdate={false}
          >
            <DropdownMenuItem 
            //  onClick={()=>{
            //      UpdatePatchData(apiRoutes.filialMakeReport, row.original?.id,{})
            //     .then(()=>toast.success('Переучёт отправлен'))
            //     .catch(()=>toast.error("что-то пошло не так"))
            //   }}
              >
               Отменить
              </DropdownMenuItem>
              
          </TableAction>
        );
      }
    },
  },

];
