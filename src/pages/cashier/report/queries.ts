import { useQuery } from "@tanstack/react-query";

import { getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { useMeStore } from "@/store/me-store";

import { KassaReportData } from "./type";

// Query hook to fetch kassa report
export const useKassaReport = () => {
  const { meUser } = useMeStore();
  const filialId = meUser?.filial?.id;

  return useQuery({
    queryKey: [apiRoutes.kassaReport],
    queryFn: () => getAllData<KassaReportData, void>(apiRoutes.kassaReport),
    enabled: !!filialId,
  });
};

interface TQueries {
  filial:string,status:string
}
export const useReport = ({queries}:{queries:TQueries}) => {
  return useQuery({
    queryKey: [apiRoutes.kassa,queries],
    queryFn: () => getAllData<KassaReportData, TQueries>(apiRoutes.kassa,
      queries
    ),
  });
};
