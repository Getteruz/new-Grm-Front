import { useMeStore } from "@/store/me-store";

import MonitoringDashboard from "../hr-monitoring";
import { SquareArrowOutUpRight } from "lucide-react";
import DashboardCard from "@/components/cards/dashboard-card";
import Filter from "./ui/filter";
import Cards from "./ui/cards";
import Kassa from "./ui/kassa";
import { useState } from "react";
import { SheetDashboar } from "./ui/drawer";

export default function Dashboard() {
  const { meUser } = useMeStore();
  const [open,setOpen] = useState(false)

  const role = meUser?.position.role;
  if (role === 11) {
    return <MonitoringDashboard />;
  }
  if (role === 12) {
  return (
    <div className="flex w-full  gap-2.5">
        <Cards/>
      <div className="w-full ">
       <Filter/>
        <div className="grid grid-cols-3 gap-2.5">
        <DashboardCard
        onClick={()=>setOpen(true)}
            title="Продажа в долг "
            price={"-16 286 $  Возврат"}
            price2={"86 286 $"}
          >
           <SquareArrowOutUpRight className="mt-5 w-[20px] mb-[29px]"/>
          </DashboardCard>
        </div>
        <Kassa/>
      </div>

      <SheetDashboar open={open} onOpenChange={(value)=>setOpen(value)}/>
    </div>
  );}
  return<></>
}
