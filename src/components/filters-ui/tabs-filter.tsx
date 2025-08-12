import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { IData } from "@/pages/cashier/home/type";
import { TQuery } from "@/pages/employees/type";
import { getAllData } from "@/service/apiHelpers";
import { TResponse } from "@/types";

export default function TabsFilter() {
  const { data } = useQuery({
    queryKey: ["/filial"],
    queryFn: () => getAllData<TResponse<IData>, TQuery>("/filial"),
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
    <div className="flex ">
      {data?.data?.map((e) => (
        <p
          className={`${filial == e?.id ? "bg-primary text-sidebar" : ""} border text-nowrap bg-background px-4 border-r border-border py-2.5 text-foreground cursor-pointer`}
          onClick={() => setFilial(e?.id)}
          key={e?.id}
        >
          {e?.title}
        </p>
      ))}
    </div>
  );
}
