import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UpdateData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

const PublishButton = ({ id }) => {
  const queryClient = useQueryClient();
  
  const { mutate: publishProduct, isPending } = useMutation({
    mutationFn: () => 
      UpdateData(apiRoutes.products, id, { isInternetShop: true }),
    onSuccess: () => {
      // Invalidate both published and not-published queries
      queryClient.invalidateQueries({ queryKey: [apiRoutes.products] });
      queryClient.invalidateQueries({ queryKey: [apiRoutes.products + '/not-published'] });
    },
  });

  return (
    <Button 
      size="sm" 
      onClick={() => publishProduct()}
      disabled={isPending}
      variant="ghost" 
      className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
    >
      <Check className="h-4 w-4" />
      <span className="sr-only">Publish</span>
    </Button>
  );
};

export default PublishButton;