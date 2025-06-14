import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import {  getByIdData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

import {  TKassareportData, TQuery } from "./type";


interface IKassaReportData {
  options?: DefinedInitialDataOptions<TKassareportData>;
  queries?: TQuery;
  enabled?: boolean;
  id:string | undefined;
}


export const useReportsSingle = ({ queries,id ,enabled}: IKassaReportData) =>
  useQuery({
    queryKey: [apiRoutes.reports,id, queries],
    queryFn: ({ pageParam = 10 }) =>
      getByIdData<TKassareportData, TQuery>(apiRoutes.reports, id ||"" ,{
        ...queries,
        page: pageParam as number,
        limit: 10,
      }),
    // getNextPageParam: (lastPage) => {
    //   if (lastPage.meta.currentPage <= lastPage.meta.totalPages) {
    //     return lastPage?.meta?.currentPage + 1;
    //   } else {
    //     return null;
    //   }
    // },
    enabled: enabled,
    // initialPageParam: 1,
  });

