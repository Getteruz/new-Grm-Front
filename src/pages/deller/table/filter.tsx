import SearchInput from "@/components/filters-ui/search-input";
import Statistics from "@/components/filters-ui/statistics";
import { Button } from "@/components/ui/button";
import {  Archive, FileOutput, Plus, Trash2 } from "lucide-react";
import { useQueryState } from "nuqs";

export default function Filters() {
  const [, setId] = useQueryState("id");
  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px]   flex   ">
      <SearchInput className="mr-auto w-full" />
      <Statistics/>
      <Button className="h-full  border-y-0 w-[64px]"  variant={"outline"} ><Trash2/></Button>
      <Button className="h-full  border-0 w-[64px]  "  variant={"outline"} ><Archive/></Button>
      <Button className="h-full  border-y-0 w-[140px] "  variant={"outline"} ><FileOutput/> Экспорт</Button>
      <Button onClick={() => setId("new")}  className="h-full   border-l-0   border-y-0   "  variant={"outline"} ><Plus size={24}/> Добавить</Button>
    </div>
  );
}
