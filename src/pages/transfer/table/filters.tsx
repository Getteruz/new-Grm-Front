import { DateRangePicker } from "@/components/filters-ui/date-picker-range";
import SearchInput from "@/components/filters-ui/search-input";
import { BrCodeIcons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SquareCheckBig } from "lucide-react";

export default function Filters() {
  return (
    <div className="bg-sidebar border-b border-border  h-[64px]   flex   ">
      <Button className="h-full border-r-1  justify-center font-[16px] gap-1  border-y-0  border-l-0" 
       variant={"outline"} > 
       <BrCodeIcons/> 
      Баркод
    </Button>
      <SearchInput/>
      <DateRangePicker
        fromPlaceholder="Start date"
        toPlaceholder="End date"
      />
    <Button className="h-full border-l-1 justify-center gap-1 w-[68px] border-y-0  border-r-0"  size={"icon"} variant={"outline"} > 
      <SquareCheckBig/> 0
    </Button>
    <Button className="h-full border-x-1 border-y-0 w-[140px] "  variant={"outline"} > Принять</Button>
    </div>
  );
}
