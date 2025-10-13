import { StickyNote } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useRef, useState } from "react";

import { TData } from "../types";
import Content from "./content";
import useDataFetch from "./queries";

export default function NotePage() {
  const [active, setActive] = useState(false);
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data } = useDataFetch({
    queries: { limit, page },
  });

  const flatData = (data?.pages?.[0].items || []) as unknown as TData[];

  // 🧩 Ref for the whole note area
  const noteRef = useRef<HTMLDivElement>(null);

  // 🪄 Detect clicks outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (noteRef.current && !noteRef.current.contains(e.target as Node)) {
        setActive(false);
      }
    }

    if (active) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [active]);

  return (
    <div ref={noteRef} className="relative  z-1000 mt-3 z-20">
      <div
        onClick={(e) => {
          e.stopPropagation(); // prevent closing immediately
          setActive(!active);
        }}
        className={`${
          active ? "text-white bg-primary" : "text-primary bg-transparent"
        } p-0 rounded cursor-pointer`}
      >
        <StickyNote className="w-5 h-5 opacity-60" />
      </div>

      {active && (
        <div className="absolute bottom-8 py-[14px] px-5 left-10  z-1000 bg-card rounded-[12px] border w-[380px]  max-h-[600px] ">
          <Content data={flatData} />
        </div>
      )}
    </div>
  );
}
