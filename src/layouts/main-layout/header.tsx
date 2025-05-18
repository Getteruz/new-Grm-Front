import { useQuery } from "@tanstack/react-query";
import { BellRing, Grip } from "lucide-react";
import { ReactElement, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { minio_img_url } from "@/constants";
import { getAllData } from "@/service/apiHelpers";
import { useAuthStore } from "@/store/auth-store";
import { useMeStore } from "@/store/me-store";

import Currency from "./currency";
import { DataMenu } from "./menu-datas";
import NotePage from "./note/list";
import { CurrencyData } from "./types";
import Weather from "./weather";

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
};
export default function Header() {
  const token = useAuthStore((state) => state.token);
  const { meUser } = useMeStore();

  const location = useLocation();
  const navigate = useNavigate();
  const { data: currency } = useQuery({
    queryKey: ["currency", token, meUser],
    queryFn: () => getAllData<CurrencyData, unknown>("currency"),
  });
  useEffect(() => {
    localStorage.setItem(
      "currencyNow",
      JSON.stringify(
        (currency?.items?.[0].uzs || 0) / (currency?.items?.[0].usd || 1)
      )
    );
  }, [currency]);

  const oneMenu = DataMenu?.[
    meUser?.position?.role as keyof typeof DataMenu
  ]?.find((e) => location.pathname.includes(e?.link));
  return (
    <div className="flex items-center gap-5 w-full h-[64px] pl-4 px-[51px] py-[23px] bg-sidebar border-b border-border">
      <p className="flex mr-[auto]  items-center gap-4 text-[14px] leading-[16px] text-foreground">
        {(oneMenu as Tmenu)?.items?.length ? (
          (oneMenu as Tmenu)?.items.map((e) => (
            <Link
              key={e?.id}
              className={e?.link == location.pathname ? "" : "opacity-60"}
              to={e?.link}
            >
              {e.text}
            </Link>
          ))
        ) : (
          <Link to={oneMenu?.link || "/"}>{oneMenu?.text}</Link>
        )}
      </p>
      {meUser?.filial?.need_get_report && meUser.position.role == 4 && (
        <Button onClick={() => navigate("/re-register")}>Переучёт</Button>
      )}
      {location.pathname.includes("filial") &&
        location.pathname.includes("info") &&
        !location.pathname.includes("get-report") && (
          <Button onClick={() => navigate(location.pathname + "/get-report")}>
            Переучёт
          </Button>
        )}
      <NotePage isCashier={false} />
      <BellRing className="text-primary w-5 h-5" />
      <Grip className="text-primary w-5 h-5" />

      <div className="bg-background h-[50px] w-[50px] flex items-center justify-center ">
        <Avatar className="w-[40px] h-[40px]">
          <AvatarImage
            src={minio_img_url + meUser?.avatar?.path || undefined}
          />
          <AvatarFallback className="bg-primary text-white    flex items-center justify-center">
            {meUser?.firstName?.[0]}
          </AvatarFallback>
        </Avatar>
      </div>
      <Weather />
      <div className="flex gap-2 items-center-">
        <div>
          <p className="text-[14px] leading-[17px] font-semibold text-foreground">
            {currency?.items?.[0]?.usd.toLocaleString("uz-UZ")} $
          </p>
          <p className="text-[14px] leading-[17px] font-semibold text-[#E38157]">
            {currency?.items?.[0]?.uzs.toLocaleString("uz-UZ")} сум
          </p>
        </div>
        {meUser?.position?.role === 9 && <Currency />}
      </div>
    </div>
  );
}
