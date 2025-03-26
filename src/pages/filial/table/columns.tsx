import { ColumnDef } from "@tanstack/react-table";

import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

import { TData } from "../type";
import { LineBottom, LineTop } from "@/components/icons";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UpdatePatchData } from "@/service/apiHelpers";
import { toast } from "sonner";

export const FilialColumns: ColumnDef<TData>[] = [
  
  {
    id: "name",
    header: "name",
    accessorKey: "name",
  },
  {
    id: "address",
    header: "address",
    accessorKey: "address",
  },
  {
    id: "phone1",
    header: "phone1",
    accessorKey: "phone1",
  },
 
  {
    header: "count",
    cell: () => {
      return <p className={`flex items-center gap-[7px] ${true?  'text-[#89A143]':'text-[#E38157]'}`}>
         {true?<LineTop/> :<LineBottom/> }  + 0.6%
      </p>;
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
          url={apiRoutes.filial}
          ShowPreview={row.original?.need_get_report}
          id={row.original?.id}
        >
           {row.original?.need_get_report ?<></>
            :  <DropdownMenuItem  onClick={()=>{
               UpdatePatchData('/filial/maker-report', row.original?.id,{})
              .then(()=>toast.success('Переучёт sended'))
              .catch(()=>toast.error("something wend from"))
            }}>
              Запросить переучёт
            </DropdownMenuItem>}
        </TableAction>
      );
    },
  },
];
