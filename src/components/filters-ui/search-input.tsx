import { Loader, Search } from 'lucide-react'
import { Input } from '../ui/input'
import debounce from '@/utils/debounce'
import { useQueryState } from 'nuqs'

export default function SearchInput() {
    const [,setSearch] = useQueryState("search")
  return (
    <div className='flex items-center px-2.5 gap-1'>
        <Search size={16} />
        <Input 
           onChange={debounce((e)=>{
            setSearch(e.target.value)
           },500)}
         className='bg-transparent p-0  border-none'  placeholder='search'/>
        <Loader  size={16}  />
    </div>
  )
}
