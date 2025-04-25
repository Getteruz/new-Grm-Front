import {
  BasketIcons,
  BrCodeIcons,
  BronedIcons,
  BuildingIcons,
  ClientsIcon,
  DataLibrary,
  DeviceDesktopIcons,
  HikVision,
  HomeIcons,
  NotPublishedIcons,
  OrderIcons,
  PartiesIcons,
  PersonsIcons,
  PriceIcons,
  ProductCharacteristics,
  ProductIcons,
  ProductsCheck,
  ProductsOnSaleIcon,
  QRCodeIcon,
  RefleshIcons,
  ReportBottom,
  SettingsIcon,
  TransferIcons,
  UfoBottom,
  WareHouseIcons,
} from "../../components/icons";

// {
//   OTHER = 0,
//   CLIENT = 1,
//   Кacca = 2,
//   CASHIER = 3,
//   F_MANAGER = 4,
//   DEALER = 5,
//   D_MANAGER = 6,
//   W_MANAGER = 7,
//   I_MANAGER = 8,
//   M_MANAGER = 9,
//   ACCOUNTANT = 10,
//   HR = 11,
//   BOSS = 12
// }

export const DataMenu = {
  admin: [
    {
      id: 1,
      icons: () => HomeIcons(),
      link: "/cashier/home",
      text: "cashier",
    },
    {
      id: 14,
      icons: () => HomeIcons(),
      link: "/transfers",
      text: "Трансферы",
    },

    {
      id: 13,
      icons: () => HomeIcons(),
      link: "/crops",
      text: "crops",
      items: [
        {
          id: 12,
          link: "/crops",
          text: "crops1",
        },
        {
          id: 13,
          link: "/crops/item-2",
          text: "crops1",
        },
        {
          id: 14,
          link: "/crops/item-3",
          text: "crops1",
        },
      ],
    },
    {
      id: 12,
      icons: () => HomeIcons(),
      link: "/broned",
      text: "broned",
    },
    {
      id: 2,
      icons: () => BuildingIcons(),
      link: "/products",
      text: "product",
    },
    {
      id: 3,
      icons: () => BuildingIcons(),
      link: "/bugalteriya/data-library",
      text: "bugalteriya",
    },

    {
      id: 4,
      link: "/parties",
      icons: () => WareHouseIcons(),
      text: "parties",
    },
  ],
  3: [
    {
      id: 1,
      icons: () => DeviceDesktopIcons({ width: 28, height: 28 }),
      link: "/cashier/home",
      text: "cashier/home",
    },
    {
      id: 2,
      icons: () => ReportBottom({ width: 28, height: 28 }),
      link: "cashier/report",
      text: "Отчёт кассира",
    },
    {
      id: 3,
      icons: () => BasketIcons(),
      link: "/new",
      text: "",
    },
    {
      id: 4,
      icons: () => RefleshIcons(),
      link: "/new",
      text: "",
    },
    {
      id: 9,
      icons: () => BrCodeIcons({ width: 28, height: 28 }),
      link: "/new",
      text: "",
    },
    {
      id: 5,
      icons: () => DataLibrary({ width: 28, height: 28 }),
      link: "/data-library",
      text: "data-library",
    },
    {
      id: 2,
      icons: () => PriceIcons({ width: 28, height: 28 }),
      link: "/price",
      text: "price",
    },
  ],
  4: [
    {
      id: 2,
      icons: () => ReportBottom({}),
      link: "/report",
      text: "Отчеты",
      items: [
        {
          id: 22,
          link: "/report",
          text: "Кассовый учёт",
        },
        {
          id: 23,
          link: "/report-item-2",
          text: "Финансовый учёт",
        },
        {
          id: 24,
          link: "/report-item-3",
          text: "Снабжение и документооборот",
        },
      ],
    },
    {
      id: 14,
      icons: () => TransferIcons(),
      link: "/transfers",
      text: "Трансферы",
    },
    {
      id: 2,
      icons: () => ProductIcons(),
      link: "/products",
      text: "Продукты",
    },
    {
      id: 3,
      icons: () => BronedIcons(),
      link: "/broned",
      text: "broned",
    },
    {
      id: 3,
      icons: () => HikVision(),
      link: "/hik-vision",
      text: "Hik Vision",
    },
    {
      id: 4,
      icons: () => PersonsIcons(),
      link: "/user",
      text: "user",
    },
    {
      id: 4,
      icons: () => PriceIcons({}),
      link: "/price",
      text: "Цени и скидки",
    },
    {
      id: 3,
      icons: () => ProductsCheck(),
      link: "/product-check",
      text: "Проверка продукта",
    },
    {
      id: 3,
      icons: () => ClientsIcon(),
      link: "/client",
      text: "Клиенты",
    },
    {
      id: 4,
      icons: () => DataLibrary({}),
      link: "/data-library",
      text: "data-library",
    },
  ],
  5: [
    {
      id: 2,
      icons: () => ReportBottom({}),
      link: "/report",
      text: "Отчеты",
      items: [
        {
          id: 22,
          link: "/report",
          text: "Кассовый учёт",
        },
        {
          id: 23,
          link: "/report-item-2",
          text: "Финансовый учёт",
        },
        {
          id: 24,
          link: "/report-item-3",
          text: "Снабжение и документооборот",
        },
      ],
    },
    {
      id: 14,
      icons: () => TransferIcons(),
      link: "/transfers",
      text: "transfers",
    },
    {
      id: 2,
      icons: () => ProductIcons(),
      link: "/products",
      text: "Продукты",
    },
    {
      id: 3,
      icons: () => BronedIcons(),
      link: "/broned",
      text: "broned",
    },
    {
      id: 3,
      icons: () => HikVision(),
      link: "/hik-vision",
      text: "Hik Vision",
    },
    {
      id: 4,
      icons: () => PersonsIcons(),
      link: "/user",
      text: "user",
    },
    {
      id: 4,
      icons: () => PriceIcons({}),
      link: "/price",
      text: "Цени и скидки",
    },
    {
      id: 3,
      icons: () => ProductsCheck(),
      link: "/product-check",
      text: "Проверка продукта",
    },

    {
      id: 4,
      icons: () => DataLibrary({}),
      link: "/data-library",
      text: "data-library",
    },
  ],
  6: [
    {
      id: 4,
      icons: () => UfoBottom(),
      link: "/dealer",
      text: "Дилеры",
    },
    {
      id: 2,
      icons: () => ReportBottom({}),
      link: "/report",
      text: "Отчеты",
      items: [
        {
          id: 22,
          link: "/report",
          text: "Отчёт",
        },
        {
          id: 23,
          link: "/report-monthly",
          text: "Ежемесячный отчет",
        },
      ],
    },
    {
      id: 14,
      icons: () => TransferIcons(),
      link: "/transfers",
      text: "Трансферы",
    },
  ],
  7: [
    {
      id: 1,
      icons: () => ReportBottom({}),
      link: "/report",
      text: "Отчеты",
      items: [
        {
          id: 22,
          link: "/report",
          text: "Кассовый учёт",
        },
        {
          id: 23,
          link: "/report-item-2",
          text: "Финансовый учёт",
        },
        {
          id: 24,
          link: "/report-item-3",
          text: "Снабжение и документооборот",
        },
      ],
    },
    {
      id: 2,
      icons: () => PartiesIcons(),
      link: "/parties",
      text: "Партии",
    },
    {
      id: 3,
      icons: () => TransferIcons(),
      link: "/transfers",
      text: "Трансферы",
    },
    {
      id: 4,
      icons: () => ProductIcons(),
      link: "/products",
      text: "Продукты ",
    },
    {
      id: 5,
      icons: () => BronedIcons(),
      link: "/broned",
      text: "broned",
    },
    {
      id: 6,
      icons: () => HikVision(),
      link: "/hik-vision",
      text: "Hik Vision",
    },
    {
      id: 7,
      icons: () => PersonsIcons(),
      link: "/user",
      text: "user",
    },
    {
      id: 8,
      icons: () => PriceIcons({}),
      link: "/price",
      text: "Цени и скидки",
    },
    {
      id: 9,
      icons: () => ProductsCheck(),
      link: "/product-check",
      text: "Проверка продукта",
    },
    {
      id: 10,
      icons: () => QRCodeIcon(),
      link: "/qrcode",
      text: "Генерация QR-кодов",
    },

    {
      id: 11,
      icons: () => DataLibrary({}),
      link: "/data-library",
      text: "data-library",
    },
  ],
  8: [
    {
      id: 1,
      icons: () => ProductsOnSaleIcon(),
      link: "/products",
      text: "Продукты в продаже",
    },
    {
      id: 2,
      icons: () => OrderIcons(),
      link: "/order",
      text: "Заказы",
    },
    {
      id: 3,
      icons: () => NotPublishedIcons(),
      link: "/not-published-products",
      text: "Не опубликованные",
    },
    {
      id: 4,
      icons: () => ReportBottom({}),
      link: "/report",
      text: "Отчеты",
      items: [
        {
          id: 22,
          link: "/report",
          text: "Кассовый учёт",
        },
        {
          id: 23,
          link: "/report-item-2",
          text: "Финансовый учёт",
        },
        {
          id: 24,
          link: "/report-item-3",
          text: "Снабжение и документооборот",
        },
      ],
    },
    {
      id: 5,
      icons: () => ClientsIcon(),
      link: "/clients",
      text: "Клиенты",
    },
    {
      id: 6,
      icons: () => PriceIcons({}),
      link: "/price",
      text: "Цени и скидки",
    },
    {
      id: 7,
      icons: () => ProductCharacteristics(),
      link: "/product-characteristics",
      text: "Характеристика продуктов",
    },

    {
      id: 8,
      icons: () => QRCodeIcon(),
      link: "/qr-code",
      text: "QR-логотип",
    },
    {
      id: 9,
      icons: () => TransferIcons(),
      link: "/transfers",
      text: "Трансферы",
    },
    {
      id: 10,
      icons: () => SettingsIcon(),
      link: "/settings",
      text: "Настройка",
    },
  ],
  9: [
    {
      id: 2,
      icons: () => ReportBottom({}),
      link: "/report",
      text: "Отчеты",
      items: [
        {
          id: 22,
          link: "/report",
          text: "Кассовый учёт",
        },
        {
          id: 23,
          link: "/report-finance",
          text: "Финансовый учёт",
        },
        {
          id: 24,
          link: "/report/item-3",
          text: "Снабжение и документооборот",
        },
      ],
    },
    {
      id: 3,
      icons: () => BuildingIcons(),
      link: "/filial",
      text: "Филиалы",
    },
    {
      id: 4,
      icons: () => UfoBottom(),
      link: "/dealer",
      text: "Дилеры",
    },
    {
      id: 4,
      icons: () => PriceIcons({}),
      link: "/price",
      text: "Цени и скидки",
    },
    {
      id: 3,
      icons: () => BronedIcons(),
      link: "/broned",
      text: "Бронированные",
    },
    {
      id: 3,
      icons: () => PartiesIcons(),
      link: "/parties",
      text: "Партии",
    },
    {
      id: 2,
      icons: () => ProductIcons(),
      link: "/products",
      text: "Продукты в продаже",
    },
    {
      id: 3,
      icons: () => WareHouseIcons(),
      link: "/warehouse",
      text: "Склады",
    },
    {
      id: 3,
      icons: () => TransferIcons(),
      link: "/transfers",
      text: "Трансферы",
    },
    {
      id: 3,
      icons: () => ProductsCheck(),
      link: "/product-check",
      text: "Проверка продукта",
    },
    {
      id: 3,
      icons: () => ClientsIcon(),
      link: "/client",
      text: "Клиенты",
    },
    {
      id: 4,
      icons: () => DataLibrary({}),
      link: "/data-library",
      text: "Справочника",
    },
  ],
  10: [
    {
      id: 4,
      icons: () => UfoBottom(),
      link: "/dealer",
      text: "Дилеры",
    },
    {
      id: 4,
      icons: () => PriceIcons({}),
      link: "/price",
      text: "Цени и скидки",
    },
  ],
  11: [
    {
      id: 4,
      icons: () => PersonsIcons(),
      link: "/user",
      text: "user",
    },
  ],
};
