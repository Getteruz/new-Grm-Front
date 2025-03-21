import { TSelectOption } from "@/types"
import { parseAsString, useQueryState } from "nuqs";

interface iTabsFilter {
    options:TSelectOption[];
    name:string
}
export default function TabsFilter({options,name}:iTabsFilter) {
    const [tab,setTab] = useQueryState(name,parseAsString.withDefault(options?.[0]?.value))
  return (
    <div className="flex bg-background border-border border">
        {options?.map((e:TSelectOption)=>(
            <p className={`${tab == e?.value? "bg-primary text-sidebar":"" } text-[] px-4 border-r border-border py-2.5 text-foreground cursor-pointer`} onClick={()=>setTab(e?.value)} key={e?.value}>
                {e?.label}
            </p>
        ))}
    </div>
  )
}
