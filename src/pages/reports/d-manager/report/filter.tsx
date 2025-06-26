import FilterSelect from "@/components/filters-ui/filter-select";
import { UfoBottom } from "@/components/icons";
import { Button } from "@/components/ui/button";
import useDataFetch from "@/pages/deller/table/queries";
import { FileOutput, X } from "lucide-react";


export default function Filters() {

  const { data } =
  useDataFetch({
    queries: {
      limit:10,
      page:1,
      type: "dealer",
    },
  });
const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <div className="bg-sidebar border-border border-b  px-[20px] h-[64px] items-center  flex   ">
      <div className="w-full max-w-[150px]">
      <FilterSelect
            options={flatData?.map(e=>{
              return {
                label:e.title,
                value:e.id
              }
            }) || []}
            icons={ <>
              <UfoBottom />
            </>}
            placeholder="Дилеры"
            name="dealer"
            className="max-w-[150px]"
          
          />
      </div>
      <Button
        className="h-full  border-y-0 w-[140px]  ml-auto"
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>
      <Button
        className="h-full border-l-0 bg-primary hover:bg-[#525248] hover:text-accent text-accent border-y-0 w-[165px]  "
        variant={"outline"}
      >
        <X /> Закрыть кассу
      </Button>
    </div>
  );
}
