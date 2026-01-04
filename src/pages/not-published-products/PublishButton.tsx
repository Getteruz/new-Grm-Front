// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
// import { UpdateData } from "@/service/apiHelpers";
// import { apiRoutes } from "@/service/apiRoutes";

const PublishButton = ({  }: { id: string }) => {
  // const queryClient = useQueryClient();

  // const { mutate: publishProduct, isPending } = useMutation({
  //   mutationFn: () =>
  //     UpdateData(apiRoutes.products, id, { isInternetShop: true }),
  //   onSuccess: () => {
  //     // Invalidate both published and not-published queries
  //     queryClient.invalidateQueries({ queryKey: [apiRoutes.products] });
  //     queryClient.invalidateQueries({
  //       queryKey: [apiRoutes.products + "/not-published"],
  //     });
  //   },
  // });

  return (
    <Button
      // onClick={() => publishProduct()}
      // disabled={isPending}
      variant="ghost"
      className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
    > 
    Опубликовать
      
    </Button>
  );
};

export default PublishButton;
