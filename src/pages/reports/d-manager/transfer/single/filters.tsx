import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";

export default function Filters() {
  return (
    <div className="h-[64px] flex justify-between gap-2 mb-2  w-full pr-10">
        <SearchInput  className="w-[350px]"/>

        <FilterSelect
        className="border-border max-w-[150px] w-full border-r"
        options={[
          { label: "Коллекция", value: "collection" },
          { label: "Листь", value: "list" },
        ]}
        defaultValue="list"
        placeholder="Коллекция"
        name="mode"
      />
    </div>
  );
}
