import { Factory, FileOutput, Layers2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/filters-ui/date-picker-range";
import FilterSelect from "@/components/filters-ui/filter-select";
import { parseAsString, useQueryState } from "nuqs";

export default function Filters() {
  const [sort] = useQueryState("sort",parseAsString.withDefault('delears'));
  return (
    <div className="bg-sidebar border-border border-b  px-[20px] h-[64px] items-center  flex   ">
        {/* <p className="text-[#272727] text-[20px] mr-10">Отчет об остатке</p> */}
        <FilterSelect
            placeholder="Поставщики"
            className="w-[200px] pl-2 mr-auto h-[65px] px-2 border-border border-r"
            options={[{ value: "delears", label: "Поставщики" },{value: "collaction", label: "Коллекция"}]}
            name="sort"
            icons={
              sort ==="delears"?  <Factory/>:<Layers2/>
            }
          />
    <DateRangePicker/>
      <Button
        className="h-full  border-y-0 w-[140px]  "
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
    </div>
  );
}
