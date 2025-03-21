"use client";

import { DataTable } from "@/components/ui/data-table";
import { paymentColumns } from "./columns";
import Filters from "./filters";
import useTransfers from "./queries";
import TableWrapper from "@/components/table-wrapper";

export default function Page() {
  const { 
    data, 
    isLoading, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useTransfers({});

  const flatData = data?.pages?.flatMap(page => page?.items || []) || [];

  return (
    <div className="flex ">
      <div className="w-full flex max-w-[440px]">
        <TableWrapper
            className='border-r border-border'
            isloading
            title='Флиалы'
          />
          <TableWrapper 
            className='border-r border-border'
              options={[
              {
                  label:"new",
                  value:"size"
              },
            ]} 
            title='Флиалы'
            />
      </div>
      <div className="w-full" >
        <Filters />
        <DataTable
          className="p-4"
          isLoading={isLoading}
          columns={paymentColumns}
          data={flatData}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}