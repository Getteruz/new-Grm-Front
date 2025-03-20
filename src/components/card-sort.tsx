import { ChevronDown, DollarSign } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

export default function CardSort() {
  const [sorttype,setSortType]= useQueryState('sorttype',parseAsInteger.withDefault(1))
  return (
    <div className="p-4 flex gap-1">
        <div className="bg-sidebar p-5 w-full max-w-[399px]">
          <div className="flex items-center">
            <DollarSign size={54}/>
            <div>
                <p className="text-[12px] ">Итого</p>
                <p className="text-[25px] font-bold text-foreground">890.00</p>
            </div>
          </div>
          <p className="text-[12px] mt-[25px] mb-1 text-[#7E7E72]">Выбранные кол-во кассы:</p>
          <p className="text-[14px]  font-semibold">1 шт</p>
        </div>
        <div className="grid row-start w-full  gap-1  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
          {
            [1,2,3,4,5,6]?.map((e:number)=>(
              <div key={e} onClick={()=>setSortType(e)} className={`${sorttype == e ? "bg-primary text-background":"bg-sidebar text-foreground"}  cursor-pointer px-4 py-5`}>
                <p className="text-[12px]  mb-0.5  flex items text-[#7E7E72] ">Продажа <ChevronDown size={18} className="ml-3"/></p>
                <p className="text-[15px]  font-medium">120.00</p>
              </div>
            ))
          }
        </div>
    </div>  
  )
}
