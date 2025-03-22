import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import {  FileInput, Plus } from "lucide-react";

export default function Filters() {

  return (
    <div className="bg-sidebar border-border border-b   h-[64px] rounded-t-sm flex   ">
      <SearchInput className="ml-2 gap-2 w-full" />
      <Button className="h-full  w-full border-y-0   ml-auto"  variant={"outline"} ><FileInput size={24}/> Импортировать файл</Button>
      <Button className="h-full  w-full  border-y-0   ml-auto"  variant={"outline"} ><Plus size={24}/> Добавить</Button>
    </div>
  );
}
