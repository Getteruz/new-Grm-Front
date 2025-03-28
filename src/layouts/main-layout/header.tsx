import { Link, useLocation } from "react-router-dom";
import {
  DotsIcons,
  NoteIcons,
  RingIcons,
  RinigIcons,
} from "../../components/icons";
import { DataMenu } from "./menu-datas";
import { User } from "lucide-react";
import { useMeStore } from "@/store/me-store";
import { ReactElement } from 'react';

type Tmenu = {
  id: number;
  icons: () => ReactElement;
  link: string;
  text: string;
  items: {
    id: number;
    link: string;
    text: string;
  }[];
}
export default function Header() {
  const location = useLocation();
  const { meUser } = useMeStore();
  const oneMenu = DataMenu?.[meUser?.position?.role as keyof typeof DataMenu]?.find(e=>location.pathname.includes(e?.link))
  return (
    <div className="flex items-center gap-5 w-full h-[64px] px-[51px] py-[23px] bg-sidebar border-b border-border">
      <p className="flex mr-[auto]  items-center gap-4 text-[14px] leading-[16px] text-foreground">
      { (oneMenu as Tmenu)?.items?.length ? (oneMenu as Tmenu)?.items.map(e=>(
        <Link key={e?.id} className={e?.link ==location.pathname ? '':'opacity-60' } to={e?.link}>{e.text}</Link>
      )):
      <Link to={oneMenu?.link || '/'}>{oneMenu?.text}</Link>
      }
      </p>  
      <div>
        <NoteIcons />
      </div>
      <div>
        <RingIcons />
      </div>
      <div>
        <DotsIcons />
      </div>
      <div>
        <User/>
      </div>
      <div className="flex items-center gap-[5px]">
        <RinigIcons />
        <p className="text-[25px] leading-[30px] text-foreground relative">
          13
          <span className="text-[8px] leading-[12px] text-foreground absolute -top-[2px] -right-[2px]">
            ° C
          </span>
        </p>
      </div>
      <div>
        <p className="text-[14px] leading-[17px] text-foreground">11:58</p>
        <p className="text-[14px] leading-[17px] text-foreground">Ташкент</p>
      </div>
    </div>
  );
}
