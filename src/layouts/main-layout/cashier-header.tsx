import AddingParishOrFlow from "@/components/adding-parish-flow";

import { BellRing, DollarSign, StickyNote, User } from "lucide-react";

export default function CashierHeader() {
  return (
    <header className="h-[90px] bg-sidebar border-b border-border flex items-center ">
          <div className="flex p-[15px] mr-auto items-center">
            <DollarSign className="text-primary" size={54}/>
            <div>
                <p className="text-[12px] ext-primary ">Касса за сегодня:</p>
                <p className="text-[25px] font-bold text-primary">890.00</p>
            </div>
          </div>

          <AddingParishOrFlow/>
      
       <div className="flex items-center w-full max-w-[312px] gap-5 px-10">
          <div className="flex text-primary items-center gap-[5px]">
            {/* <RinigIcons/> */}
            <p className="text-[25px] leading-[30px] text-primary relative">
              13
              <span className="text-[8px] leading-[12px] text-foreground absolute -top-[2px] -right-[2px]">
                ° C
              </span>
            </p>
          </div>
          <div>
          <StickyNote className="text-primary w-4 h-4" />
          </div>
          <div>
          <BellRing className="text-primary w-4 h-4" />
          </div>
          <div>
            <User/>
          </div>
       </div>
    </header>
  )
}
