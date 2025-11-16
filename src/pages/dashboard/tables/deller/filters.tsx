import FilterSelect from "@/components/filters-ui/filter-select";
import useDataFetch from "@/pages/deller/table/queries";

export default function Filters() {
  const { data } =
    useDataFetch({
      queries: {
        page:1,
        limit: 50,
        type: "dealer",
      },
    });

  const filialOption =
    data?.pages[0]?.items?.map((e) => ({
      label: e?.title,
      value: e?.id,
    })) || [];

  return (
    <div className="flex gap-4">
      <FilterSelect
        placeholder="все"
        defaultValue="clear"
        className="w-[160px] h-[60px] bg-[#333333] text-white placeholder:text-white "
        options={[{ value: "clear", label: "все" }, ...filialOption]}
        name="dellerFilial"
      />
    </div>
  );
}
