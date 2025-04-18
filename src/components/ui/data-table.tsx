"use client";

import { useEffect, useRef, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  RowSelectionState
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";

import TableLoading from "./table-loading";
import { useQueryState } from "nuqs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  className?: string;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  isRowClickble?:boolean;
  fetchNextPage?: () => void;
  onSelectionChange?: (selectedRows: TData[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  className,
  isRowClickble=false,
  isFetchingNextPage = false,
  hasNextPage = false,
  fetchNextPage,
  onSelectionChange,
}: DataTableProps<TData, TValue>) {
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [, setId] = useQueryState("id");
  const { t } = useTranslation();

  const checkboxColumn: ColumnDef<TData, any> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const allColumns = [checkboxColumn, ...columns];

  useEffect(() => {
    if (!fetchNextPage) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoadMoreRef = loadMoreRef.current;
    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }

    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = Object.keys(rowSelection).map(
        (index) => data[parseInt(index)]
      );
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, data, onSelectionChange]);
  
  const table = useReactTable({
    data,
    columns: allColumns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
  });
  useEffect(() => {
    if (onSelectionChange) {
      const selectedRows = Object.keys(rowSelection).map(
        (index) => data[parseInt(index)]
      );
      onSelectionChange(selectedRows);
    }
  }, [rowSelection, data, onSelectionChange]);
  const navigate = useNavigate()
  return (
    <div className={className}>
      {isLoading && data.length === 0 ? (
        <TableLoading limit={15} table={table} />
      ) : (
        <>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow  key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                          {header.isPlaceholder
                        ? null
                        : typeof flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            ) == "string"
                          ? t(
                              String(
                                flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )
                              )
                            )
                          : null}
                            
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="px-5 cursor-pointer"
                    onClick={()=>{
                      if(isRowClickble){
                        navigate((row.original as {id:string})?.id+'/info')
                      }else{
                        setId((row.original as {id:string})?.id)
                      }
                    }}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {/* Loader for infinite scroll */}
          {fetchNextPage && (
            <div
              ref={loadMoreRef}
              className="flex justify-center items-center "
            >
              {isFetchingNextPage ? (
                 <TableLoading  headerPreview={false} limit={2} table={table} />
              ) : hasNextPage ? (
                <div className="h-8" />
              ) : (
                data.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                  </div>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}