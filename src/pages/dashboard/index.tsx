import { useMeStore } from "@/store/me-store";

import MonitoringDashboard from "../hr-monitoring";
import { DollarSign, Italic } from "lucide-react";
import DashboardCard from "@/components/cards/dashboard-card";

export default function Dashboard() {
  const { meUser } = useMeStore();

  const role = meUser?.position.role;
  if (role === 11) {
    return <MonitoringDashboard />;
  }
  return (
    <div className="flex w-full mt-5 gap-2.5">
      <div className="w-full ">
        <h3 className="text-[72px] ml-[13px]">986 286 $</h3>
        <p className="text-[17px] flex items-center gap-2 mb-10 -mt-2 ml-[20px]">
          42 880 сум прибль из итогого
          <Italic className="bg-white p-0.5 rounded-sm" />
        </p>

        <div className="grid grid-cols-3 gap-2.5">
          <DashboardCard
            title="Остатка"
            icons={() => <DollarSign className="bg-gray-300 text-white w-[20px] h-[20px] p-1 rounded-full"/>}
            price={"216 286 кв/м"}
            price2={"11 316 286 $"}
          >
            <div className="h-30"></div>
          </DashboardCard>
        </div>
      </div>
      <div className="w-full ">
      </div>
    </div>
  );
}
