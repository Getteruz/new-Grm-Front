import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { useQueryState } from "nuqs";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  fromPlaceholder?: string;
  toPlaceholder?: string;
  className?:string
}

export function DateRangePicker({
  fromPlaceholder,
  toPlaceholder,
  className
  
}: DateRangePickerProps) {
  const { t } = useTranslation();
  const [fromDate, setFromDate] = useQueryState<Date>("startDate", {
    parse: (value) => value ? new Date(value) : new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  });
  const [toDate, setToDate] = useQueryState<Date>("endDate", {
    parse: (value) => value ? new Date(value) : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });
  return (
    <div className={`flex flex-col items-center  max-w-[280px] w-full sm:flex-row gap-2 ${className && className}`}>
      <div className="flex-1 ">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start  text-left bg-card hover:bg-card rounded-xl h-[50px] border-0 font-normal",
                !fromDate && "text-muted-foreground"
              )}
            >
              {<CalendarIcon className="mr-0 h-3 w-3" />}
              {fromDate ? (
                format(fromDate, "dd, LLL, y")
              ) : (
                <span>
                  {fromPlaceholder ? t(fromPlaceholder) : t("From date")}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              className='rounded-xl'
              selected={fromDate || undefined}
              onSelect={(date) => (date ? setFromDate(date) : "")}
              initialFocus
              disabled={(date) => (toDate ? date > toDate : false)}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex-1  ">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left border-0 rounded-xl hover:bg-white bg-white h-[50px] font-normal",
                !toDate && "text-muted-foreground"
              )}
            >
              
              {<CalendarIcon className="mr-0 h-3 w-3" />}
              {toDate ? (
                format(toDate, "dd, LLL, y")
              ) : (
                <span>{toPlaceholder ? t(toPlaceholder) : t("To date")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
               className='rounded-xl'
              selected={toDate || undefined}
              onSelect={(date) => (date ? setToDate(date) : "")}
              initialFocus
              disabled={(date) => (fromDate ? date < fromDate : false)}
            />
          </PopoverContent>
        </Popover>
      </div>
      {toDate || fromDate ? <div onClick={()=>{
          setToDate(null)
          setFromDate(null)
        }} className="rounded-full p-2 cursor-pointer  bg-background">
        <X className="w-[16px]  h-[16px] "/>
        </div>:""}
    </div>
  );
}
