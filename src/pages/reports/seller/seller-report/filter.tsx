import FilterSelect from "@/components/filters-ui/filter-select";
import { Button } from "@/components/ui/button";
import { getMonth } from "date-fns";
import { FileOutput, Store } from "lucide-react";
import useDataFetch from "@/pages/filial/table/queries";
import { useMeStore } from "@/store/me-store";

const monthsArray = [
  { label: "Январь", value: "1" },
  { label: "Февраль", value: "2" },
  { label: "Март", value: "3" },
  { label: "Апрель", value: "4" },
  { label: "Май", value: "5" },
  { label: "Июнь", value: "6" },
  { label: "Июль", value: "7" },
  { label: "Август", value: "8" },
  { label: "Сентябрь", value: "9" },
  { label: "Октябрь", value: "10" },
  { label: "Ноябрь", value: "11" },
  { label: "Декабрь", value: "12" }
]
export default function Filters() {
  const { data } = useDataFetch({
    queries: { type: "filial", limit: 50 },
  });
  const filialOption =
    data?.pages[0]?.items?.map((e) => ({
      label: e?.name,
      value: e?.id,
    })) || [];
    const {meUser}= useMeStore()
  return (
    <div className="bg-sidebar border-border border-b  px-[20px] h-[64px] items-center  flex   ">
      <p className="text-[#272727] text-[20px] mr-auto">Отчёт по сотрудикам </p>
      {meUser?.position?.role != 4 &&  <FilterSelect
            placeholder="все"
            className="w-[200px] h-[65px] border-border pl-4  border-l"
            options={[{ value: "clear", label: "все" }, ...filialOption]}
            name="filial"
            icons={
              <>
                <Store />
              </>
            }
          />}
      <FilterSelect 
        options={monthsArray}
        defaultValue={getMonth(new Date()) + 1 + ""  }
        name="month"
        className="w-[160px] px-2 h-[64px]  border-l"
      />

    
     
      <Button className="h-full  border-y-0 w-[140px] " variant={"outline"}>
        <FileOutput /> Экспорт
      </Button>
    </div>
  );
}
