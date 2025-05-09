import { format } from "date-fns";

import { Button } from "@/components/ui/button";

export default function Pricecheck() {
  return (
    <div className="w-full bg-card max-w-[312px] h-[calc(100vh-130px)] flex flex-col justify-between  p-[10px] pt-0 sticky top-10">
      <div></div>
      <div className="w-full mt-8">
        <div className="flex items-center text-primary justify-end px-4 py-2">
          <p className="text-[14px] font-medium mr-3 ">
            {format(new Date(), "dd-MMMM. yyyy")}
          </p>
          <p className="text-[14px] font-medium">
            {" "}
            {format(new Date(), "hh:mm")}
          </p>
        </div>
        <Button className="w-full py-10.5 p-10 bg-primary mt-auto text-background text-[22px] font-semibold">
          Закрыть кассу
        </Button>
      </div>
    </div>
  );
}
