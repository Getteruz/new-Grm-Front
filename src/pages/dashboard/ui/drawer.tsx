import FilterSelect from "@/components/filters-ui/filter-select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function SheetDashboar({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;

}) {
  return (
    <Sheet  open={open} onOpenChange={onOpenChange}>
      <SheetContent className="min-w-[680px]">
        <SheetHeader>
          <SheetTitle>Продажа</SheetTitle>
        </SheetHeader>
        <div className="flex gap-1">
          <FilterSelect
            className="  w-full bg-[#333333] text-white placeholder:text-white "
            options={[{ label: "Филиал", value: "new" }]}
            defaultValue="new"
            placeholder="Филиал"
            name="name"
          />
          <FilterSelect
            className=" p-2 border-border border w-full  placeholder:text-white "
            options={[{ label: "Тип продаж", value: "new" }]}
            defaultValue="new"
            placeholder="Тип продаж"
            name="name"
          />
          <FilterSelect
            className="  p-2 border-border border w-full  placeholder:text-white "
            options={[{ label: "Месяц", value: "new" }]}
            defaultValue="new"
            placeholder="Месяц"
            name="name"
          />
        </div>
        <div className="bg-[#EEEEEE] flex">
            <p className=" p-[25px] border-border border-r  text-[17px] w-full">Итого</p>
            <p className=" p-[25px] border-border border-r  text-[17px] w-full">86 286 $ м²</p>
            <p className=" p-[25px] border-border border-r  text-[17px] w-full">6 927м²</p>
            <p className=" p-[25px]  text-[17px] w-full">489 шт</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
