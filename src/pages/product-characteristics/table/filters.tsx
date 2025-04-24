import { FileOutput } from "lucide-react";
import { useQueryState } from "nuqs";

import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";

interface FiltersProps {
  selectedItems: string[];
  clearSelection: () => void;
}

export default function Filters({ selectedItems, clearSelection }: FiltersProps) {
  const [sortBy, setSortBy] = useQueryState("sortBy", { defaultValue: "active" });

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  return (
    <div className="bg-sidebar border-border border-b px-[51px] h-[64px] flex items-center">
      <SearchInput />
      <FilterSelect placeholder="Активные" name="Активные" />
        <Button
          className="h-full w-[140px]"
          variant={"outline"}
        >
          <FileOutput className="mr-1" /> Экспорт
        </Button>
      </div>
  );
}