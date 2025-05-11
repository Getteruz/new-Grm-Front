import { CircleX, SquareCheckBig, SquarePen, Tornado } from "lucide-react";

import FilterSelect from "@/components/filters-ui/filter-select";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
const Sort = [
    {
        label:"Открытый",
        value:"open"
    },
    {
        label:"В ожидание подтверждения",
        value:"closed_by_c"
    },
    {
        label:"Подтверждённые",
        value:"accepted"
    },
    {
        label:"Отменённые",
        value:"rejected"
    },
]

const SortSingle = [
    {
        label:"Все",
        value:"Все"
    },
    {
        label:"Расход",
        value:"Расход"
    },
    {
        label:"Приход",
        value:"Приход"
    },
]
export default function Filters({countLength}:{countLength:number}) {
    const [id] = useQueryState(
        "id"
      );
  return (
    <div className='w-full  sticky top-0 flex h-[40px] bg-sidebar'>
       {
            id?  <FilterSelect 
            options={SortSingle}
            className='max-w-[426px] bg-primary text-[#E6E6D9]  w-full text-[20px]'
            classNameValue='bg-red-200'
            placeholder='Все операции' 
            classNameContainer="bg-primary text-[#E6E6D9]"
            classNameItem="bg-[#5D5D53CC] hover:bg-[#5D5D53CC] p-4 text-[20px]"
            defaultValue='Все'
            name='sortSingle'
            />: <FilterSelect 
            options={ Sort}
            className='max-w-[426px] bg-primary text-[#E6E6D9]  w-full text-[20px]'
            classNameValue='bg-red-200'
            placeholder='Все операции' 
            classNameContainer="bg-primary text-[#E6E6D9]"
            classNameItem="bg-[#5D5D53CC] hover:bg-[#5D5D53CC] p-4 text-[20px]"
            defaultValue='open'
            name='sort'
        />
       }
        <Button className="h-full border-l-1 text-primary justify-center gap-1 w-[60px] border-y-0 border-r-0"  size={"icon"} variant={"outline"} > 
            <SquareCheckBig/>{countLength}
        </Button>
        <Button className="h-full border-l-1 text-primary justify-center gap-1 w-[60px] border-y-0 border-r-0"  size={"icon"} variant={"outline"} > 
            <CircleX/> 
        </Button>
        <Button className="h-full border-l-1 text-primary justify-center gap-1 w-[60px] border-y-0 border-r-0"  size={"icon"} variant={"outline"} > 
            <SquarePen/> 
        </Button>
        <Button className="h-full  border-l-1 text-primary justify-center gap-1 px-4 border-y-0 border-r-0" variant={"outline"} > 
            <Tornado/> 
            Фильтр
        </Button>
    </div>
  );
}
