import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QRGeneratorQuery, QRCode } from "./type";
import { getAllData, AddData } from "@/service/apiHelpers";
import { TResponse } from "@/types";
import { toast } from "sonner";
import { apiRoutes } from "@/service/apiRoutes";

const API_ENDPOINT = apiRoutes.qrCodes;

// Hook to fetch QR codes with pagination
export const useQRCodesFetch = (queries: QRGeneratorQuery) => {
  return useQuery({
    queryKey: ["qr-codes", queries],
    queryFn: () => getAllData<TResponse<QRCode>, QRGeneratorQuery>(
      API_ENDPOINT,
      {
        limit: queries.limit || 18,
        page: queries.page || 1,
        type: queries.type,
        prefix: queries.prefix,
      }
    ),
    // Keep previously fetched data while new data is being requested
    // keepPreviousData: true,
  });
};

// Hook to generate new QR codes
export const useGenerateQRCodes = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (count: number) => {
      return AddData(API_ENDPOINT, {count:count} );
    },
    onSuccess: () => {
      // Invalidate and refetch QR codes queries after successful generation
      queryClient.invalidateQueries({ queryKey: ["qr-codes"] });
      toast.success(`QR-коды успешно сгенерированы`);
    },
    onError: (error) => {
      toast.error("Ошибка при генерации QR-кодов");
      console.error("Error generating QR codes:", error);
    }
  });
};