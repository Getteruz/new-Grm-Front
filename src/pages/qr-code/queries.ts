import { useQuery } from "@tanstack/react-query";
import { QRGeneratorQuery, QRCode } from "./type";
import { generateQRCodes } from "./utils";

// This is a simulated API call that would normally fetch from your backend
const fetchQRCodes = async (queries: QRGeneratorQuery): Promise<QRCode[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate QR codes based on query parameters
  const count = queries.count || 18;
  return generateQRCodes(count);
};

// Hook to fetch QR codes
export const useQRCodesFetch = (queries: QRGeneratorQuery) => {
  return useQuery({
    queryKey: ["qr-codes", queries],
    queryFn: () => fetchQRCodes(queries),
    // Keep previously fetched data while new data is being requested
    keepPreviousData: true,
  });
};