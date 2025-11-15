import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import RemainderTable from "./remaider";
import KentsTable from "./kents";
import KassaManagerTable from "./kassaManager";

const componetObject = {
  "Остатка": RemainderTable,
  "Кенты":KentsTable,
  "Маруф касса":KassaManagerTable,
}
export function SheetDashboar({
  openType,
  onOpenChange,
}: {
    openType: string | null;
  onOpenChange: (value: boolean) => void;
}) {
  
  return (
    <Sheet  open={Boolean(openType)} onOpenChange={onOpenChange}>
      <SheetContent className="min-w-[680px]">
        <SheetHeader>
          <SheetTitle>{openType}</SheetTitle>
        </SheetHeader>

        { openType ? componetObject[openType as keyof typeof componetObject]?.() : "" }
      </SheetContent>
    </Sheet>
  );
}
