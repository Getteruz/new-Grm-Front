import { 
    addDays, 
    format,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth
  } from "date-fns";
  import { ru } from "date-fns/locale";
  import { Calendar as CalendarIcon } from "lucide-react";
  import { DateRange } from "react-day-picker";
  
  import { Button } from "@/components/ui/button";
  import { Calendar } from "@/components/ui/calendar";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  
  interface DatePickerWithRangeProps {
    date: DateRange | undefined;
    onDateChange: (date: DateRange | undefined) => void;
  }
  
  export function DatePickerWithRange({
    date,
    onDateChange,
  }: DatePickerWithRangeProps) {
    // Predefined date ranges
    const selectPredefinedRange = (range: string) => {
      const today = new Date();
      
      switch (range) {
        case "today":
          onDateChange({ from: today, to: today });
          break;
        case "yesterday":
          const yesterday = addDays(today, -1);
          onDateChange({ from: yesterday, to: yesterday });
          break;
        case "thisWeek":
          onDateChange({
            from: startOfWeek(today, { weekStartsOn: 1 }),
            to: endOfWeek(today, { weekStartsOn: 1 }),
          });
          break;
        case "lastWeek": {
          const lastWeekStart = addDays(startOfWeek(today, { weekStartsOn: 1 }), -7);
          const lastWeekEnd = addDays(endOfWeek(today, { weekStartsOn: 1 }), -7);
          onDateChange({ from: lastWeekStart, to: lastWeekEnd });
          break;
        }
        case "thisMonth":
          onDateChange({
            from: startOfMonth(today),
            to: endOfMonth(today),
          });
          break;
        case "lastMonth": {
          const lastMonthStart = startOfMonth(addDays(startOfMonth(today), -1));
          const lastMonthEnd = endOfMonth(lastMonthStart);
          onDateChange({ from: lastMonthStart, to: lastMonthEnd });
          break;
        }
        default:
          onDateChange(undefined);
      }
    };
  
    return (
      <div className="grid gap-2">
        <div className="grid gap-2">
          <Select
            onValueChange={selectPredefinedRange}
            defaultValue=""
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Сегодня</SelectItem>
              <SelectItem value="yesterday">Вчера</SelectItem>
              <SelectItem value="thisWeek">Эта неделя</SelectItem>
              <SelectItem value="lastWeek">Прошлая неделя</SelectItem>
              <SelectItem value="thisMonth">Этот месяц</SelectItem>
              <SelectItem value="lastMonth">Прошлый месяц</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col xs:flex-row gap-2">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            locale={ru}
            numberOfMonths={1}
          />
        </div>
        <div className="flex gap-2 justify-end pt-2 border-t">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onDateChange(undefined)}
          >
            Сбросить
          </Button>
          <Button 
            size="sm" 
            onClick={() => selectPredefinedRange("today")}
          >
            Сегодня
          </Button>
        </div>
      </div>
    );
  }