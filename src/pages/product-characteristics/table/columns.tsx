import { ColumnDef } from "@tanstack/react-table";

import { ProductCharacteristic } from "../type";

export const ProductCharacteristicColumns: ColumnDef<ProductCharacteristic>[] =
  [{
    id: "collection",
    header: "Коллекция",
    accessorKey: "collection.title",
  },


  ];
