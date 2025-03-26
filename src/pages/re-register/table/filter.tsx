import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import { EditIcon, FileOutput, Trash2 } from "lucide-react";

export default function Filters() {

  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px] rounded-t-sm flex   ">
      <SearchInput/>
      
      <FilterSelect  placeholder="placeholder" name="news"/>
      <Button  className="h-full border-l-1  ml-auto justify-center font-[16px] gap-1  border-y-0  border-r-0" 
       variant={"outline"} > 
       <EditIcon/>
      </Button>
      <Button  className="h-full border-l-1  justify-center font-[16px] gap-1  border-y-0  border-r-0" 
       variant={"outline"} > 
       <Trash2/>
      </Button>
      <Button className="h-full border-l-0 border-y-0 w-[140px]  "  variant={"outline"} ><FileOutput/> Экспорт</Button>
    </div>
  );
}
