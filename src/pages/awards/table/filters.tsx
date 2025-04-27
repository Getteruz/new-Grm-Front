// table/filters.tsx
import { Plus, Trash2 } from "lucide-react";
import { useQueryState } from "nuqs";

import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";

export default function Filters() {
  const [, setId] = useQueryState("id");
  
  return (
    <div className="bg-sidebar border-border border-b px-6 h-[64px] flex items-center">
      <SearchInput className="mr-auto w-64" />
      
      <div className="flex ml-auto">
        <Button variant="outline" className="mr-2">
          <Trash2 className="h-4 w-4" />
        </Button>
        <Button onClick={() => setId("new")}>
          <Plus className="mr-2 h-4 w-4" /> Добавить
        </Button>
      </div>
    </div>
  );
}