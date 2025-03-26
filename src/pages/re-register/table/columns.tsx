import { ColumnDef } from "@tanstack/react-table";

import TableAction from "@/components/table-action";
import TablePopaver from "@/components/table-popaver";
import { apiRoutes } from "@/service/apiRoutes";

import { TData } from "../type";

export const Columns: ColumnDef<TData>[] = [
  {
    accessorKey: "id",
    header: "#ID",
    size: 50,
  },
  
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "biology_name",
    header: "biologyName",
  },
  {
    accessorKey: "planting_time_end",
    header: "plantingTimeEnd",
  },
  {
    accessorKey: "planting_time_start",
    header: "plantingTimeStart",
  },
  
  {
    id: "description",
    header: "description",
    size: 50,
    cell: ({ row }) => {
      return (
        <TablePopaver text={"description"} disc={row.original?.country?.title} />
      );
    },
  },
  {
    id: "actions",
    enableHiding: true,
    header: () => <div className="text-right">{"actions"}</div>,
    size: 50,
    cell: ({ row }) => {
      return (
        <TableAction url={apiRoutes.parties} ShowPreview id={row.original?.id} />
      );
    },
  },
];
