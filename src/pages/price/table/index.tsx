import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { AColumns, Columns, IManagerColumns } from "./columns";
import Filters from "./filters";
import useDataFetch from "./queries";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search");
  const me = useMeStore();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataFetch({
      queries: {
        limit,
        page,
        search: search || undefined,
      },
      filialId: me.meUser?.filial?.id,
    });
  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filters />
      <DataTable
        isLoading={isLoading}
        columns={
          me.meUser?.position.role === 8 ||
          me.meUser?.position.role === 10 ||
          me.meUser?.position.role === 3
            ? IManagerColumns
            : me.meUser?.position.role === 9 ||  me.meUser?.position.role === 12
              ? Columns
              : AColumns
        }
        data={flatData ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}
