import {  Plus } from "lucide-react";
import { useQueryState } from "nuqs";

import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import { useMeStore } from "@/store/me-store";

export default function Filters() {
  const [, setId] = useQueryState("id");
  const {meUser} = useMeStore(); 
  return (
    <div className=" px-[20px] h-[64px]   flex gap-2 mb-2  ">
      <SearchInput className="mr-auto w-full max-w-[400px]" />
  
      {/* <Button className="h-full  border-y-0 w-[140px] " variant={"outline"}>
        <FileOutput /> Экспорт
      </Button> */}
     {meUser?.position?.role == 6 ?  <Button
        onClick={() => setId("new")}
        className="h-full  w-[200px] "
        variant={"secondary"}
      >
        <Plus size={24} /> Добавить
      </Button>:""}
    </div>
  );
}
