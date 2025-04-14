import { BadgeCheck } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger,Dialog, DialogContent  } from "./ui/dialog";
import { JSX, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface Items {
  icons?: () => JSX.Element;
  title: string;
}

const CardSelect = ({title,icons}:Items)=>{
  return(
    <div className="w-[calc(50%-2px)] bg-input flex items-center justify-center flex-col rounded-[7px] text-center">
      {icons?icons():"" }
      <p className="text-primary text-[13px] font-medium  mt-2.5"> {title}</p>
    </div>
  )
}

export default function AddingParishOrFlow() { 
  const [type,setType]= useState<string>('')
  return (
        <Dialog>
          <DialogTrigger>
          <Button onClick={()=>setType('parish')} className="py-8 h-full ml-auto  text-[22px] px-11 bg-[#89A143] text-white">
            Приход
            </Button>
            <Button onClick={()=>setType('flow')} className="py-8 h-full   text-[22px] px-12 bg-[#E38157] text-white">
            Расход
            </Button>
          </DialogTrigger>
          <DialogContent  className="sm:max-w-[496px] p-1">
            <div className="flex gap-1">
              <div className="flex w-full max-w-[210px] flex-wrap gap-0.5 ">
                <CardSelect title="Инкасатсия"   icons={() => <BadgeCheck />}/>
                <CardSelect title="Инкасатсия"   icons={() => <BadgeCheck />}/>
                <CardSelect title="Инкасатсия"   icons={() => <BadgeCheck />}/>
                <CardSelect title="Инкасатсия"   icons={() => <BadgeCheck />}/>
            
              </div>
              <div className=" w-full">
                  <Input placeholder="0.00" className="w-full border-none h-[90px]  placeholder:text-[32px] text-[32px] font-semibold rounded-[7px] px-[17px] py-[26px]"/>
                  <Textarea placeholder="Комментария" className="w-full border-none focus:border-none outline-none mt-0.5 h-[90px] text-[13px] bg-input  font-semibold rounded-[7px] px-2 py-2.5"/>
              </div>
            </div>
            <Button className={`p-5 rounded-[7px] ${type == "parish"?"bg-[#89A143]":"bg-[#E38157]"}  text-white`}>Добавить в {type == "parish"?"приход":"расход"}</Button>
          </DialogContent>
        </Dialog>
  )
}
