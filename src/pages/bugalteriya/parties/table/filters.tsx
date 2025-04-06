import { DateRangePicker } from "@/components/filters-ui/date-picker-range";
import FilterSelect from "@/components/filters-ui/filter-select";
import { Button } from "@/components/ui/button";
import {   FileOutput, Plus } from "lucide-react";
import { useQueryState } from "nuqs";

export default function Filters() {
  const [, setId] = useQueryState("id");
  return (
    <div className="bg-sidebar w-full border-border border-b  px-[51px] h-[64px]   flex   ">
        <DateRangePicker
          fromPlaceholder="Start date"
          toPlaceholder="End date"
        />
     <FilterSelect className="w-full max-w-[170px]"   placeholder="Страна" name="news"/>
     <FilterSelect    className="w-full max-w-[170px]"   placeholder="Поставщик" name="news"/>
      <Button className="h-full  ml-auto border-y-0 w-[140px] "  variant={"outline"} ><FileOutput/> Экспорт</Button>
      <Button onClick={() => setId("new")}  className="h-full   border-l-0   border-y-0   "  variant={"outline"} ><Plus size={24}/> Добавить</Button>
    </div>
  );
}
