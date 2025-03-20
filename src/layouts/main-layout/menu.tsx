import { useNavigate } from "react-router-dom";

import {
  OpenAIIcons,
  SettingsIcons,
} from "../../components/icons";
import { DataMenu } from "./menu-datas";


export default function Menu() {
  const navigate = useNavigate();
  return (
    <div className="w-[104px] h-screen flex justify-between flex-col  border-r bg-sidebar  border-border">
      <div>
        <img
          src="/logo1.svg"
          className="border-b inline-block w-full h-[64px]  border-border"
        />
        {DataMenu.admin?.map((e) => (
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
