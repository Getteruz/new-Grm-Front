import { BadgePercent, Gift, Tag, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/filters-ui/search-input";

export default function Filters() {

  return (
    <div className=" flex justify-between px-[20px] h-[64px] mb-3">
      <div className="flex  gap-2 ">
        <SearchInput className="w-full min-w-[200px]"/>
        <Button
          className="h-full   px-[50px] w-full max-w-[160px]"
          variant="secondary"
        >
          <Tag />
          Цены
        </Button>
        <Button
          variant="secondary"
          className="h-full  px-[50px] w-full max-w-[160px]"
        >
          <BadgePercent />
          Скидки
        </Button>
        <Button
          variant="secondary"
          className="h-full   px-[50px] w-full max-w-[160px]"
        >
          <Gift />
          Акции
        </Button>
        <Button
          variant="secondary"
          className="h-full  px-[50px] w-full max-w-[160px]"
        >
          <Tag />
          Бонусы
        </Button>
        <Button
          variant="secondary"
          className="h-full  px-[50px] w-full max-w-[160px]"
        >
          <Ticket />
          Промокоды
        </Button>
      </div>
    </div>
  );
}
