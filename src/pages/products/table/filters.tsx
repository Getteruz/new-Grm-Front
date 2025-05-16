import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import Statistics from "@/components/filters-ui/statistics";
import { BrCodeIcons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { FileOutput } from "lucide-react";

export default function Filters() {
  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px]   flex   ">
      <SearchInput />
      <Button
        className="h-full w-[63px] border-l-1   justify-center font-[16px] gap-1  border-y-0  border-r-1"
        variant={"outline"}
      >
        <BrCodeIcons />
      </Button>
      {/* <FilterSelect placeholder="Фильтр" name="news" /> */}
      <FilterSelect placeholder="Продукт"
      className="border-r-1 w-[150px]"
        defaultValue="collection"
        options={[
          { label: "Продукт", value: "product"},
          { label: "Коллекция", value: "collections" }
        ]}
        name="collection" 
        />

    
      <FilterSelect placeholder="Лист" className="w-[150px]" name="card"
        options={[
          { label: "Лист", value: "list"},
          { label: "Карточкы", value: "card" }
        ]}
         />
      <Statistics />
      <Button
        className="h-full border-l-0 border-y-0 w-[140px]  ml-auto"
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
    </div>
  );
}
