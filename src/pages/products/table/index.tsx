import { parseAsInteger, useQueryState } from "nuqs";

import { DataTable } from "@/components/ui/data-table";

import { ProductColumns } from "./columns";
import useProduct from "./queries";
import Filters from "./filters";
import TabsFilter from "@/components/filters-ui/tabs-filter";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const [search] = useQueryState("search");
  const { data, isLoading } = useProduct({
    queries: {
      limit,
      page,
      search: search || undefined,
    },
  });

  return (
    <>
     <Filters />
    <div className="bg-sidebar py-0.5 px-[50px]">
    <TabsFilter name="tab" options={[{label:"label",value:"name1"},{label:"label",value:"name4"},{label:"label",value:"name2"}]}/>
    </div>
      <DataTable
        className="m-4"
        isLoading={isLoading}
        columns={ProductColumns}
        data={data?.items ?? []}
      />
    </>
  );
}
