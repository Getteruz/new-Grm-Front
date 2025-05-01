import { StickyNote } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";

import { TData } from "../types";
import Content from "./content";
import useDataFetch from "./queries";

export default function NotePage(isCashier: any) {
  const [active, setActive] = useState(false);
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data } = useDataFetch({
    queries: {
      limit,
      page,
    },
  });

  const flatData = (data?.pages?.[0].items || []) as unknown as TData[];
  return (
    <div className="relative z-20">
      <div
        onClick={() => setActive(!active)}
        className={`${active ? "text-white bg-primary" : "text-primary bg-transparent "} p-0 rounded cursor-pointer`}
      >
        <StickyNote className={isCashier ? "w-5 h-5" : `w-5 h-5`} />
      </div>
      {active && (
        <div className="absolute top-8 py-[14px] px-5 -right-10 bg-[#F0F0E5] rounded-[12px] border w-[380px] shadow-[0px_34px_44px_0px_rgba(65,55,23,0.06)] max-h-[600px] overflow-y-auto">
          <Content data={flatData} />
        </div>
      )}
    </div>
  );
}
