import { Download, Printer, Share2 } from "lucide-react";
import { Button } from "./ui/button";

export default function BarcodeQenerat() {
  return (
    <div className="w-full">
        <div className="bg-sidebar border-y border-border  h-[64px] rounded-t-sm flex   ">
            <Button type="button" className="h-full w-1/2 border-r-1 text-primary  justify-center font-[16px] gap-1.5  border-y-0  border-l-0" 
            variant={"outline"} > 
            Штрих-код
            </Button>
            <Button type="button" className="h-full  w-1/2  border-r-1 text-primary justify-center font-[16px] gap-1.5  border-y-0  border-l-0" 
            variant={"outline"} > 
            QR-код
            </Button>
        </div>
        <div className="p-20">
            code
        </div>
        <div className="bg-sidebar border-y text-primary border-border  h-[44px] rounded-t-sm flex   ">
            <Button type="button" className="h-full border-r-1 w-1/3 justify-center font-[16px] gap-1  border-y-0  border-l-0" 
            variant={"outline"} > 
            <Share2 size={16}/>
            Поделится
            </Button>
            <Button type="button" className="h-full w-1/3 border-r-1 text-primary justify-center font-[16px] gap-1.5  border-y-0  border-l-0" 
            variant={"outline"} > 
            <Printer  size={16}/>
           Распечатать
            </Button>
            <Button type="button"  className="h-full w-1/3 border-r-1 text-primary justify-center font-[16px] gap-1.5  border-y-0  border-l-0" 
            variant={"outline"} > 
            <Download   size={16}/>
            Скачать
            </Button>
        </div>
    </div>
  )
}
