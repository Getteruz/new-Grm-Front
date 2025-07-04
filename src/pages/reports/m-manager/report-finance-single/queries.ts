import { DefinedInitialDataOptions, useQuery } from "@tanstack/react-query";

import {  getAllData, getByIdData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

import {  TKassareportData, TQuery ,TDealearQuery } from "./type";
import { TResponse } from "@/types";


interface IKassaReportData {
  options?: DefinedInitialDataOptions<TKassareportData>;
  queries?: TQuery;
  enabled?: boolean;
  id:string | undefined;
}

interface IReportDealerData {
  options?: DefinedInitialDataOptions<TKassareportData[]>;
  queries?: TDealearQuery;
  enabled?: boolean;
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

  export const useReportDealer = ({ queries,enabled}: IReportDealerData) =>
    useQuery({
      queryKey: [apiRoutes.reportsDealer, queries],
      queryFn: () =>
        getAllData<TKassareportData[], TDealearQuery>(apiRoutes.reportsDealer || "" ,queries),
      enabled: enabled,
    });