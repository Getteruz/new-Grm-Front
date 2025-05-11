import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { ColumnsDManagerMonthly } from "../table/columns";
import { FinanceColumns } from "./columns";
import Filter from "./filter";
import useDataLibrary from "./queries";
import CardSort from "../table/card-sort";

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
      <div className="h-[calc(100vh-140px)] scrollCastom">

      <CardSort />
      <DataTable
        isLoading={isLoading}
        columns={
          meUser?.position.role === 6 ? ColumnsDManagerMonthly : FinanceColumns
        }
        data={data?.items ?? []}
      />
      </div>
    </>
  );
}
