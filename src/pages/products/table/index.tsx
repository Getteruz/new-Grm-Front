import { parseAsInteger, useQueryState } from "nuqs";

import TabsFilter from "@/components/filters-ui/tabs-filter";
import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { ProductColumns } from "./columns";
import Filters from "./filters";
import useDataFetch from "./queries";
// import CarpetCard from "@/components/cards/carpet-card";
// import CarpetCard from "@/components/casrds/carpet-card";

export default function Page() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [filial] = useQueryState("filial");
  const [search] = useQueryState("search");
  const { meUser } = useMeStore();
  // const [value] = useQueryState("card", parseAsString.withDefault("card"));
  // const [search] = useQueryState("search");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useDataFetch({
      queries: {
        limit,
        page,
        search: search || undefined,
        filialId:
          filial ||
          meUser?.position?.role === 2 ||
          meUser?.position?.role === 3 ||
          meUser?.position?.role === 4 ||
          meUser?.position?.role === 5 ||
          meUser?.position?.role === 7
            ? meUser?.filial?.id
            : undefined,
      },
      role: meUser?.position.role,
    });

  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <>
      <Filters />
      {meUser?.position?.role === 9 ||
        (search && (
          <div className="bg-sidebar py-0.5 px-[50px]">
            <TabsFilter />
          </div>
        ))}
      {/* {value == "list" ? ( */}
      <DataTable
        isLoading={isLoading}
        columns={ProductColumns}
        data={flatData ?? []}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
      />
      {/* ) : (
        <div className="px-2.5  mt-4 gap-2 grid row-start grid-cols-7  pb-[17px]">
          {flatData.map((item) => (
            <CarpetCard
              key={item.id}
              id="1"
              isBron={true}
              carpetType="my-broned"
              shape={item?.product?.bar_code?.shape?.title}
              discount={"5"}
              img={item.product.bar_code?.imgUrl.path}
              model={item?.product?.bar_code?.model?.title}
              size={`${item?.product?.bar_code.size.x * 100}X${item?.product?.y * 100}`}
              count={item?.product?.book_count || "0"}
              price={item?.product?.price}
              color={item?.product?.bar_code?.color?.title}
            />
          ))}
        </div>
      )} */}
    </>
  );
}
