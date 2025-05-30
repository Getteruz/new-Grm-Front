import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import useDataFetch from "@/pages/filial/table/queries";
import { useMeStore } from "@/store/me-store";
import {  Archive, FileOutput, Plus, Store, Trash2 } from "lucide-react";
import { useQueryState } from "nuqs";

export default function Filters() {
  const [, setId] = useQueryState("id");

  const { data} =
    useDataFetch({
      queries: {
        page:2,
        limit:50,
        // type: "filial",
      },
    });
  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  const { meUser } = useMeStore();
  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px]   flex   ">
      <SearchInput className="w-full border border-y-0 border-l-0 border-r mr-4"/>
     {meUser?.position.role == 11 ? <FilterSelect
        icons={<Store />}
        className="w-full max-w-[170px]"
        placeholder="Филиалы"
        name="filial"
        options={[{label:"Все",value:"all"} ,...flatData?.map(e=>({label:e.name,value:e.id}))]}
      />:""}
      <Button className="h-full  border-y-0 w-[64px]"  variant={"outline"} ><Trash2/></Button>
      <Button className="h-full  border-0 w-[64px]  "  variant={"outline"} ><Archive/></Button>
      <Button className="h-full  border-y-0 w-[140px] "  variant={"outline"} ><FileOutput/> Экспорт</Button>
      {meUser?.position.role ==11?<Button onClick={() => setId("new")}  className="h-full   border-l-0   border-y-0   "  variant={"outline"} ><Plus size={24}/> Добавить</Button>:""}
    </div>
  );
}
