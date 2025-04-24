
import OrderTableWrapper from "./order-table-wrapper";

export default function ItemsLeft() {
  return (
    <div className="w-full max-w-[275px]">
      <OrderTableWrapper className="mb-[10px]" title="Тулов малумолтари (Чек)">
        <div className="border-[#CBCBC1] bg-[#E0DFD6] border-[1px] border-solid  m-[6px] p-4">
          <div className="flex items-center justify-between ">
            <p className="text-[12px] leading-[14px] text-[#6F6F63]">Сайт:</p>
            <p className="text-[12px] leading-[14px] text-[#212121] font-medium text-end">
              www.gilam-market.uz
            </p>
          </div>
          <div className="flex items-center  justify-between mt-[4px] mb-[11px]">
            <p className="text-[12px] leading-[14px] text-[#6F6F63]">Заказ:</p>
            <p className="text-[12px] leading-[14px] text-[#212121] font-medium text-end">
              №245 12.02.2024 20:46
            </p>
          </div>
          <ul className="border-[#CBCBC1] w-full border-t border-dotted py-3">
            <li className="w-full flex items-center gap-1 mb-[10px]">
              <p className="text-[12px] min-w-[73px] leading-[14px] text-[#6F6F63] w-full">
                Заказы
              </p>
              <p className="text-[12px] leading-[14px] text-[#6F6F63] w-full">
                Размер
              </p>
              <p className="text-[12px] leading-[14px] text-center text-[#6F6F63] w-full">
                Кол-во
              </p>
              <p className="text-[12px] leading-[14px] text-end text-[#6F6F63] w-full">
                Сумма
              </p>
            </li>
            <li className="w-full flex items-center gap-1">
              <p className="text-[12px] min-w-[73px] leading-[14px] text-[#212121] w-full font-medium">
                Sanat Kalipso
              </p>
              <p className="text-[12px] leading-[14px] text-[#212121] w-full font-medium">
                200x300
              </p>
              <p className="text-[12px] leading-[14px] text-center text-[#212121] w-full font-medium">
                2х
              </p>
              <p className="text-[12px] leading-[14px] text-end text-[#212121] w-full font-medium">
                931
              </p>
            </li>
          </ul>

          <ul className="border-[#CBCBC1] w-full border-t border-dotted py-3">
            <li className="w-full flex items-center gap-1 mb-[10px]">
              <p className="text-[12px] leading-[14px] text-[#6F6F63] w-full">
                Итого
              </p>
              <p className="text-[12px] leading-[14px] w-[80px] text-end text-[#6F6F63] ">
                5 255 775
              </p>
            </li>
            <li className="w-full flex items-center mb-1 gap-1">
              <p className="text-[12px] leading-[14px] flex items-center gap-1 text-[#212121] w-full font-medium">
                <span className="font-normal w-full">Статус оплаты:</span>
                <span className="w-full"> Предоплата</span>
              </p>

              <p className="text-[12px] leading-[14px] w-[80px] text-[#212121] text-end font-medium">
                931
              </p>
            </li>
            <li className="w-full flex items-center mb-1s gap-1">
              <p className="text-[12px] leading-[14px] flex items-center gap-1 text-[#212121] w-full font-medium">
                <span className="font-normal w-full">Тип оплаты:</span>
                <span className="w-full"> Онлайн</span>
              </p>

              <p className="text-[12px] leading-[14px] w-[80px] text-[#212121] text-end font-medium">
                Payme
              </p>
            </li>
          </ul>
        </div>
        <p className="text-[12px] py-[10px] flex items-center gap-1 justify-center leading-[14px] text-[#212121] font-medium">
           Скачать чек
        </p>
      </OrderTableWrapper>

      <OrderTableWrapper title="Доставка">
        <div className="p-3 bg-[#E0DFD6] ">
          <p className="text-[12px] leading-[14px] mb-2 text-[#6F6F63]">
            Адресс доставки
          </p>
        </div>
      </OrderTableWrapper>
    </div>
  );
}