
import { Bookmark, User } from "lucide-react";
import { useQueryState } from "nuqs";
import { useNavigate } from "react-router-dom";

import { BeigeIcons, BusketIcons } from "../icons";
import { Button } from "../ui/button";

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

export default function CarpetCashierCard({className,model,size,price,discount,count,img,colaction,tags,color}:ICarpetCard) {
  return (
    <div className={`w-full flex items-center gap-4 relative p-1 rounded-[3px] bg-sidebar ${className && className}`}>
       <img style={{aspectRatio:"0.72/1"}}  src={img} width={104} height={142} alt="img"/>
       <div className="w-full px-[12px]">
            <div className="flex items-center gap-3">
                <p className="text-[18px] font-semibold text-primary">{colaction}</p>
                <p className="text-[18px] font-semibold text-primary">{model}</p>
                <p className="text-[18px] font-semibold text-primary">{size}</p>
                <p className="text-[18px] font-semibold text-primary">{price}</p>
                <p className="text-[18px] font-semibold text-primary">{count}</p>
                <p className="text-[18px] font-semibold text-[#E38157]">{discount}</p>
                <p className="text-[18px] font-semibold text-primary">{price}</p>
            </div>
            <div className="mt-3 flex items-start justify-between gap-7 mb-7">
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
                </div>
            </div>
       </div>
    </div>

  )
}
