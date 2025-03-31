import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import {  FileOutput } from "lucide-react";

export default function Filters() {
  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px] rounded-t-sm flex   ">
      <SearchInput/>
      <FilterSelect  placeholder="placeholder" name="news"/>
      <Button   className="h-full ml-auto border-l-0 border-y-0 w-[140px]"  variant={"outline"} ><FileOutput/> Экспорт</Button>
    </div>
  );
}
