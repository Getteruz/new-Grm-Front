import {  Plus } from "lucide-react";
import { useQueryState } from "nuqs";

import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import { useMeStore } from "@/store/me-store";

export default function Filters() {
  const [, setId] = useQueryState("id");
  const {meUser} = useMeStore(); 
  return (
    <div className="bg-sidebar border-border border-b  px-[20px] h-[64px]   flex   ">
      <SearchInput className="mr-auto w-full" />
  
      {/* <Button className="h-full  border-y-0 w-[140px] " variant={"outline"}>
        <FileOutput /> Экспорт
      </Button> */}
     {meUser?.position?.role == 6 ?  <Button
        onClick={() => setId("new")}
        className="h-full   border-l-0   border-y-0   "
        variant={"outline"}
      >
        <Plus size={24} /> Добавить
      </Button>:""}
    </div>
  );
}
