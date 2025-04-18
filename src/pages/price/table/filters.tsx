import { BadgePercent, Gift, Tag, Ticket } from "lucide-react";

import Statistics from "@/components/filters-ui/statistics";
import { Button } from "@/components/ui/button";

export default function Filters() {
  return (
    <div className="bg-sidebar border-border border-b  flex justify-between px-[51px] h-[64px]     ">
      <div className="flex  ">
        <Button className="h-full px-[50px] w-full max-w-[160px]">
          <Tag />
          Цены
        </Button>
        <Button
          variant={"outline"}
          className="h-full border-y-0 px-[50px] w-full max-w-[160px]"
        >
          <BadgePercent />
          Скидки
        </Button>
        <Button
          variant={"outline"}
          className="h-full border-y-0 px-[50px] w-full max-w-[160px]"
        >
          <Gift />
          Акции
        </Button>
        <Button
          variant={"outline"}
          className="h-full border-y-0 px-[50px] w-full max-w-[160px]"
        >
          <Tag />
          Бонусы
        </Button>
        <Button
          variant={"outline"}
          className="h-full border-y-0 px-[50px] w-full max-w-[160px]"
        >
          <Ticket />
          Промокоды
        </Button>
        <Statistics />
      </div>
    </div>
  );
}
