import { FileOutput, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMeStore } from "@/store/me-store";

export default function Filters() {
  const { meUser } = useMeStore();

  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px] items-center  flex   ">
      {meUser?.position.role === 4 &&
        <p className="text-[#272727] text-[20px]">Касса</p>
      }
    
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
