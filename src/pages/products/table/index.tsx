import { parseAsInteger, useQueryState } from "nuqs";
import { useLocation } from "react-router-dom";

import TabsFilter from "@/components/filters-ui/tabs-filter";
import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { ProductColumns, CollectionColumns } from "./columns";
import Filters from "./filters";
import useDataFetch from "./queries";
import CarpetCard from "@/components/cards/carpet-card";

export default function Page() {
  const location = useLocation();
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [filial] = useQueryState("filial");
  const [search] = useQueryState("search");
  const [card] = useQueryState("card");
  const [collection] = useQueryState("collection");
  const { meUser } = useMeStore();
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
  const showCardGrid = collection === "product" && card === "card";
  const showCollectionCards = collection === "collections" && card === "card";
  const showCollectionTable = collection === "collections" && card === "list";
  const showProductTable = !showCardGrid && !showCollectionTable && !showCollectionCards && (location.pathname === "/products" || (card === "list" && collection === "product"));

  return (
    <>
      <Filters />
      {meUser?.position?.role === 9 ||
        (search && (
          <div className="bg-sidebar py-0.5 px-[50px]">
            <TabsFilter />
          </div>
        ))}
      {showCardGrid ? (
        <div className="px-6 mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 pb-6">
          {flatData.map((item) => (
            <CarpetCard
              key={item.id}
              id={item.id.toString()}
              isBron={false}
              carpetType="product"
              user={{
                firstName: meUser?.firstName || "",
                lastName: meUser?.lastName || "",
                avatar: {
                  path: meUser?.avatar?.path || ""
                }
              }}
              shape={item.bar_code?.shape?.title || ""}
              discount={"0"}
              img={{
                path: item.bar_code?.imgUrl || ""
              }}
              model={item.bar_code?.model?.title || ""}
              size={`${item.bar_code?.size?.x || 0}X${item.bar_code?.size?.y || 0}`}
              count={(item.count || "0").toString()}
              price={(item.price || "0").toString()}
              colaction={item.bar_code?.collection?.title || ""}
              color={item.bar_code?.color?.title || ""}
            />
          ))}
        </div>
      ) : showCollectionCards ? (
        <div className="px-6 mt-4 grid grid-cols-6 gap-4 pb-6">
          {flatData.map((item) => (
            <div key={item.id} className="bg-transparent p-[15px] border-[1px] border-[#CBCBC14D]">
              <h2 className="mb-[8px] text-[#5D5D53] text-[18px] font-[500]">
                {item.bar_code?.model?.title || ""}
              </h2>
              <div className="text-[#5D5D53] text-[13px] mb-[21px] font-[500]">
                <span>{`${((item.bar_code?.size?.x || 0) * (item.bar_code?.size?.y || 0)).toFixed(1)}`} м² | {item.count || 0}</span>
              </div>
              <div className="text-[14px] text-[#E38157] font-[500]">
                {item.price || 0} $
              </div>
            </div>
          ))}
        </div>
      ) : showCollectionTable ? (
        <DataTable
          isLoading={isLoading}
          columns={CollectionColumns}
          data={flatData ?? []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : showProductTable ? (
        <DataTable
          isLoading={isLoading}
          columns={ProductColumns}
          data={flatData ?? []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage ?? false}
          isFetchingNextPage={isFetchingNextPage}
        />
      ) : null}
    </>
  );
}
