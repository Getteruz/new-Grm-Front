import CheckList from "@/components/check";
import { Button } from "@/components/ui/button";

export default function Pricecheck() {
  return (
    <div className="w-full bg-card max-w-[312px] flex flex-col justify-between  h-[calc(100vh-90px)] pt-[23px] ">
        <div className="w-full  h-[calc(100vh-260px)]  overflow-y-scroll px-5">
            <p className="text-primary text-[14px] font-medium">Итого:</p>
            <p className="text-primary font-bold text-[28px] mt-0.5 mb-[27px]">342.90 $</p>
            <div className="bg-background flex items-center  text-primary justify-between p-5 mb-[1px]">
                <p className="text-[14px] font-semibold ">Cкидка:</p>
                <p className="text-[28px] font-semibold">- 38.1</p>
                <p className="text-[14px] font-semibold mt-2.5 text-[#E38157]">-7.8%</p>
            </div>  
            <div className="bg-background flex items-center text-primary justify-between p-5 mb-2">
                <p className="text-[14px] font-semibold ">Промокод:</p>
                <p className="text-[28px] font-semibold">~</p>
            </div> 

            <CheckList title="Sanat Hali"/> 
        </div>
        <div className="w-full">
            <Button className="w-full py-10.5 p-10 bg-primary mt-auto text-background text-[22px] font-semibold " >Подтвердить продажу</Button>
            <div className="flex items-center text-primary justify-between px-4 py-2">
                <p className="text-[14px] font-medium">12 Mart. 2025</p>  
                <p className="text-[14px] font-medium">08:32</p>  
            </div>
        </div>
    </div>
  )
}
