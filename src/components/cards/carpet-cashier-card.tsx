
import {   FileOutput, MoreVertical, OctagonX } from "lucide-react";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { IData } from "@/pages/cashier/home/type";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useMeStore } from "@/store/me-store";
import { UpdatePatchData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

interface ICarpetCard {
    id:string;
    className?:string;
    model:string;
    size:string;
    count:string;
    img:string;
    price:string;
    priceMitr:string;
    color:string;
    colaction:string;
    discount:string;
    tags:string[];
    status?:string;
    onCheckedChange:(e: boolean)=>void;
    seller:IData["seller"];
}

export default function CarpetCashierCard({className,onCheckedChange,id,status,seller,priceMitr,model,size,price,discount,count,img,colaction,tags}:ICarpetCard) {
    const {meUser} = useMeStore()
    const queryClient = useQueryClient();

    const AccepedFunt = ()=>{
        UpdatePatchData(apiRoutes.order+ "/isActive", id ,{})
        .then(()=>{
            toast.success('Подтверждено успешно')
            queryClient.invalidateQueries({ queryKey: [apiRoutes.orderByKassa] });
        })
        .catch(()=>toast.error("что-то пошло не так"))
    }
    const RejectFunt = (type:string)=>{
        UpdatePatchData(apiRoutes.order+ `/${type}`, id ,{})
        .then(()=>{
            if(type== "reject"){
                toast.error('Успешно отменено')
            }else{
                toast.success('Успешно возвращено') 
            }
            queryClient.invalidateQueries({ queryKey: [apiRoutes.orderByKassa] });
        })
        .catch(()=>toast.error("что-то пошло не так"))
    }
  return (
    <label className={`w-full flex  gap-4 relative p-1 rounded-[3px] bg-sidebar ${className && className}`}>
        <Checkbox  onCheckedChange={onCheckedChange}className="absolute data-[state=checked]:bg-[#89A143] data-[state=checked]:border-[#89A143] w-[20px] h-[20px] rounded-full bg-background top-2 left-2 " />
       <img className="object-cover" style={{aspectRatio:"0.72/1"}}  src={img} width={102.5} height={140} alt="img"/>
       <div className="w-full pt-[20px] px-[12px]">
            <div className="flex items-center flex-wrap gap-3">
                <p className="text-[18px] font-semibold text-[#5D5D53]">{colaction}</p>
                <p className="text-[18px] font-semibold text-[#5D5D53]">{model}</p>
                <p className="text-[18px] font-semibold text-[#5D5D53]">{size}</p>
                <p className="text-[18px] font-semibold text-[#5D5D53]">{priceMitr}</p>
                <p className="text-[18px] font-semibold text-[#5D5D53]">{count}</p>
                <p className="text-[18px] font-semibold text-[#E38157]">{discount}</p>
                <p className="text-[18px] font-semibold text-[#5D5D53]">{price}</p>
            </div>
            <div className="mt-[14px] flex  items-start justify-between gap-7 mb-7">
                <div className="flex w-full gap-[4px] flex-wrap">
                    {
                        tags?.map((e)=>(
                            <p key={e} className={'inline-block text-[##F0F0E5] text-[12px] font-light border-border border rounded-[70px] px-2.5 py-1'}>{e}</p>
                        ))
                        
                    }
                </div>
                <div className="flex gap-1 items-center">
                   {
                seller &&
                    <Avatar className="w-[40px] h-[40px]">
                    <AvatarFallback className="bg-primary text-white w-[40px] flex items-center justify-center h-[40px]">{seller?.firstName?.[0]} {seller?.lastName?.[0]}</AvatarFallback>
                </Avatar>
                   }
                        {
               status != "progress" &&  meUser &&
                    <Avatar className="w-[40px] h-[40px]">
                     <AvatarFallback className="bg-primary text-white w-[40px] flex items-center justify-center h-[40px]">{meUser?.firstName?.[0]} {meUser?.lastName?.[0]}</AvatarFallback>
                    </Avatar>
                   }
                   { status == "progress"?
                    <Button   onClick={()=>AccepedFunt()} className="rounded-[70px] p-[14px] h-10 text-white bg-[#89A143]">Подтвердить</Button>:
                        <Button 
                         className={`${status == "rejected"?"text-[#E38157] border-[#E38157]": status == "accepted"?"text-[#89A143] border-[#89A143]":"text-primary border-primary"} rounded-[70px] p-[14px] h-10 `}
                          variant={'outline'}
                          >{status}
                        </Button>
                   }

                    
                  {status == "rejected" ||status == "canceled"? ""  :  <DropdownMenu >
                        <DropdownMenuTrigger className="text-end" asChild>
                        <Button className="w-10 h-10 rounded-full text-[#5D5D53] bg-white">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-[206px]" align="end">
                        <DropdownMenuItem className="text-center flex items-center justify-center pt-[14px] pb-[8px]">
                        { status === "progress"? <div onClick={()=>RejectFunt('reject')} className="w-full text-center">
                            <OctagonX size={28} width={28} height={28} className="w-[28px] m-auto h-[28px] text-[#EC6C49]"/>
                            <p className="text-[#EC6C49] text-[13px]">Отменить</p>
                         </div>:<div  onClick={()=>RejectFunt('return')}  className="w-full text-center">
                            <FileOutput size={28} width={28} height={28} className="w-[28px] m-auto h-[28px] text-[#EC6C49]"/>
                            <p className="text-[#EC6C49] text-[13px]">Возрат</p>
                         </div>}
                        </DropdownMenuItem>                        
                        
                        </DropdownMenuContent>
                    </DropdownMenu>}
                </div>
            </div>
            <div className="flex items-center justify-end gap-2 text-[10px] text-[#5D5D53]">
                <p>Продажа</p>
                <p>10:37</p>
            </div>
       </div>
    </label>

  )
}
