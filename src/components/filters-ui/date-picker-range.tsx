import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslation } from "react-i18next";
import { useQueryState } from "nuqs";

interface DateRangePickerProps {
  fromPlaceholder?: string;
  toPlaceholder?: string;
}

export function DateRangePicker({
  fromPlaceholder,
  toPlaceholder,
}: DateRangePickerProps) {
  const { t } = useTranslation();
const [fromDate ,setFromDate] = useQueryState<Date>('fromDate', { parse: (value) => new Date(value) })
  const [toDate,setToDate] = useQueryState<Date>('toDate', { parse: (value) => new Date(value) })
  return (
    <div className="flex flex-col items-center border-l  sm:flex-row gap-2">
      <div className="flex-1 ">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left border-0 font-normal",
                !fromDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {fromDate ? (
                format(fromDate, "P")
              ) : (
                <span>{fromPlaceholder ? t(fromPlaceholder) : t("From date")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={fromDate || undefined}
              onSelect={(date)=>date? setFromDate(date):""}
              initialFocus
              disabled={(date) => toDate ? date > toDate : false}
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
                "w-full justify-start text-left border-0 font-normal",
                !toDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {toDate ? (
                format(toDate, "P")
              ) : (
                <span>{toPlaceholder ? t(toPlaceholder) : t("To date")}</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={toDate ||undefined}
              onSelect={(date)=>date? setToDate(date):""}
              initialFocus
              disabled={(date) => fromDate ? date < fromDate : false}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}