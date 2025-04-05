import {
  BasketIcons,
  BronedIcons,
    BuildingIcons,
    DataLibrary,
    DeviceDesktopIcons,
    HomeIcons,
    PartiesIcons,
    PersonsIcons,
    ReportBottom,
    UfoBottom,
    WareHouseIcons,
  } from "../../components/icons";
  
  // {
  //   OTHER = 0,
  //   CLIENT = 1,
  //   SELLER = 2,
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
    admin:[
        {
          id: 1,
          icons: ()=>HomeIcons(),
          link: "/cashier/home",
          text:"cashier"
        },
        {
          id: 14,
          icons: ()=>HomeIcons(),
          link: "/transfers",
          text:"transfers"
        },
       
        {
          id: 13,
          icons: ()=>HomeIcons(),
          link: "/crops",
          text:"crops",
          items:[
            {
              id: 12,
              link: "/crops",
              text:"crops1",
            },
            {
              id: 13,
              link: "/crops/item-2",
              text:"crops1",
            },
            {
              id: 14,
              link: "/crops/item-3",
              text:"crops1",
            },
          ]
        },
        {
          id: 12,
          icons: ()=>HomeIcons(),
          link: "/broned",
          text:"broned"
        },
        {
          id: 2,
          icons: ()=>BuildingIcons(),
          link: "/product",
           text:"product"
        },
        {
          id: 3,
          icons: ()=>BuildingIcons(),
          link: "/bugalteriya/data-library",
           text:"bugalteriya"
        
         },
         
        {
          id: 4,
          link: "/parties",
          icons: ()=>WareHouseIcons(),
           text:"parties"
        },
        
      ],
      3:[
        {
          id: 1,
          icons: ()=>DeviceDesktopIcons(),
          link: "/cashier/home",
           text:"cashier/home"
        },
        {
          id: 2,
          icons: ()=>ReportBottom(),
          link: "cashier/report",
           text:"Отчёт кассира"
        },
      {
        id: 3,
        icons: ()=>BasketIcons(),
        link: "/new",
         text:""
      },
      ],
      4:[
         {
          id: 2,
          icons: ()=>BuildingIcons(),
          link: "/product",
           text:"product"
        },
        {
          id: 3,
          icons: ()=>BronedIcons(),
          link: "/broned",
          text:"broned"
        },
        {
          id: 14,
          icons: ()=>HomeIcons(),
          link: "/transfers",
          text:"transfers"
        },
       
        {
          id: 4,
          icons: ()=>DataLibrary(),
          link: "/data-library",
          text:"data-library"
        },
      ],
      9:[
        
        {
          id: 2,
          icons: ()=>ReportBottom(),
          link: "/report",
          text:"report",
          items:[
            {
              id: 22,
              link: "/report",
              text:"Кассовый учёт",
            },
            {
              id: 23,
              link: "/report/item-2",
              text:"Финансовый учёт",
            },
            {
              id: 24,
              link: "/report/item-3",
              text:"Снабжение и документооборот",
            },
          ]
        },
        {
          id: 3,
          icons: ()=>BuildingIcons(),
          link: "/filial",
          text:"filial"
        },
        {
          id: 4,
          icons: ()=>UfoBottom(),
          link: "/deller",
          text:"deller"
        },
        {
          id: 3,
          icons: ()=>BronedIcons(),
          link: "/broned",
          text:"broned"
        },
        {
          id: 3,
          icons: ()=>PartiesIcons(),
          link: "/parties",
          text:"parties"
        },
        {
          id: 2,
          icons: ()=>BuildingIcons(),
          link: "/product",
           text:"product"
        },
        
        {
          id: 4,
          icons: ()=>DataLibrary(),
          link: "/data-library",
          text:"data-library"
        },
        
      ],
      11:[
      
        {
          id: 2,
          icons: ()=>HomeIcons(),
          link: "/monitoring",
          text:"monitoring"
          },
        {
          id: 4,
          icons: ()=>PersonsIcons(),
          link: "/user",
          text:"user"
        },
      ]
}
  