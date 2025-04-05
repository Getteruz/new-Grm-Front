import FilterSelect from '@/components/filters-ui/filter-select'
import { Button } from '@/components/ui/button'
import { CircleX, SquareCheckBig, SquarePen, Tornado } from 'lucide-react'

export default function Filters() {
  return (
    <div className='w-full flex h-[40px] bg-sidebar'>
        <FilterSelect className='max-w-[426px] bg-foreground w-full' placeholder='Все операции' name='name'/>
        <Button className="h-full border-l-1 text-primary justify-center gap-1 w-[60px] border-y-0 border-r-0"  size={"icon"} variant={"outline"} > 
            <SquareCheckBig/> 0
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
