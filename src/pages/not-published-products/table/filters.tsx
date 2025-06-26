import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckSquare } from "lucide-react";

import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import Statistics from "@/components/filters-ui/statistics";
import { Button } from "@/components/ui/button";
import { UpdateData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

interface FiltersProps {
  isNotPublished?: boolean;
  selectedProducts: string[];
  clearSelection: () => void;
}

export default function Filters({ 
  isNotPublished = false, 
  selectedProducts = [], 
  clearSelection 
}: FiltersProps) {
  const queryClient = useQueryClient();
  
  const { mutate: publishSelectedProducts, isPending } = useMutation({
    mutationFn: async () => {
      // Create an array of promises for each product update
      const updatePromises = selectedProducts.map(id => 
        UpdateData(apiRoutes.products, id, { isInternetShop: true })
      );
      
      // Wait for all updates to complete
      return Promise.all(updatePromises);
    },
    onSuccess: () => {
      // Invalidate the products query to refresh the data
      queryClient.invalidateQueries({ queryKey: [apiRoutes.products] });
      
      // Clear the selection after publishing
      clearSelection();
    },
  });

  return (
    <div className="bg-sidebar border-border border-b px-[20px] h-[64px] flex items-center">
      <SearchInput />
      
      <FilterSelect placeholder="Фильтр" name="news" />
      <FilterSelect placeholder="Продукт" name="news" />
      <FilterSelect placeholder="Лист" name="news" />
      <Statistics />
      
      <div className="ml-auto flex">
        {/* Publish selected products button */}
        {isNotPublished && (
          <Button
            className="mr-2"
            variant="default"
            onClick={() => publishSelectedProducts()}
            disabled={isPending || selectedProducts.length === 0}
          >
            <CheckSquare className="mr-1 h-4 w-4" /> 
            Опубликовать выбранные ({selectedProducts.length})
          </Button>
        )}
      </div>
    </div>
  );
}