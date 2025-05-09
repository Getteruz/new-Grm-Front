import { format } from "date-fns";
import { useState } from "react";

import CarpetCashierCard from "@/components/cards/carpet-cashier-card";
import { minio_img_url } from "@/constants";

import { IData } from "../type";
import Filters from "./filter";
import Pricecheck from "./price-check";

export default function Content({ orderList }: { orderList: IData[] }) {
  const [selected, setSelected] = useState<IData[]>([]);

  return (
    <div className="flex ">
      <div className="w-full">
        <Filters countLength={selected.length} />
        <div className="my-[13px] h-[calc(100vh-160px)]  overflow-y-scroll mx-[40px]">
          {orderList &&
            orderList?.map((item, index) => {
              return (
                <CarpetCashierCard
                  key={index}
                  className="mb-1"
                  onCheckedChange={(e) => {
                    setSelected((prev) => {
                      if (e) {
                        return [...prev, item];
                      } else {
                        return prev.filter((e) => e.id !== item.id);
                      }
                    });
                  }}
                  tags={[
                    item?.product?.bar_code?.isMetric ? "Метражный" : "Штучный",
                    item?.product?.bar_code?.shape?.title,
                    item?.product?.bar_code?.style?.title,
                    item?.product?.bar_code?.color?.title,
                    item?.product?.bar_code?.country?.title,
                    item?.product?.partiya_title,
                  ]}
                  discount={
                    item?.discountPercentage === null
                      ? "~"
                      : `-${item?.discountPercentage}%`
                  }
                  id={item?.id}
                  img={
                    item?.product?.bar_code?.imgUrl
                      ? minio_img_url + item?.product?.bar_code?.imgUrl?.path
                      : "/images/default.svg"
                  }
                  model={item?.product?.bar_code?.model?.title}
                  size={item?.product?.bar_code?.size?.title}
                  count={item?.x + "x"}
                  status={item?.status}
                  seller={item?.seller}
                  price={(item?.price || 0) + "$"}
                  plasticSum={
                    item?.plasticSum ? (item?.plasticSum || 0) + "$" : "0$"
                  }
                  priceMitr={
                    (item?.product.bar_code?.collection?.collection_prices?.[0]
                      ?.priceMeter || 0) + "$"
                  }
                  colaction={item?.product?.bar_code?.collection?.title}
                  color="Beige"
                  date={format(item.date, "yyyy-MM-dd HH:MM")}
                />
              );
            })}
        </div>
      </div>
      <Pricecheck selected={selected} />
    </div>
  );
}
