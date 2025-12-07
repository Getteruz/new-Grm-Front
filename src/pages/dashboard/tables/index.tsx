import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import RemainderTable from "./remaider/index";
import KentsTable from "./kents";
import KassaManagerTable from "./kassaManager";
import DilerTable from "./deller";
import ExpenseTable from "./expense";
import ProfitTable from "./profit";
import SaleTable from "./saleTable";
import SalesDebtTable from "./saleDebtTable";

const componetObject = {
  "Остатка": RemainderTable,
  "Кенты":KentsTable,
  "Полученные кассовые деньги":KassaManagerTable,
  "Р/с":KassaManagerTable,
  "Дилер":DilerTable,
  "Прибыль":ProfitTable,
  "Расход":ExpenseTable,
  "Продажа":SaleTable,
  "Продажа в долг":SalesDebtTable
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
      <SheetContent className="min-w-[680px] gap-0">
        <SheetHeader>
          <SheetTitle className="mx-4">{openType}</SheetTitle>
        </SheetHeader>

        { openType ? componetObject[openType as keyof typeof componetObject]?.() : "" }
      </SheetContent>
    </Sheet>
  );
}
