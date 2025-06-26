import { FileOutput } from "lucide-react";

import { Button } from "@/components/ui/button";


export default function Filters() {

  return (
    <div className="bg-sidebar border-border border-b  px-[20px] h-[64px] items-center  flex   ">
        <p className="text-[#272727] text-[20px]">Касса магазина</p>
      
      <Button
        className="h-full  border-y-0 w-[140px]  ml-auto"
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
    
    </div>
  );
}
