import { SquareCheckBig } from "lucide-react";

import { DateRangePicker } from "@/components/filters-ui/date-picker-range";
import FilterSelect from "@/components/filters-ui/filter-select";
import { Button } from "@/components/ui/button";
import useData from "@/pages/employees/table/queries";
import { useMeStore } from "@/store/me-store";
const Sort = [
  {
    label: "Все",
    value: "all",
  },
  {
    label: "В ожидание подтверждения",
    value: "progress",
  },
  {
    label: "Подтверждённые",
    value: "accepted",
  },
  {
    label: "Отменённые",
    value: "rejected",
  },
  {
    label: "Возвращённые",
    value: "canceled",
  },
];
export default function Filters({ countLength }: { countLength: number }) {
  const { meUser } = useMeStore();
  const { data } = useData({
    queries: {
      limit: 100,
      page: 1,
      filial: meUser?.filial.id,
    },
  });

  return (
    <div className="w-full flex h-[40px] bg-sidebar">
      <FilterSelect
        options={Sort}
        className="max-w-[426px] bg-primary text-[#E6E6D9]  w-full text-[20px]"
        classNameValue="bg-red-200"
        placeholder="Все операции"
        classNameContainer="bg-primary text-[#E6E6D9]"
        classNameItem="bg-[#5D5D53CC] hover:bg-[#5D5D53CC] p-4 text-[20px]"
        defaultValue="all"
        name="sort"
      />
      <Button
        className="h-full border-l-1 text-primary justify-center gap-1 w-[60px] border-y-0 border-r-0"
        size={"icon"}
        variant={"outline"}
      >
        <SquareCheckBig />
        {countLength}
      </Button>
      <FilterSelect
        options={[
          { label: "Все", value: "all" },
          ...(data?.pages[0].items.map((l) => ({
            label: l.firstName + " " + l.lastName,
            value: l.id,
          })) || []),
        ]}
        className=" w-[200px]  border-l "
        placeholder="Выберите продавца "
        name="sellerId"
      />
      <DateRangePicker toPlaceholder="до" fromPlaceholder="от" />
      {/* <Button
        className="h-full  border-l-1 text-primary justify-center gap-1 px-4 border-y-0 border-r-0"
        variant={"outline"}
      >
        <Tornado />
        Фильтр
      </Button> */}
    </div>
  );
}
