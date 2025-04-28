import { FileOutput } from "lucide-react";

import FilterSelect from "@/components/filters-ui/filter-select";
import { Button } from "@/components/ui/button";
import { useMeStore } from "@/store/me-store";

export default function Filters() {
  const { meUser } = useMeStore();

  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px] items-center  flex   ">
      {meUser?.position.role !== 4 ? (
        <>
          <FilterSelect placeholder="Все" name="news" />
          {/* <FilterSelect placeholder="Тип операции" name="news" /> */}
        </>
      ) : (
        <p className="text-[#272727] text-[20px]">Касса</p>
      )}
      <Button
        className="h-full border-l-0 border-y-0 w-[140px]  ml-auto"
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
    </div>
  );
}
