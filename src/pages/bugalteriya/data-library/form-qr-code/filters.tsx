import { BrCodeIcons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

export default function Filters() {
  return (
    <div className="bg-sidebar border-b border-border w-full h-[64px] rounded-t-sm flex   ">
      <Button type="button" className="h-full w-1/2  border-r-1  justify-center font-[16px] gap-1  border-y-0  border-l-0" 
       variant={"outline"} > 
       <BrCodeIcons/> 
      Баркод
    </Button>
    <Button  type="button" className="h-full  w-1/2  border-r-1  justify-center font-[16px] gap-1  border-y-0  border-l-0" 
       variant={"outline"} > 
       <QrCode/> 
      Баркод
    </Button>
    </div>
  );
}
