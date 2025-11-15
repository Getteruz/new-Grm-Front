import { DateRangePicker } from "@/components/filters-ui/date-picker-range";
import FilterSelect from "@/components/filters-ui/filter-select";
import { MonthsArray } from "@/consts";
import useDataFetch from "@/pages/filial/table/queries";
import { getMonth } from "date-fns";
import { useQueryState } from "nuqs";

export default function Filter() {
  const { data } = useDataFetch({
    queries: { type: "filial", limit: 50 },
  });
  const filialOption =
    data?.pages[0]?.items?.map((e) => ({
      label: e?.name,
      value: e?.id,

    })) || [];

    const [month] = useQueryState("month");
    
  return (
    <>
     <div className="flex gap-1 mt-16">
     <FilterSelect
            placeholder="все"
            defaultValue="clear"
            className="w-[200px] h-[65px] bg-[#333333] text-white"
            options={[{ value: "clear", label: "все" },{value:"#dealers",label:"Dealer"}, ...filialOption]}
            name="filial"
          />
        <FilterSelect
          options={MonthsArray}
          defaultValue={getMonth(new Date()) + 1 + ""}
          name="month"
          className="w-[120px]  px-2 h-[62px]  "
        />
        <DateRangePicker  defaultMonth={month as unknown as Date}  className="w-full" toPlaceholder="до" fromPlaceholder="от" />
        </div>
     
    </>
  )
}
