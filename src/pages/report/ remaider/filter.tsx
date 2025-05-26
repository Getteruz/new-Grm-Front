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
    
          fromPlaceholder={`от: ${new Date().getDate().toString().padStart(2, '0')}.${(new Date().getMonth() + 1).toString().padStart(2, '0')}.${new Date().getFullYear()}`}
          toPlaceholder={`до: ${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()}.${(new Date().getMonth() + 1).toString().padStart(2, '0')}.${new Date().getFullYear()}`}
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
