import { parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useLocation } from "react-router-dom";

import TabsFilter from "@/components/filters-ui/tabs-filter";
import { DataTable } from "@/components/ui/data-table";
import { useMeStore } from "@/store/me-store";

import { ProductColumns, CollectionColumns } from "./columns";
import Filters from "./filters";
import useDataFetch, { useCollectionDataFetch } from "./queries";
import CarpetCard from "@/components/cards/carpet-card";

export default function Page() {
  const location = useLocation();
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [filial] = useQueryState("filial");
  const [search] = useQueryState("search");
  const [card] = useQueryState("card",parseAsString.withDefault("card"));
  const [collection] = useQueryState("collection",parseAsString.withDefault("product"));
  const { meUser } = useMeStore();

  // Product data fetch
  const { 
    data: productsData, 
    isLoading: isProductsLoading, 
    fetchNextPage: fetchNextProductsPage,
    hasNextPage: hasNextProductsPage,
    isFetchingNextPage: isFetchingNextProductsPage 
  } = useDataFetch({
    queries: {
      limit,
      page,
      status:"published",
      search: collection == "product"?  search  || undefined: undefined,
      // filialId:  filial|| undefined,
    },
  });
  
  const { 
    data: collectionsData,
    isLoading: isCollectionsLoading,
    fetchNextPage: fetchNextCollectionsPage,
    hasNextPage: hasNextCollectionsPage,
    isFetchingNextPage: isFetchingNextCollectionsPage
  } = useCollectionDataFetch({
    filialId: filial || meUser?.filial?.id,
    search: collection == "product"?  undefined: search || undefined,
  });

  const productsFlat = productsData?.pages?.flatMap((page) => page?.items || []) || [];
  const collections = collectionsData?.pages?.flatMap((page) => page?.items || []) || [];


  const showProductTable = collection === "product" && card !== "card";
  const showCardGrid = collection === "product" && card === "card";
  const showCollectionCards = card === "card" && collection !== "product";
  const showCollectionTable = (location.pathname === "/products" && !showProductTable && !showCardGrid && !showCollectionCards);

  return (
    <>
      <Filters />
      
     <div className="scrollCastom ml-5">
        <TabsFilter />
      </div>
      {showCardGrid && (
        <div className="px-6 mt-4 h-[calc(100vh-163px)] scrollCastom grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-6">
          {productsFlat.map((item) => (
            <CarpetCard
              producdId={""}
              key={item.id}
              id={item.id.toString()}
              isBron={false}
              carpetType="product"
              user={null}
              shape={item?.shape?.title || ""}
              discount={"0"}
              img={{
                path: item?.imgUrl || ""
              }}
              model={item?.model?.title || ""}
              size={`${(item?.size?.x || 0) * 100}x${(item?.size?.y || 0) *100 }`}
              count={(1).toString()}
              price={(item.i_price || "0").toString()}
              colaction={item?.collection?.title || ""}
              color={item?.color?.title || ""}
            />
          ))}
        </div>
      )}

      {showCollectionCards && (
        <div className="px-6 mt-4 h-[calc(100vh-210px)] scrollCastom grid grid-cols-6 gap-4 pb-6">
          {collections.map((item) => (
            <div key={item.id} className="bg-transparent p-[15px] border-[1px] border-[#CBCBC14D]">
              <h2 className="mb-[8px] text-[#5D5D53] text-[18px] font-[500]">
                {item.title}
              </h2>
              <div className="text-[#5D5D53] text-[13px] mb-[21px] font-[500]">
                <span>{item.totalKv} м² | {item.totalCount} шт</span>
              </div>
              <div className="text-[14px] text-[#E38157] font-[500]">
                {item.collectionPrices?.[0]?.priceMeter || '-'} $
              </div>
            </div>
          ))}
        </div>
      )}
      
      {showCollectionTable && (
        <DataTable
          isLoading={isCollectionsLoading}
          columns={CollectionColumns}
          data={collections}
          className="h-[calc(100vh-200px)] scrollCastom"
          fetchNextPage={fetchNextCollectionsPage}
          hasNextPage={hasNextCollectionsPage ?? false}
          isFetchingNextPage={isFetchingNextCollectionsPage}
        />
      )}
      
      {showProductTable && (
        <DataTable
          isLoading={isProductsLoading}
          columns={ProductColumns}
          data={productsFlat}
          className="h-[calc(100vh-200px)] scrollCastom"
          fetchNextPage={fetchNextProductsPage}
          hasNextPage={hasNextProductsPage ?? false}
          isFetchingNextPage={isFetchingNextProductsPage}
        />
      )}
    </>
  );
}
