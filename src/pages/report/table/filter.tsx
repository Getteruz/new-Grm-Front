import { FileOutput, X } from "lucide-react";

import FilterSelect from "@/components/filters-ui/filter-select";
import { Button } from "@/components/ui/button";
import { useMeStore } from "@/store/me-store";
import { UfoBottom } from "@/components/icons";

export default function Filters({
  filterDieller = true,
}: {
  filterDieller?: boolean;
}) {
  const { meUser } = useMeStore();

  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px] items-center  flex   ">
      {meUser?.position.role === 4 && (
        <p className="text-[#272727] text-[20px]">Касса</p>
      )}
      {filterDieller && (
        <FilterSelect
          placeholder="Выберите дилера"
          name="dieller"
          options={[
            {
              label: "Все",
              value: "all",
            },
          ]}
          icons={<UfoBottom />}
        />
      )}
      <Button
        className="h-full  border-y-0 w-[140px]  ml-auto"
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
      <Button
        className="h-full border-l-0 bg-primary hover:bg-[#525248] hover:text-accent text-accent border-y-0 w-[165px]  "
        variant={"outline"}
      >
        <X /> Закрыть кассу
      </Button>
    </div>
  );
}
