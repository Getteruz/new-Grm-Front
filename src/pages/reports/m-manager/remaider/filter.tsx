import {  Factory, FileOutput, Layers2, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/filters-ui/date-picker-range";
import FilterSelect from "@/components/filters-ui/filter-select";
import { parseAsString, useQueryState } from "nuqs";
import { usefilialWarehouseFetch } from "./queries";

export default function Filters() {

  const [sort] = useQueryState("sort", parseAsString.withDefault("delears"));
  const { data } = usefilialWarehouseFetch({
    queries: {  limit: 50 },
  });
  const filialOption =
    data?.pages[0]?.items?.map((e) => ({
      label: e?.name,
      value: e?.id,
    })) || [];
  return (
    <div className="bg-sidebar border-border border-b  px-[20px] h-[64px] items-center  flex   ">
        <FilterSelect
            placeholder="все"
            className="w-[200px] pl-2 h-[65px] border-border border-r"
            options={[{ value: "clear", label: "все" }, ...filialOption]}
            name="filial"
            icons={
              <>
                <Store />
              </>
            }
          />
       <FilterSelect
            placeholder="Поставщики"
            className="w-[200px] px-3 mr-auto h-[65px] border-border border-r"
            options={[{ value: "delears", label: "Поставщики" },{value: "collaction", label: "Коллекция"}]}
            name="sort"
            icons={
              sort ==="delears"?  <Factory/>:<Layers2/>
            }
          />
    <DateRangePicker/>
      <Button
        className="h-full  border-y-0 w-[140px]  "
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
    </div>
  );
}
