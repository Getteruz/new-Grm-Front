import { useQuery } from "@tanstack/react-query";
import { useMeStore } from "@/store/me-store";
import { getAllData } from "@/service/apiHelpers";
import { KassaReportData } from "./type";
import { apiRoutes } from "@/service/apiRoutes";

// Query hook to fetch kassa report
export const useKassaReport = () => {
  const { meUser } = useMeStore();
  const filialId = meUser?.filial?.id;

  return useQuery({
    queryKey: [apiRoutes.kassaReport],
    queryFn: () => 
      getAllData<KassaReportData, void>(
        apiRoutes.kassaReport, 
      ),
    enabled: !!filialId,
  });
};