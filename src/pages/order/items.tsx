import { useParams } from "react-router-dom";
import Filters from "./filters";
import ItemsLeft from "./ui/items-left";
import OrderTableWrapper from "./ui/order-table-wrapper";
import { useGetOrderById, useGetOrderItems } from "./table/queries";
import { minio_img_url } from "@/constants";

const infoColms: string[] = [
  "Дата заказа:",
  "Покупатель",
  "Номер",
  "Адресс доставки",
];

const ProductColms: string[] = [
  "Фото",
  "Коллекция",
  "Модель",
  "Тип",
  "Форма",
  "Цвет",
  "Стиль",
  "Размер",
  "Объём",
  "Кол-во",
  "Цена за м²",
  "Общая сумма",
];

export default function Items() {
  const { id } = useParams();
  const { data: orderData } = useGetOrderById({ id });
  const { data: itemsData } = useGetOrderItems({ id });

  const infoValue: string[] = [
    orderData?.date || "-",
    orderData?.user?.firstName || "-",
    orderData?.user?.phone || "-",
    orderData?.full_address || "-",
  ];

  return (
    <div>
      <Filters />
      <div className="p-[13px] flex gap-[10px] w-full h-full ">
        <div className="w-full">
          <OrderTableWrapper
            className="mb-[10px]"
            title="Информация о заказе"
            Colms={infoColms}
          >
            <li className="w-full flex gap-2 items-center px-[11px] py-[16px]">
              {infoValue.map((e: string, i: number) => (
                <p
                  key={i}
                  className="text-[#212121]   text-[14px] leading-[16px] w-full"
                >
                  {e}
                </p>
              ))}
            </li>
          </OrderTableWrapper>
          <OrderTableWrapper
            className="mb-[10px]"
            title="Информация о продукте"
            Colms={ProductColms}
          >
            {itemsData?.items?.map((item: any) => (
              <li
                key={item.id}
                className="w-full relative flex gap-2 items-start  px-[11px] py-[16px] border-b border-border last:border-none"
              >
                <img
                  src={
                    item?.product?.imgUrl?.path
                      ? minio_img_url + item?.product?.imgUrl?.path
                      : "/images/default.svg"
                  }
                  className="w-[90px] h-[142px] object-cover rounded-md"
                />
                {[
                  item?.product?.collection?.title || "-",
                  item?.product?.model?.title || "-",
                  "Тип", // Missing type in API response compared to UI? Using placeholder or derived
                  item?.product?.shape?.title || "-",
                  item?.product?.color?.title || "-",
                  item?.product?.style?.title || "-",
                  item?.product?.size?.title || "-",
                  `${item?.product?.size?.kv} м²` || "-",
                  item?.count?.toString() || "-",
                  item?.price || "-",
                  (Number(item?.price) * item?.count).toString() || "-",
                ].map((e: string, i: number) => (
                  <p
                    key={i}
                    className="text-[#212121]  mt-[12px] text-[14px]  leading-[16px] w-full"
                  >
                    {e}
                  </p>
                ))}{" "}
                <div className="absolute w-full max-w-[573px] top-[100px] left-[109px]">
                  {/* <p className="text-[#6F6F63] mb-1 text-[12px] leading-[14px]">
                    Характеристика
                  </p> */}

                  <p className="text-[#6F6F63] mb-1 text-[12px] leading-[14px]">
                    Кайси флиалларда бор
                  </p>
                  <div className="flex items-center flex-wrap gap-[2px]">
                    {item?.filials?.map((filial: any) => (
                      <p
                        key={filial.id}
                        className="text-[#212121] border-border bg-card border-[1px] border-solid  px-[5px] py-[2px] rounded-[3px]  mb-3 text-[12px] leading-[14px]"
                      >
                        {filial.name}: {filial.count} та
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </OrderTableWrapper>
        </div>
        <ItemsLeft data={orderData} />
      </div>
    </div>
  );
}