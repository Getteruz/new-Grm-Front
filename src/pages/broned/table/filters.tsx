import { FileOutput } from "lucide-react";

import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import Statistics from "@/components/filters-ui/statistics";
import { BrCodeIcons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function Filters() {
  return (
    <div className="bg-sidebar border-border border-b  px-[20px] h-[64px]   flex   ">
      <SearchInput />
      <Button
        className="h-full border-l-1  justify-center font-[16px] gap-1  border-y-0  border-r-0"
        variant={"outline"}
      >
        <BrCodeIcons />
      </Button>
      <FilterSelect placeholder="Фильтр" name="news" />
      <FilterSelect placeholder="Продукт" name="news" />
      <FilterSelect placeholder="Лист" name="news" />
      <Statistics />
      <Button
        className="h-full border-l-0 border-y-0 w-[140px]  ml-auto"
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
    </div>
  );
}
