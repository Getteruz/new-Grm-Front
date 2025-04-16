import { useMeStore } from "@/store/me-store";
import Content from "./content";
import useOrder from "./queries";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/service/apiRoutes";
import { getByIdData } from "@/service/apiHelpers";
import { IOpenKassa } from "@/types/api-type";

export default function Page() {
  const {meUser} =useMeStore()
  const {data:kassa} = useQuery({
    queryKey: [apiRoutes.filial],
    queryFn: () =>
      getByIdData<IOpenKassa, void>(
        '/kassa/open-kassa',
        meUser?.filial?.id || ""
      ),
      enabled: !!meUser?.filial?.id,
  });
  const {data } =useOrder({ id: kassa?.id  ? kassa?.id : undefined})

  const flatData = data?.pages?.flatMap(page => page?.items || []) || [];

  return (
    <>
    <Content orderList={flatData}/>
    </>
  )
}
