import { FileOutput } from "lucide-react";

import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";

export default function Filters() {
  return (
    <div className="bg-sidebar border-border border-b px-[20px] h-[64px] flex items-center">
      <SearchInput />
      <FilterSelect placeholder="Активные" name="Активные" />
      <Button className="h-full w-[140px]" variant={"outline"}>
        <FileOutput className="mr-1" /> Экспорт
      </Button>
    </div>
  );
}
