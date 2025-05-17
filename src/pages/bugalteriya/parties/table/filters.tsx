import { format } from "date-fns";
import { FileOutput, Plus } from "lucide-react";
import { useQueryState } from "nuqs";

import { DateRangePicker } from "@/components/filters-ui/date-picker-range";
import FilterSelect from "@/components/filters-ui/filter-select";
import { Button } from "@/components/ui/button";
import { useMeStore } from "@/store/me-store";

export default function Filters() {
  const [, setId] = useQueryState("id");
  const { meUser } = useMeStore();
  return (
    <div className="bg-sidebar w-full border-border border-b  px-[51px] h-[64px]   flex   ">
      <DateRangePicker
        fromPlaceholder={`от: ${format(new Date(), "dd.MM.yyyy")}`}
        toPlaceholder={`до: ${format(new Date(), "dd.MM.yyyy")}`}
      />
      <FilterSelect
        className="w-full max-w-[170px] border-l border-r"
        placeholder="Страна"
        name="news"
      />
      <FilterSelect
        className="w-full max-w-[170px] border-r"
        placeholder="Поставщик"
        name="news"
      />
      <Button
        className="h-full  ml-auto border-y-0 w-[140px] "
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
      {meUser?.position.role === 9 && (
        <Button onClick={() => setId("new")} className="h-full    ">
          <Plus size={24} /> Добавить Партия
        </Button>
      )}
    </div>
  );
}
