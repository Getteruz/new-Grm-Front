import FilterSelect from "@/components/filters-ui/filter-select";
import { Button } from "@/components/ui/button";
import { FileOutput } from "lucide-react";

export default function Filters() {

  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px]   flex   ">
      <FilterSelect   placeholder="Все" name="news"/>
      <FilterSelect  placeholder="Тип операции" name="news"/>
      <Button className="h-full border-l-0 border-y-0 w-[140px]  ml-auto"  variant={"outline"} ><FileOutput/> Экспорт</Button>
    </div>
  );
}
