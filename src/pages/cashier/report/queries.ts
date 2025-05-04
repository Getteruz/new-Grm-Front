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

export const useReport = () => {
  return useQuery({
    queryKey: [apiRoutes.cashflow],
    queryFn: () => getAllData<KassaReportData, void>(apiRoutes.cashflow),
  });
};
