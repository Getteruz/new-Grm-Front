import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

import { ReportsHomePageCurrentMonthQuery, ReportsHomePageCurrentMonthData,ReportsHomePageCurrentLeftData ,} from "./types";

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


  interface IReportsHomePageCurrentLeft {
    options?: DefinedInitialDataOptions<ReportsHomePageCurrentLeftData>;
    queries?: ReportsHomePageCurrentMonthQuery;
  }
  export const useReportsHomePageCurrentLeft = ({ options, queries }: IReportsHomePageCurrentLeft) =>
    useQuery({
      ...options,
      queryKey: [apiRoutes.reportsHomePageCurrentLeft, queries],
      queryFn: () =>
        getAllData<ReportsHomePageCurrentLeftData, ReportsHomePageCurrentMonthQuery>(apiRoutes.reportsHomePageCurrentLeft, queries),
    });
  

