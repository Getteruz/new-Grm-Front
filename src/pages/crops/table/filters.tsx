import { DateRangePicker } from "@/components/forms/date-picker-from-to";
import { Button } from "@/components/ui/button";
import { FileOutput } from "lucide-react";
import { useQueryState } from "nuqs";

export default function Filters() {
  const [fromDate,setFromDate] = useQueryState('fromDate')
  const [toDate,setToDate] = useQueryState('toDate')
  return (
    <div className="bg-sidebar  gap-2 px-[51px] h-[64px] rounded-t-sm flex   ">
      <p className="text-[20px] my-auto mr-auto font-medium">Crop</p>
      <DateRangePicker
      fromDate={fromDate as unknown as Date }
      toDate={toDate  as unknown as Date }
      onChangeFrom={(e)=>setFromDate(e as unknown as string )}
      onChangeTo={(e)=>setToDate(e as unknown as string )}
      fromPlaceholder="Start date"
      toPlaceholder="End date"
    />
    <Button className="h-full border-x-1 border-y-0 w-[140px] "  variant={"outline"} ><FileOutput/> Экспорт</Button>
    </div>
  );
}
