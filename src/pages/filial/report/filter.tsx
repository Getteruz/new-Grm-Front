import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import {  FileOutput } from "lucide-react";

export default function Filters() {
  return (
    <div className=" px-[20px] h-[64px]   flex  gap-2 mb-2  ">
      <SearchInput/>
      <FilterSelect  placeholder="placeholder" name="news"/>
      <Button   className="h-full ml-auto  w-[140px]"  variant={"secondary"} ><FileOutput/> Экспорт</Button>
    </div>
  );
}
