import FilterSelect from '@/components/filters-ui/filter-select'
import { Button } from '@/components/ui/button'
import { CircleX, SquareCheckBig, SquarePen, Tornado } from 'lucide-react'
const Sort = [
    {
        label:"Все",
        value:"all"
    },
    {
        label:"Все закрытые кассы",
        value:"progress"
    },
    {
        label:"Подтверждённые",
        value:"accepted"
    },
    {
        label:"Отменённые",
        value:"rejected"
    },
    {
        label:"Возвращённые",
        value:"canceled"
    },
]
export default function Filters({countLength}:{countLength:number}) {
  return (
    <div className='w-full sticky top-0 flex h-[40px] bg-sidebar'>
        <FilterSelect 
            options={Sort}
            className='max-w-[426px] bg-primary text-[#E6E6D9]  w-full'
            classNameValue='bg-red-200'
            placeholder='Все операции' 
            classNameContainer="bg-primary text-[#E6E6D9]"
            classNameItem="bg-[#5D5D53CC] hover:bg-[#5D5D53CC]"
            defaultValue='all'
            name='sort'
        />
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
  )
}
