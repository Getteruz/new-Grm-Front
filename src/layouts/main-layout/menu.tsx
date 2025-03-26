import { useNavigate } from "react-router-dom";

import {
  OpenAIIcons,
  SettingsIcons,
} from "../../components/icons";
import { DataMenu } from "./menu-datas";
import { useMeStore } from "@/store/me-store";
import { ChevronLeft } from "lucide-react";


export default function Menu() {
  const role = "admin"
  const navigate = useNavigate();
  const { meUser } = useMeStore();
  return (
    <div className="w-[104px] h-screen flex justify-between flex-col  border-r bg-sidebar  border-border">
      <div>
        <img
          src="/logo1.svg"
          className={`border-b inline-block w-full ${role? ' h-[64px]':'h-[90px]'}  border-border`}
        />
         <div
            onClick={()=>navigate(-1)}
            className={` hover:bg-sidebar-accent cursor-pointer border-b border-border text-center flex items-center justify-center p-[20px]`}
          >
            {<ChevronLeft/>}
          </div>
        {DataMenu[(meUser?.position?.role || "admin") as keyof typeof DataMenu]?.map((e) => (
          <div
            onClick={() => {
              if (e?.link) {
                navigate(e?.link);
              }
            }}
            className={` hover:bg-sidebar-accent border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[20px]`}
            key={e?.id}
          >
            {e?.icons()}
          </div>
        ))}
      </div>
      <div>
        <div
          className={` hover:bg-sidebar-accent border-transparent cursor-pointer border-b hover:border-border text-center flex items-center justify-center p-[20px]`}
        >
          <SettingsIcons />
        </div>
        <div
          className={`bg-[#272727] border-transparent cursor-pointer text-center flex items-center justify-center p-[20px]`}
        >
          <OpenAIIcons />
        </div>
      </div>
    </div>
  );
}
