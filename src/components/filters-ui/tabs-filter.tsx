import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { IData } from "@/pages/cashier/home/type";
import { TQuery } from "@/pages/employees/type";
import { getAllData } from "@/service/apiHelpers";
import { TResponse } from "@/types";

export default function TabsFilter() {
  const { data } = useQuery({
    queryKey: ["/filial/warehouse-and-filial"],
    queryFn: () =>
      getAllData<TResponse<IData>, TQuery>("/filial/warehouse-and-filial"),
    select: (res) => ({
      data: res?.items
        .filter((i) => i.type !== "market")
        .sort((a, b) =>
          a.type === "warehouse" ? -1 : b.type === "warehouse" ? 1 : 0
        )
        .sort((a, b) =>
          a.type === "dealer" ? 1 : b.type === "dealer" ? -1 : 0
        ),
      meta: res.meta,
    }),
  });

  const [filial, setFilial] = useQueryState("filial");

  return (
    <div className="flex border border-border overflow-x-auto">
      {/* ✅ "All" tab */}
      <p
        className={`border-r border-border px-4 py-2.5 text-nowrap cursor-pointer ${
          !filial ? "bg-primary text-sidebar" : "bg-background text-foreground"
        }`}
        onClick={() => setFilial(null)} // Clear filial param
      >
        All
      </p>

      {/* ✅ Other filial tabs */}
      {data?.data?.map((e) => (
        <p
          key={e?.id}
          className={`border-r border-border px-4 py-2.5 text-nowrap cursor-pointer ${
            filial === e?.id
              ? "bg-primary text-sidebar"
              : "bg-background text-foreground"
          }`}
          onClick={() => setFilial(e?.id)}
        >
          {e?.title}
        </p>
      ))}
    </div>
  );
}
