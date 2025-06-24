import { FileOutput, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMeStore } from "@/store/me-store";
import FilterSelect from "@/components/filters-ui/filter-select";
import useDataFetch from "@/pages/filial/table/queries";
import { useQueryState } from "nuqs";
import { DateRangePicker } from "@/components/filters-ui/date-picker-range";

export default function Filters() {
  const { meUser } = useMeStore();
  const { data } = useDataFetch({
    queries: { type: "filial", limit: 50 },
  });
  const [id] = useQueryState("id");
  const filialOption =
    data?.pages[0]?.items?.map((e) => ({
      label: e?.name,
      value: e?.id,
    })) || [];

  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px] items-center  flex   ">
      {meUser?.position.role === 4 && (
        <p className="text-[#272727] text-[20px]">Касса магазина</p>
      )}
      {meUser?.position?.role == 10 || (meUser?.position?.role == 9 && !id) ? (
        <>
          <FilterSelect
            placeholder="все"
            className="w-[200px] h-[65px] border-border border-r"
            options={[{ value: "clear", label: "все" }, ...filialOption]}
            name="filial"
            icons={ <Store /> }
          />
          <FilterSelect
              className="w-[200px]  h-[65px] ml-2  border-border border-r"
            placeholder="Тип операции"
            options={[
              { value: "clear", label: "Все" },
              { value: "income", label: "Приход" },// Приход cashflow
              { value: "expense", label: "Расход" },// Расход cashflow
              { value: "sale", label: "Продажа" },// Приход order
              { value: "return", label: "Возврат" },// Расход order
              { value: "collection", label: "Инкассация" },// cashflowSlug => Инкассация
            ]} 
            name="tip"
          />
            <DateRangePicker
              fromPlaceholder={`от`}
              toPlaceholder={`до`}
            />
        </>   
      ) : (
        ""
      )}
      <Button
        className="h-full  border-y-0 w-[140px]  ml-auto"
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
      {/* <Button
        className="h-full border-l-0 bg-primary hover:bg-[#525248] hover:text-accent text-accent border-y-0 w-[165px]  "
        variant={"outline"}
      >
        <X /> Закрыть кассу
      </Button> */}
    </div>
  );
}
