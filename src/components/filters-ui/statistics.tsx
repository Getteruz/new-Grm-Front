import { SquareCheckBig } from "lucide-react";

export default function Statistics() {
  return (
    <div className="border-border p-5 flex gap-4 items-center border-x h-full border-solid">
        <p className="flex text-[14px] items-center gap-1 opacity-40"> <SquareCheckBig size={16}/> Найдено:</p>
        <p className="text-[14px] text-foreground">126 шт</p>
        <p className="text-[14px] text-foreground">126 шт</p>
        <p className="text-[14px] text-foreground">126 шт</p>
    </div>
  )
}
