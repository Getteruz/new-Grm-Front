import DashboardCard from '@/components/cards/dashboard-card'
import { DollarSign, Italic } from 'lucide-react'
import { ReportsHomePageCurrentLeftData } from '../types'

export default function Cards({leftData,setOpen}:{leftData:ReportsHomePageCurrentLeftData|undefined,setOpen:(value:string)=>void}) {
  return (
    <div className="w-full ">
    <h3 className="text-[72px] ml-[13px]">{leftData?.totals?.total_sum} $</h3>
    <p className="text-[17px] flex items-center gap-2 mb-10 -mt-2 ml-[20px]">
    {leftData?.totals?.total_profit_sum} сум прибль из итогого
      <Italic className="bg-white p-0.5 rounded-sm" />
    </p>

    <div className="grid grid-cols-3 gap-2.5">
      <DashboardCard
        title="Остатка"
        onClick={()=>setOpen("Остатка")}
        icons={() => <DollarSign className="bg-gray-300 text-white w-[20px] h-[20px] p-1 rounded-full"/>}
        price={`${leftData?.product?.total_kv} кв/м`}
        price2={`${leftData?.product?.total_sum} $`} 
      >
        <div className="h-30"></div>
      </DashboardCard>
      <DashboardCard
        title="Кенты"
        onClick={()=>setOpen("Кенты")}
        icons={() => <DollarSign className="bg-gray-300 text-white w-[20px] h-[20px] p-1 rounded-full"/>}
        price={`+${leftData?.kents?.income} $`}
        price2={`-${leftData?.kents?.income} $`} 
      >
        <div className="h-30"></div>
      </DashboardCard>
      <DashboardCard
        title="Дилер"
        onClick={()=>setOpen("Дилер")}
        icons={() => <DollarSign className="bg-gray-300 text-white w-[20px] h-[20px] p-1 rounded-full"/>}
        price={`+${leftData?.dealer?.total_owed} $`}
        price2={`-${leftData?.dealer?.total_give} $`} 
      >
        <div className="h-30"></div>
      </DashboardCard>
    </div>
  </div>
  )
}
