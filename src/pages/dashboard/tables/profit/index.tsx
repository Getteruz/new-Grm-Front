import { getMonth } from "date-fns";
import Filters from "./filters";
import { parseAsString, useQueryState } from "nuqs";
import { useFetchData } from "./queries";
import { apiRoutes } from "@/service/apiRoutes";
import { DataTable } from "@/components/ui/data-table";
import { CountryColumns } from "@/pages/reports/m-manager/remaider/columns";
import {
  CollectionColumns,
  FactoryColumns,
} from "@/pages/warehouse/remaider/columns";

export default function ProfitTable() {
  const [filial] = useQueryState("filial");
  const [typeProfit] = useQueryState(
    "typeProfit",
    parseAsString.withDefault("country")
  );
  const [month] = useQueryState(
    "month",
    parseAsString.withDefault(getMonth(new Date()) + 1 + "")
  );
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFetchData({
      queries: {
        filialId: filial || undefined,
        month: month || undefined,
        typeOther: "other",
      },
      api:
        typeProfit == "country"
          ? apiRoutes.countryOrderReport
          : typeProfit == "factory"
            ? apiRoutes.factoryOrderReport
            : apiRoutes.collectionOrderReport,
      enabled: true,
    });

  const collections = data?.pages?.flatMap((page) => page?.data || []) || [];

  return (
    <>
      <Filters />
      <DataTable
        columns={
          typeProfit == "country"
            ? CountryColumns
            : typeProfit == "factory"
              ? FactoryColumns
              : CollectionColumns
        }
        data={collections || []}
        isLoading={isLoading}
        isRowClickble={false}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}
