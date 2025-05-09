import { FileOutput, Plus, Trash2 } from "lucide-react";
import { useQueryState } from "nuqs";

import { DateRangePicker } from "@/components/filters-ui/date-picker-range";
import FilterSelect from "@/components/filters-ui/filter-select";
import { Button } from "@/components/ui/button";

export default function Filters() {
  const [, setId] = useQueryState("id");

  return (
    <div className="bg-sidebar border-border border-b px-4 h-[64px] flex items-center">
      <div className="flex items-center mr-2">
        {/* <CalendarRange className="text-muted-foreground mr-2" /> */}
        <div className="flex">
          <DateRangePicker
            toPlaceholder="до"
            fromPlaceholder="от"

            // placeholder={"Выберите диапазон дат"}
            // onChange={handleDateRangeChange}
            // name="date-picker"
            // className="w-64"
          />
        </div>
      </div>
      <FilterSelect
        placeholder="Фильтр"
        name="status"
        className="border-x border-border h-full mx-4"
        defaultValue="all"
        options={[
          { label: "Все статусы", value: "all" },
          { label: "В процессе", value: "InProgress" },
          { label: "Отправить", value: "Sent" },
          { label: "Отказана", value: "Rejected" },
          { label: "Принято", value: "Accepted" },
        ]}
      />

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
