import { DateRangePicker } from "@/components/filters-ui/date-picker-range";
import FilterSelect from "@/components/filters-ui/filter-select";
import useDataFetch from "@/pages/filial/table/queries";

export default function Filter() {
  const { data } = useDataFetch({
    queries: { type: "filial", limit: 50 },
  });
  const filialOption =
    data?.pages[0]?.items?.map((e) => ({
      label: e?.name,
      value: e?.id,

    })) || [];

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
        <DateRangePicker  className="w-full" toPlaceholder="до" fromPlaceholder="от" />
        </div>
     
    </>
  )
}
