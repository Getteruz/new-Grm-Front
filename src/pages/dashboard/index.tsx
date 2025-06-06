import { useMeStore } from "@/store/me-store";

import MonitoringDashboard from "../hr-monitoring";

export default function Dashboard() {
  const { meUser } = useMeStore()

  const role = meUser?.position.role;
  if(role === 11){
    return <MonitoringDashboard/>
  }
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-[22px] text-[#272727]">Мониторинг</h2>
    </div>
  );
}
