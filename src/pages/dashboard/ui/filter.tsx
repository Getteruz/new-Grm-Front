import FilterSelect from "@/components/filters-ui/filter-select";

export default function Filter() {
  return (
    <>
     <div className="flex gap-1 mt-16">
            <FilterSelect
              className=" max-w-[180px] w-full bg-[#333333] text-white placeholder:text-white "
              options={[
                { label: "Накладной", value: "new" },
                { label: "Оприходован", value: "переучет" },
                { label: "Розница", value: "излишки" }, 
              ]}
              defaultValue="new"
              placeholder="Накладной"
              name="name"
            />

            <p className="p-4 text-[17px] bg-white border-border border text-[#000000] rounded-xl">1 Ноябрь 2025</p>
            <p className="p-4 text-[17px] bg-white border-border border text-[#000000] rounded-xl">10 Ноябрь 2025</p>
        </div>
        <div className="text-white flex items-center rounded-xl gap-3 bg-[#333333] my-2.5 p-4 pl-6">
          <p className="text-[24px] mr-auto">Текущий месяц</p>
          <p  className="text-[24px] opacity-50">16 033.20 м²</p>
          <p className="text-[24px]">80 166.00 $</p>
        </div>
    </>
  )
}
