import { Plus, SquareCheckBig } from "lucide-react";
import { useQueryState } from "nuqs";

import { DateRangePicker } from "@/components/filters-ui/date-picker-range";
import SearchInput from "@/components/filters-ui/search-input";
import { BrCodeIcons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function Filters() {
  const [type] = useQueryState("type");
  return (
    <div className="h-[64px] flex justify-between w-full bg-sidebar pr-10">
      <div className=" border-b border-border     flex   ">
        <Button
          className="h-full border-r-1  justify-center font-[16px] gap-1  border-y-0  border-l-0"
          variant={"outline"}
        >
          <BrCodeIcons />
          Баркод
        </Button>
        <SearchInput />
        <DateRangePicker
          fromPlaceholder="от: 12.02.2025"
          toPlaceholder="до: 12.02.2025"
        />
        {type !== "Out" && (
          <Button
            className="h-full border-l-1 justify-center gap-1 w-[68px] border-y-0  border-r-0"
            size={"icon"}
            variant={"outline"}
          >
            <Plus />
          </Button>
        )}
        <Button
          className="h-full border-l-1 justify-center gap-1 w-[68px] border-y-0  border-r-0"
          size={"icon"}
          variant={"outline"}
        >
          <SquareCheckBig /> 0
        </Button>
      </div>
      {type !== "Out" ? (
        <Button
          className="h-full border-x-1 border-y-0 w-[140px] "
          variant={"outline"}
        >
          Принять
        </Button>
      ) : (
        <Button className="h-full border-x-1 border-y-0  ">
          Добавить трансфер
        </Button>
      )}
    </div>
  );
}
