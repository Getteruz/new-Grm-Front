import { useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";

import { getByIdData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { useMeStore } from "@/store/me-store";
import { IOpenKassa } from "@/types/api-type";

import Content from "./content";
import useOrder from "./queries";

export default function Page() {
  const { meUser } = useMeStore();
  const [sort] = useQueryState("sort");
  const { data: kassa } = useQuery({
    queryKey: [apiRoutes.filial],
    queryFn: () =>
      getByIdData<IOpenKassa, void>(
        "/kassa/open-kassa",
        meUser?.filial?.id || ""
      ),
    enabled: !!meUser?.filial?.id,
  });
  const { data } = useOrder({
    id: kassa?.id ? kassa?.id : undefined,
    queries: {
      status: sort === "all" ? undefined : sort || undefined,
      limit: 100,
    },
  });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Content orderList={flatData} />
    </>
  );
}
