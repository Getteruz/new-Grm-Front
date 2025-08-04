import {  FileInput, Printer } from "lucide-react";

export default function RightConent() {
  return (
    <div className="w-[380px] h-full">
      <p className="border-b mt-auto h-[56px] px-[31px] text-[#272727] py-[18px] border-border">
      Годовой отчет
      </p>

      <div className="p-[24px] text-[#272727]">
        <div className="flex items-center py-[13px] px-[23px] rounded-sm bg-white text-[16px] font-normal gap-1">
        <FileInput size={20}/>  Экспорт в  Excel
        </div>  

        <div className="flex mt-2 items-center py-[13px] px-[23px] rounded-sm bg-white text-[16px] font-normal gap-1">
        <Printer size={20}/> Распечатать
        </div> 
      </div>
    </div>
  )
}
