import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";
import { CollectionData } from "@/pages/products/type";



export const CollectionColumns: ColumnDef<CollectionData>[] = [
  {
    accessorKey: "id",
    header: "№",
    size: 50,
    cell: ({ row }) => {
      return <p className="text-[14px] font-[500]">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Collection",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <p className="text-[14px] font-[500]">
            {row.original.title}
          </p>
        </div>
      );
    },
  },
 
  {
    header: "Объём",
    accessorKey: "totalKv",
    cell: ({ row }) => {
      return (
        <p className="text-[14px] font-[500]">
          {row.original.totalKv} м²
        </p>
      );
    },
  },
  {
    header: " Сумма",
    accessorKey: "totalKv",
    cell: ({ row }) => {
      return (
        <p className="text-[14px] font-[500]">
          {row.original.totalKv} м²
        </p>
      );
    },
  },
  {
    header: "Кол-во ковров",
    accessorKey: "totalCount",
    cell: ({ row }) => {
      return <p className="text-[14px] font-[500]">{row.original.totalCount} шт</p>;
    },
  },
  {
    header: "Кас-цена",
    accessorKey: "price",
    cell: ({ row }) => {
      const price = row.original.collectionPrices?.[0]?.priceMeter;
      return (
        <p className="text-[14px] font-[500] text-[#E38157]">
          {price ? `${price}$` : '-'}
        </p>
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
        <TableAction
          url={apiRoutes.products}
          ShowUpdate={false}
          ShowDelete={false}
          ShowPreview
          id={row.original.id}
        />
      );
    },
  },
];
