import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

import { ReportsHomePageCurrentMonthQuery, ReportsHomePageCurrentMonthData } from "./types";

interface IReportsHomePageCurrentMonth {
  options?: DefinedInitialDataOptions<ReportsHomePageCurrentMonthData>;
  queries?: ReportsHomePageCurrentMonthQuery;
}
export const useReportsHomePageCurrentMonth = ({ options, queries }: IReportsHomePageCurrentMonth) =>
  useQuery({
    ...options,
    queryKey: [apiRoutes.reportsHomePageCurrentMonth, queries],
    queryFn: () =>
      getAllData<ReportsHomePageCurrentMonthData, ReportsHomePageCurrentMonthQuery>(apiRoutes.reportsHomePageCurrentMonth, queries),
  });


  