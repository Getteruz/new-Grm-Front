import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { apiRoutes } from "@/service/apiRoutes";
import { DeleteData, UpdatePatchData } from "@/service/apiHelpers";

export const useDeleteStatement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return DeleteData(apiRoutes.payrolls, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiRoutes.payrolls] });
      toast.success("Ведомость успешно удалена");
    },
 
  });
}; 
export const useStateStatement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { id: string; data: { status: string } }) => {
      return UpdatePatchData(apiRoutes.payrolls, params?.id,params?.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiRoutes.payrolls] });
      toast.success("Ведомость успешно обновлена");
    },
   
  });
}; 