import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

import { ProductsData } from "../type";

export const CollectionColumns: ColumnDef<ProductsData>[] = [
  {
    accessorKey: "id",
    header: "№",
    size: 50,
    cell: ({ row }) => {
      return <p className="text-[14px] font-[500]">{row.index + 1}</p>;
    },
  },
  {
    id: "bar_code.model.title",
    accessorKey: "bar_code.model.title",
    header: "Model",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
          <p className="text-[14px] font-[500]">
            {row.original?.bar_code?.model?.title || ""}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "gap",
    size: 50,
    cell: () => {
      return <p className="w-[500px]"></p>;
    },
  },
  {
    header: "Объём",
    cell: ({ row }) => {
      return (
        <p className="text-[14px] font-[500]">
          {`${((row.original?.bar_code?.size?.x || 0) * (row.original?.bar_code?.size?.y || 0)).toFixed(1)}`} м²
        </p>
      );
    },
  },
  {
    header: "Кол-во ковров",
    cell: ({ row }) => {
      return <p className="text-[14px] font-[500]">{row.original.count} шт</p>;
    },
  },
  {
    header: "Кас-цена",
    cell: ({ row }) => {
      return <p className="text-[14px] font-[500] text-[#E38157]">{row.original.price} $</p>;
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
          id={row.original?.id?.toString()}
        />
      );
    },
  },
];

export const ProductColumns: ColumnDef<ProductsData>[] = [
  {
    accessorKey: "id",
    header: "№",
    size: 50,
    cell: ({ row }) => {
      return <p>{row.index + 1}</p>;
    },
  },
  {
    header: "Баркод",
    id: "bar_code.code",
    accessorKey: "bar_code.code",
  },
  {
    header: "collection",
    id: "bar_code.collection.title",
    accessorKey: "bar_code.collection.title",
  },
  {
    header: "model",
    id: "bar_code.model.title",
    accessorKey: "bar_code.model.title",
  },
  {
    header: "size",
    cell: ({ row }) => {
      return (
        <p>{`${(row.original?.bar_code?.size?.x || 0) * 100}X${((row.original?.bar_code?.size?.y || 0) * 100).toFixed()}`}</p>
      );
    },
  },
  {
    header: "Обьём",
    cell: ({ row }) => {
      return (
        <p>
          {`${((row.original?.bar_code?.size?.x || 0) * (row.original?.bar_code?.size?.y || 0)).toFixed(1)}`} м²
        </p>
      );
    },
  },
  {
    header: "shape",
    id: "bar_code.shape.title",
    accessorKey: "bar_code.shape.title",
  },
  {
    header: "style",
    id: "bar_code.style.title",
    accessorKey: "bar_code.style.title",
  },
  {
    header: "color",
    id: "bar_code.color.title",
    accessorKey: "bar_code.color.title",
  },
  {
    header: "country",
    id: "bar_code.country.title",
    accessorKey: "bar_code.country.title",
  },
  {
    header: "factory",
    id: "bar_code.factory.title",
    accessorKey: "bar_code.factory.title",
  },
  {
    header: "Партия",
    id: "bar_code.partiya_no.title",
    accessorKey: "bar_code.partiya_no.title",
  },
  {
    header: "count",
    cell: ({ row }) => {
      return <p>{row.original.count} x</p>;
    },
  },
  {
    header: "Кас-цена",
    cell: ({ row }) => {
      return <p>{row.original.price} $</p>;
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
          id={row.original?.id?.toString()}
        />
      );
    },
  },
];
