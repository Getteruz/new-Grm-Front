import FilterSelect from "@/components/filters-ui/filter-select";

export default function Filters() {
  // const { data } = useData({
  //   queries: {
  //     limit: 100,
  //     page: 1,
  //     filial: meUser?.filial.id,
  //   },
  // });
  return (
    <div className="bg-sidebar border-border border-b  px-[20px] h-[64px]   flex   ">
      <FilterSelect
        options={[]}
        // options={[
        //   { label: "Все", value: "all" },
        //   ...(data?.pages[0].items.map((l) => ({
        //     label: l.firstName + " " + l.lastName,
        //     value: l.id,
        //   })) || []),
        // ]}
        className=" w-[200px]  border-l "
        placeholder="Страна "
        name="country"
      />
      <FilterSelect
        options={[]}
        // options={[
        //   { label: "Все", value: "all" },
        //   ...(data?.pages[0].items.map((l) => ({
        //     label: l.firstName + " " + l.lastName,
        //     value: l.id,
        //   })) || []),
        // ]}
        className=" w-[200px]  border-l "
        placeholder="Поставщик "
        name="country"
      />
      <FilterSelect
        options={[]}
        // options={[
        //   { label: "Все", value: "all" },
        //   ...(data?.pages[0].items.map((l) => ({
        //     label: l.firstName + " " + l.lastName,
        //     value: l.id,
        //   })) || []),
        // ]}
        className=" w-[200px]  border-l border-r "
        placeholder="Партия "
        name="country"
      />
    </div>
  );
}
