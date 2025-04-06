
import {   MoreVertical, User } from "lucide-react";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

interface ICarpetCard {
    id:string;
    className?:string;
    model:string;
    size:string;
    count:string;
    img:string;
    price:string;
    color:string;
    colaction:string;
    discount:string;
    tags:string[];
}

export default function CarpetCashierCard({className,model,size,price,discount,count,img,colaction,tags}:ICarpetCard) {
  return (
    <label className={`w-full flex  gap-4 relative p-1 rounded-[3px] bg-sidebar ${className && className}`}>
        <Checkbox  className="absolute bg-background top-2 left-2 " />
       <img className="object-cover" style={{aspectRatio:"0.72/1"}}  src={img} width={104} height={142} alt="img"/>
       <div className="w-full px-[12px]">
            <div className="flex items-center flex-wrap gap-3">
                <p className="text-[18px] font-semibold text-primary">{colaction}</p>
                <p className="text-[18px] font-semibold text-primary">{model}</p>
                <p className="text-[18px] font-semibold text-primary">{size}</p>
                <p className="text-[18px] font-semibold text-primary">{price}</p>
                <p className="text-[18px] font-semibold text-primary">{count}</p>
                <p className="text-[18px] font-semibold text-[#E38157]">{discount}</p>
                <p className="text-[18px] font-semibold text-primary">{price}</p>
            </div>
            <div className="mt-3 flex  items-start justify-between gap-7 mb-7">
                <div className="flex w-full gap-[1px] flex-wrap">
                    {
                        tags?.map((e)=>(
                            <p key={e} className={'inline-block text-primary text-[12px] border-border border rounded-[70px] px-2.5 py-1'}>{e}</p>
                        ))
                        
                    }
                     {
                        tags?.map((e)=>(
                            <p key={e} className={'inline-block text-primary text-[12px]  border-border border rounded-[70px] px-2.5 py-1'}>{e}</p>
                        ))
                        
                    }
                     {
                        tags?.map((e)=>(
                            <p key={e} className={'inline-block text-primary text-[12px]  border-border border rounded-[70px] px-2.5 py-1'}>{e}</p>
                        ))
                        
                    }
                </div>
                <div className="flex gap-1 items-center">
                     <User/>
                     <Button className="rounded-[70px] p-[14px] h-10 text-[#89A143] border-[#89A143]" variant={'outline'}>Подтверждено</Button>

                     <Button className="w-10 h-10 rounded-full text-primary bg-white">
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="flex items-center justify-end gap-2 text-[10px] text-primary">
                <p>Продажа</p>
                <p>10:37</p>
            </div>
       </div>
    </label>

  )
}
