import { ColumnDef } from "@tanstack/react-table";
import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";
import { CollectionData } from "@/pages/products/type";
import { ProductsData } from "@/pages/price/type";


export const CollectionDealerColumns: ColumnDef<CollectionData>[] = [
  {
    accessorKey: "id",
    header: "№",
    cell: ({ row }) => {
      return <p className="text-[14px] font-[500]">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Поставщики",
   
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
          {row.original.totalKv || 0} м²
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
          {(Number(row.original.totalKv) * row.original.collectionPrices?.[0]?.priceMeter).toFixed(2) || 0}$
        </p>
      );
    },
  },
  {
    header: "Кол-во ковров",
    accessorKey: "totalCount",
    cell: ({ row }) => {
      return <p className="text-[14px] w-[200px] font-[500]">{row.original.totalCount || 0} шт</p>;
    },
  },
  {
    header: "Объём продажы",
    accessorKey: "",
    cell: ({row}) => {
      return (
        <p className="text-[14px] font-[500]">
    
        {row.original.orderKv || 0} м²
        </p>
      );
    },
  },
  {
    header: "Сумма продажы",
    accessorKey: "",
    cell: ({row}) => {
      return (
        <p className="text-[14px] font-[500]">
            {row.original.totalPrice || 0} $
        </p>
      );
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
          ShowPreview={false}
          id={row.original.id}
        />
      );
    },
  },
];

export const CollectionColumns: ColumnDef<ProductsData>[] = [
  {
    accessorKey: "id",
    header: "№",
    cell: ({ row }) => {
      return <p className="text-[14px] font-[500]">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Коллекция",
   
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
          {row.original.totalKv || 0} м²
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
          {(Number(row.original.totalKv) * row.original.collection_prices?.[0]?.priceMeter).toFixed(2) || 0}$
        </p>
      );
    },
  },
];
