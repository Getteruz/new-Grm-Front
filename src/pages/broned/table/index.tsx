import {  useQueryState } from "nuqs";

import CarpetCard from "@/components/cards/carpet-card";

import Filters from "./filters";
import useData from "./queries";
import { useMeStore } from "@/store/me-store";

export default function Page() {

  const [search] = useQueryState("search");
  const {meUser} = useMeStore()

  const { data } = useData({
    queries: {
      search: search || undefined,
      filial:meUser?.filial?.id || undefined,
    },
  });
  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
  return (
    <>
      <Filters />
      <div className="px-2.5  mt-4 gap-2 grid row-start grid-cols-7  pb-[17px]">
        {flatData.map((item) => (
          <CarpetCard
            key={item.id}
            id={item?.id}
            isBron={true}
            user={{
              firstName: meUser?.firstName || "",
              lastName: meUser?.lastName || "",
              avatar: {
                path: meUser?.avatar?.path || ""
              }
            }}
            img={{
              path:  ""
            }}
            carpetType="my-broned"
            shape={item?.product?.bar_code?.shape?.title}
            discount={"5"}
            model={item?.product?.bar_code?.model?.title}
            size={item?.product?.bar_code.size?.title}
            count={item?.x +"" || "0"}
            price={item?.product?.price +""}
            colaction={item?.product?.bar_code?.collection?.title}
            color={item?.product?.bar_code?.color?.title}
          />
        ))}
      </div>
    </>
  );
}
