import { FileOutput, Plus } from "lucide-react";
import { useQueryState } from "nuqs";

import { DateRangePicker } from "@/components/filters-ui/date-picker-range";
import { Button } from "@/components/ui/button";
import { useMeStore } from "@/store/me-store";
import FilterComboboxDemoInput from "@/components/filters-ui/filterCombobox";
import { useState } from "react";
import { TSelectOption } from "@/types";

export default function Filters() {
  const [, setId] = useQueryState("id");
  const { meUser } = useMeStore();
  const [country,setCountry]= useState<TSelectOption |null>(null);
  const [factory,setFactory]= useState<TSelectOption |null>(null);
  const [partiyaNumber,setpartiyaNumber]= useState<TSelectOption |null>(null);
  
  // const [factory,setCactory]= useQueryState("factory");
  return (
    <div className="bg-sidebar w-full border-border border-b  px-[51px] h-[64px]   flex   ">
      <DateRangePicker
        fromPlaceholder={`от`}
        toPlaceholder={`до`}
      />
      <FilterComboboxDemoInput
        className="w-full max-w-[170px] h-[63px] border-0 border-l border-r"
        placeholder="Страна" 
        fetchUrl="/country"
         name="country"
        setValue={setCountry}
        value={country}
        fieldNames={{label:"title",value:"id"}}
      />
       <FilterComboboxDemoInput
        className="w-full max-w-[170px] h-[63px] border-0 border-l border-r"
        placeholder="Поставщик" 
        fetchUrl="/factory"
        name="factory"
        setValue={setFactory}
        value={factory}
        fieldNames={{label:"title",value:"id"}}
      />
       <FilterComboboxDemoInput
        className="w-full max-w-[170px] h-[63px] border-0 border-l border-r"
        placeholder="Партия" 
          name="partiya-number"
        fetchUrl="/partiya-number"
        setValue={setpartiyaNumber}
        value={partiyaNumber}
        fieldNames={{label:"title",value:"id"}}
      />
      <Button
        className="h-full  ml-auto border-y-0 w-[140px] "
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
      {meUser?.position.role === 9  || meUser?.position.role === 5  && (
        <Button onClick={() => setId("new")} className="h-full    ">
          <Plus size={24} /> Добавить Партия
        </Button>
      )}
    </div>
  );
}
