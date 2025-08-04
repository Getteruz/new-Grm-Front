import { Button } from "@/components/ui/button";


export default function Conent() {
   
  return (
    <div className="h-full flex flex-col w-full border-border border-x">
      <div className="flex items-center border-border border-b h-[56px] gap-[100px] justify-center">
        <p className="text-[13px] text-[#272727] font-semibold">АВГУСТЬ  2025</p>
          <p className="text-[17px] text-[#272727] font-extrabold">NovAmoskovskiy</p>
          <p className="text-[13px] text-[#272727] font-semibold">Abbos Janizakov</p>
      </div>

      <div className="w-full max-w-[610px] mx-auto border-border border m-[20px] overflow-hidden  rounded-sm">
        <div className="flex items-center w-full border-border border-b">
            <p className="px-[23px] py-[11px] text-[#272727] text-[15px] border-border border-r font-medium">Terminal va perechisleniya savdosi</p>
            <p className="px-[23px] py-[11px] text-[#272727] text-[15px]  border-border border-r font-medium">3480 м²</p>
            <p className="px-[23px] py-[11px] text-[#272727] text-[15px] font-medium">$490.51</p>
        </div>
        <div className="flex items-center w-full border-border border-b">
            <p className="px-[23px] py-[11px] text-[#272727] text-[15px] border-border border-r font-medium">Terminal va perechisleniya savdosi</p>
            <p className="px-[23px] py-[11px] text-[#272727] text-[15px]  border-border border-r font-medium">3480 м²</p>
            <p className="px-[23px] py-[11px] text-[#272727] text-[15px] font-medium">$490.51</p>
        </div>
      </div>
      <div className="flex items-center justify-center border-border border-t mt-auto p-3">
        <Button className="w-full rounded-md max-w-[610px] bg-[#272727]">
        Добавить
        </Button>
      </div>
    </div>
  )
}
