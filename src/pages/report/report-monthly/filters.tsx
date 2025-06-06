
import { DateRangePicker } from "@/components/filters-ui/date-picker-range";
import FilterSelect from "@/components/filters-ui/filter-select";

export default function Filters() {

  return (
    <div className="bg-sidebar border-border border-b px-4 h-[64px] flex items-center">
      <div className="flex items-center mr-2">
        <div className="flex">
          <DateRangePicker
            toPlaceholder="до"
            fromPlaceholder="от"

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


     
    </div>
  );
}
