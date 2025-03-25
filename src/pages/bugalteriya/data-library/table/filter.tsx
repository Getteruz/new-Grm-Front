import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import UploadExel from "@/components/upload-exel";
import {Plus } from "lucide-react";
import { useQueryState } from "nuqs";

export default function Filters() {
  const [id,setId] = useQueryState("id");
  return (
    <div className="bg-sidebar border-border border-b   h-[64px] rounded-t-sm flex   ">
      <SearchInput className="ml-2 gap-2 w-full" />
      {id ?
    <UploadExel/>
      :
      <Button onClick={()=>setId("new")} className="h-full w-full max-w-[247px] px-[50px] bg-primary text-primary-foreground border-y-0" variant={"outline"} ><Plus size={24}/> Добавить баркод</Button>}
    </div>
  );
}
