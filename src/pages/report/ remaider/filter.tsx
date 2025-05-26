import { FileOutput } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMeStore } from "@/store/me-store";
import { DateRangePicker } from "@/components/filters-ui/date-picker-range";

export default function Filters() {
  const { meUser } = useMeStore();

  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px] items-center  flex   ">
      {meUser?.position.role === 4 &&
        <p className="text-[#272727] text-[20px] mr-auto">Отчет об остатке</p>
      }
    
    <DateRangePicker
    
          fromPlaceholder="от: 12.02.2025"
          toPlaceholder="до: 12.02.2025"
        />
      <Button
        className="h-full  border-y-0 w-[140px]  "
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
    </div>
  );
}
