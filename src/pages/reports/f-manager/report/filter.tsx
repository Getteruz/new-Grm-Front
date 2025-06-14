import { FileOutput } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/filters-ui/date-picker-range";

export default function Filters() {

  
  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px] items-center  flex   ">
        <p className="text-[#272727] text-[20px] mr-auto">Касса магазина</p>
        <DateRangePicker
          fromPlaceholder={`от`}
          toPlaceholder={`до`}
        />
      <Button
        className="h-full  border-y-0 w-[140px] "
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
      {/* <Button
        className="h-full border-l-0 bg-primary hover:bg-[#525248] hover:text-accent text-accent border-y-0 w-[165px]  "
        variant={"outline"}
      >
        <X /> Закрыть кассу
      </Button> */}
    </div>
  );
}
