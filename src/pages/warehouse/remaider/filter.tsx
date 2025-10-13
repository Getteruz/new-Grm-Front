import { FileOutput } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/filters-ui/date-picker-range";

export default function Filters() {

  return (
    <div className=" px-[20px] h-[64px] items-center  flex  gap-2 mb-2  ">
        <p className="text-[#272727] text-[20px] mr-auto">Отчет об остатке</p>
    
    <DateRangePicker/>
      <Button
        className="h-full w-[140px]  "
        variant={"secondary"}
      >
        <FileOutput /> Экспорт
      </Button>
    </div>
  );
}
