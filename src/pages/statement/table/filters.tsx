import { CalendarRange, FileOutput, Plus, Trash2 } from "lucide-react";
import { useQueryState } from "nuqs";

// import FormDateRangePicker from "@/components/forms/FormDateRangePicker";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Filters() {
  const [, setId] = useQueryState("id");
  const [status, setStatus] = useQueryState("status");
//   const [fromDate, setFromDate] = useQueryState("fromDate");
//   const [toDate, setToDate] = useQueryState("toDate");

//   const handleDateRangeChange = (range: { from?: Date; to?: Date }) => {
//     if (range.from) {
//       setFromDate(range.from.toISOString().split('T')[0]);
//     } else {
//       setFromDate(null);
//     }
    
//     if (range.to) {
//       setToDate(range.to.toISOString().split('T')[0]);
//     } else {
//       setToDate(null);
//     }
//   };

  return (
    <div className="bg-sidebar border-border border-b px-4 h-[64px] flex items-center">
      <div className="flex items-center mr-2">
        <CalendarRange className="text-muted-foreground mr-2" />
        {/* <div className="flex">
          <FormDateRangePicker
            placeholder={
              fromDate && toDate
                ? `От: ${fromDate} — До: ${toDate}`
                : "Выберите диапазон дат"
            }
            // onChange={handleDateRangeChange}
            name="date-picker"
            className="w-64"
          />
        </div> */}
      </div>
      
      <Select value={status || "bce"} onValueChange={setStatus}>
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="Статус" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="bce">Все статусы</SelectItem>
          <SelectItem value="В процессе">В процессе</SelectItem>
          <SelectItem value="Отправить">Отправить</SelectItem>
          <SelectItem value="Отказана">Отказана</SelectItem>
          <SelectItem value="Принято">Принято</SelectItem>
        </SelectContent>
      </Select>
      
      {/* <SearchInput className="ml-2 w-[250px]" /> */}
      
      <div className="flex ml-auto">
        <Button variant="outline" className="mr-2">
          <FileOutput className="mr-2 h-4 w-4" /> Экспорт
        </Button>
        <Button variant="outline" className="mr-2">
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button onClick={() => setId("new")}>
          <Plus className="mr-2 h-4 w-4" /> Добавить ведомость
        </Button>
      </div>
    </div>
  );
}