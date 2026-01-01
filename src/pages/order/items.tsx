import Filters from "./filters";
import ItemsLeft from "./ui/items-left"
import OrderTableWrapper from "./ui/order-table-wrapper";

const infoColms: string[] = [
  "Дата заказа:",
  "Покупатель",
  "Номер",
  "Адресс доставки",
];
const infoValue: string[] = [
  "12.02.2025  10:47",
  "Аббос Жанизаков",
  "+998 94 609-34-44",
  "г.Ташкент, р.Яшнабадский, ул.Авиасозлар. 65 дом, 1 квартира",
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
const ProductValue: string[] = [
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
  return (
    <div>
     <Filters/>
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
            <li className="w-full relative flex gap-2 items-start  px-[11px] py-[16px]">
              <img src="/image.png" className="w-[90px] h-[142px] " />
              {ProductValue.map((e: string, i: number) => (
                <p
                  key={i}
                  className="text-[#212121]  mt-[12px] text-[14px] leading-[16px] w-full"
                >
                  {e}
                </p>
              ))}{" "}
              <div className="absolute w-full max-w-[573px] top-[50px] left-[109px]">
                <p className="text-[#6F6F63] mb-1 text-[12px] leading-[14px]">
                  Характеристика
                </p>
                <p className="text-[#212121] mb-3 text-[12px] leading-[14px]">
                  Имя: QUM Состав: 30%шёлк + 70% модал Плотность: 3.000.000 узлов
                  на 1 м2 Высота ворса: 4 мм
                </p>
                <p className="text-[#6F6F63] mb-1 text-[12px] leading-[14px]">
                  Кайси флиалларда бор
                </p>
                <div className="flex items-center flex-wrap gap-[2px]">
                  <p
                    className={`${ProductColms ? "text-[#212121] border-border bg-card" : "text-card  bg-primary"} border-[1px] border-solid  px-[5px] py-[2px] rounded-[3px]  mb-3 text-[12px] leading-[14px]`}
                  >
                    Sanat Hali: 2 та
                  </p>
                  <p
                    className={`${!ProductColms ? "text-[#212121] border-border bg-card" : "text-card  bg-primary"} border-[1px] border-solid  px-[5px] py-[2px] rounded-[3px]  mb-3 text-[12px] leading-[14px]`}
                  >
                    Sanat Hali: 2 та
                  </p>
                </div>
              </div>
            </li>
            
          </OrderTableWrapper>
          
        </div>
        <ItemsLeft />
      </div>
    </div>
  );
}