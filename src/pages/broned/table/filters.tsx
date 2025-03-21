import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import Statistics from "@/components/filters-ui/statistics";
import { BrCodeIcons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FileOutput } from "lucide-react";

export default function Filters() {

  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px] rounded-t-sm flex   ">
      <SearchInput/>
      <Button  className="h-full border-l-1  justify-center font-[16px] gap-0.5  border-y-0  border-r-0" 
       variant={"outline"} > 
       <BrCodeIcons/> 
      </Button>
      <FilterSelect className="border-l-1 border-r-0 border-y-0 border-solid" placeholder="placeholder" name="news"/>
      <FilterSelect className="border-l-1 border-r-0 border-y-0 border-solid" placeholder="placeholder" name="news"/>
      <FilterSelect className="border-l-1 border-r-0 border-y-0 border-solid" placeholder="placeholder" name="news"/>
      <Statistics/>
      <Button className="h-full border-l-0 border-y-0 w-[140px]  ml-auto"  variant={"outline"} ><FileOutput/> Экспорт</Button>
    </div>
  );
}
