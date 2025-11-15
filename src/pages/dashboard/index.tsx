import { useMeStore } from "@/store/me-store";

import MonitoringDashboard from "../hr-monitoring";
import { SquareArrowOutDownLeft, SquareArrowOutUpRight, Tag } from "lucide-react";
import DashboardCard from "@/components/cards/dashboard-card";
import Filter from "./ui/filter";
import Cards from "./ui/cards";
import Kassa from "./ui/kassa";
import { useState } from "react";
import { SheetDashboar } from "./ui/drawer";
import { useReportsHomePageCurrentLeft, useReportsHomePageCurrentMonth } from "./queries";
import { useQueryState } from "nuqs";
import { getMonth, getYear } from "date-fns";

export default function Dashboard() {
  const { meUser } = useMeStore();
  const [open, setOpen] = useState(false);
  const [startDate] = useQueryState("startDate");
  const [endDate] = useQueryState("endDate");
  const [filial] = useQueryState("filial");
  const [month] = useQueryState("month");
  
  const { data } = useReportsHomePageCurrentMonth({
    queries: {
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      filial_id: filial || undefined,
      month:month || getMonth(new Date()) + 1 + "",
      year: getYear(new Date()) || undefined,

    },
  });
  const { data:leftData } = useReportsHomePageCurrentLeft({});


  const role = meUser?.position.role;
  if (role === 11) {
    return <MonitoringDashboard />;
  }
  if (role === 12) {
    return (
      <div className="flex w-full  gap-2.5">
        <Cards  leftData={leftData}/>
        <div className="w-full ">
          <Filter />
          <div className="text-white flex items-center rounded-xl gap-3 bg-[#333333] my-2.5 p-4 pl-6">
          <p className="text-[24px] mr-auto">Текущий месяц</p>
          <p  className="text-[24px] opacity-50">{data?.totals?.total_kv?.toFixed(2)} м²</p>
          <p className="text-[24px]">{data?.totals?.total_profit_sum?.toFixed(2)} $</p>
        </div>
          <div className="grid grid-cols-3 gap-2.5">
            <DashboardCard
              onClick={() => setOpen(true)}
              title="Продажа в долг "
              price={`${data?.debt_order?.total_profit_sum || 0} $  Возврат`}
              price2={`${data?.debt_order?.total_sum || 0} $`}
            >
              <Tag  className="mt-5 text-[#FEDDCA] w-[20px] mb-[29px]" />
            </DashboardCard>
            <DashboardCard
              onClick={() => setOpen(true)}
              title="Прибыль "
              price={`Текущий месяц `}
              price2={`${data?.order?.total_sum ||0} $`}
            >
              <SquareArrowOutDownLeft  className="mt-5 text-[#B1F0B3] w-[20px] mb-[29px]" />
            </DashboardCard>
            <DashboardCard
              onClick={() => setOpen(true)}
              title="Расход "
              price={`${data?.boss?.boss_expense || 0} & Босс`}
              price2={`${data?.boss?.total_expense ||0} $`}
            >
              <SquareArrowOutUpRight  className="mt-5 text-[#FFACAC] w-[20px] mb-[29px]" />
            </DashboardCard>
          </div>
          <Kassa data={data} />
        </div>

        <SheetDashboar  open={open} onOpenChange={(value) => setOpen(value)} />
      </div>
    );
  }
  return <></>;
}
