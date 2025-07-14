import { Plus } from "lucide-react";
import { useQueryState } from "nuqs";

import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";

export default function Filters() {
  const [, setId] = useQueryState("id");
  return (
    <div className="bg-sidebar border-border border-b  px-[20px] h-[64px]   flex   ">
      <SearchInput className="mr-auto w-full" />
      <Button
        onClick={() => setId("new")}
        className="h-full w-[160px]  border-y-0   "
        variant={"outline"}
      >
        <Plus size={24} /> Добавить
      </Button>
    </div>
  );
}
