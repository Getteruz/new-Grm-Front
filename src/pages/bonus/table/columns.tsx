// table/columns.tsx
import { ColumnDef } from "@tanstack/react-table";

import { Bonus } from "../type";
import { ActionsCell } from "./ActionsCell";

export const BonusColumns: ColumnDef<Bonus>[] = [
  {
    accessorKey: "number",
    header: "№",
    size: 60,
  },
  {
    header: "Название",
    accessorKey: "name",
  },
  {
    header: "Условия",
    accessorKey: "condition",
    cell: ({ row }) => {
      return <span>{row.original.condition}</span>;
    },
  },
  {
    header: "Ед.измерения",
    accessorKey: "measurementUnit",
    cell: ({ row }) => {
      return <span>{row.original.measurementUnit}</span>;
    },
  },
  {
    header: "Оператор",
    accessorKey: "operator",
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <span className="mr-2">{row.original.operator}</span>
          {row.original.operator !== "=" && (
            <span className="text-gray-500">→</span>
          )}
        </div>
      );
    },
  },
  {
    header: "Бонус",
    accessorKey: "bonusValue",
    cell: ({ row }) => {
      return <span>{row.original.bonusValue}</span>;
    },
  },
  {
    header: "Ед.измерения",
    accessorKey: "bonusUnit",
    cell: ({ row }) => {
      return <span>{row.original.bonusUnit}</span>;
    },
  },
  {
    header: "Период",
    accessorKey: "period",
    cell: ({ row }) => {
      return <span>{row.original.period}</span>;
    },
  },
  {
    id: "actions",
    enableHiding: true,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

