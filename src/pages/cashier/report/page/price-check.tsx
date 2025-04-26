import { Button } from "@/components/ui/button";

export default function Pricecheck() {
  return (
    <div className="w-full bg-card max-w-[312px] flex flex-col justify-between h-[calc(100vh-90px)] p-[20px]">
      <div className="w-full max-w-md bg-[#f8f6e9] text-[#5D5D53] p-5 mx-auto font-sans">
      {/* Header */}
      <h1 className="text-[18px] text-center text-[#5D5D53] mb-1">Sanat Hali</h1>
      <p className="text-center text-[#5D5D53] text-[10px] mb-6">Вс, Май 5, 2024 • 20:07:53</p>
      
      {/* Payment Method */}
      <div className="flex justify-between mb-2">
        <span className="text-[#5D5D53] text-[11px]">Способ оплаты</span>
        <span className="text-[#5D5D53] text-[11px]">Наличие</span>
      </div>
      
      {/* First Divider */}
      <div className="w-full border-t border-dashed border-gray-400 my-3"></div>
      
      {/* Items Section */}
      <div className="mb-4">
        <div className="flex justify-between mb-6">
          <span className="text-[#5D5D53] text-[11px]">Магазин расход</span>
          <span className="text-[#5D5D53] text-[11px]">-189.00$</span>
        </div>
      </div>
      
      {/* Total Section */}
      <div className="flex justify-between mb-2">
        <span className="text-[#5D5D53] text-[14px] font-medium">Итого</span>
        <span className="text-[#5D5D53] text-[14px] font-medium">-189.00$</span>
      </div>
      
      {/* Second Divider */}
      <div className="w-full border-t border-dashed border-gray-400 my-3"></div>
      
      {/* Personnel Information */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-[#5D5D53] text-[14px]">Кассир:</span>
          <span className="text-[#5D5D53] text-[14px]">Shaxboz Samadov</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-[#5D5D53] text-[14px]">Продавец:</span>
          <span className="text-[#5D5D53] text-[14px]">Abbos Janizakov</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-[#5D5D53] text-[14px]">Адресс:</span>
          <span className="text-[#5D5D53] text-[14px] text-right">г.Ташкент, ул.Фарабий 1 дом</span>
        </div>
      </div>
      
      {/* Third Divider */}
      <div className="w-full border-t border-dashed border-gray-400 my-3"></div>
      
      <p className="text-[#5D5D53] text-[10px]">Arenda uchun fevral oyiga to'lov</p>
      </div>
      <div className="w-full mt-8">
       
        
        <Button className="w-full py-10.5 p-10 bg-primary mt-auto text-background text-[22px] font-semibold">
          Подтвердить продажу
        </Button>
        
        <div className="flex items-center text-primary justify-end px-4 py-2">
          <p className="text-[14px] font-medium mr-3">12 Mart. 2025</p>
          <p className="text-[14px] font-medium">08:32</p>
        </div>
      </div>
    </div>
  );
}