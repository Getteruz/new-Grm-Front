import { parseAsInteger, useQueryState } from "nuqs";

import CardSort from "@/components/card-sort";
import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { ColumnsDManagerMonthly } from "../table/columns";
import { FinanceColumns } from "./columns";
import Filter from "./filter";
import useDataLibrary from "./queries";

export default function PageFinance() {
  const { meUser } = useMeStore();

  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search] = useQueryState("search");
  const { data, isLoading } = useDataLibrary({
    queries: {
      limit,
      page,
      search: search || undefined,
    },
  });

  return (
    <>
      <Filter />
      <CardSort />
      <DataTable
        className="px-4"
        isLoading={isLoading}
        columns={
          meUser?.position.role === 6 ? ColumnsDManagerMonthly : FinanceColumns
        }
        data={data?.items ?? []}
      />
    </>
  );
}
