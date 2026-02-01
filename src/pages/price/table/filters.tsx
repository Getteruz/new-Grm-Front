import { BadgePercent, Gift, Tag, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/filters-ui/search-input";

export default function Filters() {

  return (
    <div className=" flex justify-between px-[20px] h-[64px] mb-3">
      <div className="flex  w-full gap-2 ">
        <SearchInput className="min-w-[300px]" />
        <div className="bg-white flex gap-2 p-0.5 w-full rounded-[16px]">
          <Button
            className="h-full  bg-white w-full max-w-[120px]"
            variant="secondary"
          >
            <Tag />
            Цены
          </Button>

          <Button
            variant="secondary"
            className="h-full  bg-white w-full max-w-[120px]"
          >
            <Gift />
            Акции
          </Button>

          <Button
            variant="secondary"
            className="h-full bg-white w-full max-w-[120px]"
          >
            <Tag />
            Бонусы
          </Button>
          <Button
            variant="secondary"
            className="h-full bg-white w-full max-w-[120px]"
          >
            <Ticket />
            Промокоды
          </Button>
          <Button
            variant="secondary"
            className="h-full bg-white w-full max-w-[120px]"
          >
            <BadgePercent />
            Скидки
          </Button>
        </div>
      </div>
    </div>
  );
}
