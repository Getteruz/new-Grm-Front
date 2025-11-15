import FilterSelect from "@/components/filters-ui/filter-select";
import { MonthsArray } from "@/consts";
import { useDataCashflowTypes } from "@/pages/report/table/queries";
import { getMonth } from "date-fns";
import { useQueryState } from "nuqs";

export default function Filters() {
const [typeKassamanager] = useQueryState("typeKassamanager");
    const { data: types } = useDataCashflowTypes({
        queries: { limit: 20, page: 1, type: typeKassamanager == "Prixod" ? "in" : "out" },
        enabled: true,
      });

      const filialOption =
      types?.map((e) => ({
        label: e?.type,
        value: e?.id,
      })) || [];
  return (
        <div className="flex gap-4">
      <FilterSelect
        placeholder="все"
        defaultValue="clear"
        className="w-full bg-[#333333] text-white placeholder:text-white "
        options={[{ value: "clear", label: "все" },{value:"Prixod",label:"Приход"},{value:"Rasxod",label:"Rasxod"}]}
        name="typeKassamanager"
      />
      <FilterSelect
        placeholder="все"
        className=" p-2 border-border border w-full  placeholder:text-white "
        defaultValue="none"
        options={filialOption}
        name="typeOther"
      />
      <FilterSelect
        options={MonthsArray}
        name="month"
        defaultValue={getMonth(new Date()) + 1 + ""}
        className=" p-2 border-border border w-full  placeholder:text-white "
      />
    </div>
  )
}
