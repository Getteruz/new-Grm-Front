import { parseAsInteger, useQueryState } from "nuqs";

import CarpetCard from "@/components/cards/carpet-card";

import Filters from "./filters";
import useBroned from "./queries";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));

  const [search] = useQueryState("search");
  const { data, isLoading } = useBroned({
    queries: {
      limit,
      page,
      search: search || undefined,
    },
  });
  console.log(data);

  return (
    <>
      <Filters />
      <div className="px-2.5  mt-4 gap-2 grid row-start grid-cols-6  pb-[17px]">
        {data?.items.map((item) => (
          <CarpetCard
            key={item.id}
            id="1"
            isBron={true}
            carpetType="my-broned"
            user={item?.user}
            shape={item?.product?.bar_code?.shape?.title}
            discount={"5"}
            img={item.product.bar_code?.imgUrl}
            model={item?.product?.bar_code?.model?.title}
            size={`${item?.product?.bar_code.size.x * 100}X${item?.product?.y * 100}`}
            count={item?.product?.book_count || 0}
            price={item?.product?.price}
            colaction={item?.product?.bar_code?.collection?.title}
            color={item?.product?.bar_code?.color?.title}
          />
        ))}
      </div>
    </>
  );
}
