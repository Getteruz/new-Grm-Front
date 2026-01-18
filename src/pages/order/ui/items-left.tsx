import { Calendar, Clock } from "lucide-react";
import OrderTableWrapper from "./order-table-wrapper";
import { TData } from "../type";

export default function ItemsLeft({ data }: { data?: TData }) {
  return (
    <div className="w-full max-w-[275px]">
      <OrderTableWrapper className="mb-[10px]" title="Тулов малумолтари (Чек)">
        <div className="border-border bg-card border-[1px] border-solid  m-[6px] p-4">
          <div className="flex items-center justify-between ">
            <p className="text-[12px] leading-[14px] text-[#6F6F63]">Сайт:</p>
            <p className="text-[12px] leading-[14px] text-[#212121] font-medium text-end">
              www.gilam-market.uz
            </p>
          </div>
          <div className="flex items-center  justify-between mt-[4px] mb-[11px]">
            <p className="text-[12px] leading-[14px] text-[#6F6F63]">Заказ:</p>
            <p className="text-[12px] leading-[14px] text-[#212121] font-medium text-end">
              №{data?.sequence} {data?.date}
            </p>
          </div>
          <ul className="border-border w-full border-t border-dotted py-3">
            {/* Note: Items list here was hardcoded. If we want to show items summary in receipt, 
                 we would need the items list passed here too. 
                 For now, I'll keep the structure but maybe hide or comment out the hardcoded items 
                 if they are not available in TData directly, or just leave the hardcoded static list as placeholder? 
                 The user asked to get data for THIS component from `orderData`. 
                 `orderData` (TData) has `totalPrice`, `payment_status` etc. 
                 It does NOT seem to have the list of items inside `TData` based on the previous view of `type.ts`.
                 The items list is fetched separately in `items.tsx`. 
                 I will map the totals and payment info for now. */}

            <li className="w-full flex items-center gap-1 mb-[10px]">
              <p className="text-[12px] leading-[14px] text-[#6F6F63] w-full">
                Итого
              </p>
              <p className="text-[12px] leading-[14px] w-[80px] text-end text-[#6F6F63] ">
                {data?.totalPrice?.toLocaleString()}
              </p>
            </li>
            <li className="w-full flex items-center mb-1 gap-1">
              <p className="text-[12px] leading-[14px] flex items-center gap-1 text-[#212121] w-full font-medium">
                <span className="font-normal w-full">Статус оплаты:</span>
                <span className="w-full"> {data?.payment_status}</span>
              </p>

              <p className="text-[12px] leading-[14px] w-[80px] text-[#212121] text-end font-medium">
                {data?.pre_payment}
              </p>
            </li>
            <li className="w-full flex items-center mb-1s gap-1">
              <p className="text-[12px] leading-[14px] flex items-center gap-1 text-[#212121] w-full font-medium">
                <span className="font-normal w-full">Тип оплаты:</span>
                <span className="w-full"> {data?.payment_type}</span>
              </p>

              <p className="text-[12px] leading-[14px] w-[80px] text-[#212121] text-end font-medium">
                {/*  Payme/Cash etc is usually in payment_type? */}
              </p>
            </li>
          </ul>
        </div>
        <p className="text-[12px] py-[10px] flex items-center gap-1 justify-center leading-[14px] text-[#212121] font-medium">
          Скачать чек
        </p>
      </OrderTableWrapper>

      <OrderTableWrapper title="Доставка">
        <p className="text-[12px] p-3 pb-2 leading-[14px] mb-2 text-[#6F6F63]">
          Адресс доставки
        </p>
        <div className="row-start w-full grid grid-cols-2 gap-[5px] px-3 mb-3 ">
          <p className="p-[9px]  text-[12px]  px-[11px] border-border border rounded-md">
            {data?.city || "-"}
          </p>
          <p className="p-[9px]  text-[12px]  px-[11px]   border-border border rounded-md">
            {data?.district || "-"}
          </p>
          <p className="p-[9px] col-span-2 text-[12px]  px-[11px] w-full  border-border border rounded-md">
            {data?.full_address || "-"}
          </p>
        </div>
        <p className="text-[12px] p-3  pb-2 leading-[14px]  text-[#6F6F63]">
          Комментария для курьера
        </p>
        <div className="px-3">
          <p className="p-[9px] text-[12px] px-[11px] w-full border-border border rounded-md">
            {data?.delivery_comment || "-"}
          </p>
        </div>
        <p className="text-[12px] p-3 pb-2 leading-[14px]  text-[#6F6F63]">
          Дата доставки:
        </p>
        <div className="px-3 pb-3 gap-1 grid row-start w-full  grid-cols-3">
          <p className="p-[9px] flex  items-center gap-1 text-[12px] col-span-2 px-[11px] w-full border-border border rounded-md">
            <Calendar className="w-[10px]" /> {data?.startDate ? new Date(data.startDate).toLocaleDateString() : "-"}
          </p>
          <p className="p-[9px] text-nowrap flex items-center gap-1  text-[12px] px-[11px] w-full border-border border rounded-md">
            <Clock className="w-[10px]" /> {data?.startDate ? new Date(data.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-"}
          </p>
        </div>
      </OrderTableWrapper>
    </div>
  );
}
