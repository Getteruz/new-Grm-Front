import { parseAsInteger, useQueryState } from "nuqs";

import TabsFilter from "@/components/filters-ui/tabs-filter";
import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { ProductColumns } from "./columns";
import Filters from "./filters";
import useDataFetch from "./queries";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [filial] = useQueryState("filial");
  const [search] = useQueryState("search");
  const { meUser } = useMeStore();

  // const [search] = useQueryState("search");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataFetch({
      queries: {
        limit,
        page,
        search: search || undefined,
        filialId:
          filial ||
          meUser?.position?.role === 2 ||
          meUser?.position?.role === 3 ||
          meUser?.position?.role === 4 ||
          meUser?.position?.role === 5 ||
          meUser?.position?.role === 7
            ? meUser?.filial?.id
            : undefined,
      },
    });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filters />
      {meUser?.position?.role === 9 ||
        (search && (
          <div className="bg-sidebar py-0.5 px-[50px]">
            <TabsFilter />
          </div>
        ))}
      <DataTable
        isLoading={isLoading}
        columns={ProductColumns}
        data={flatData ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}
