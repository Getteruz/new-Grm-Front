
import {
    BuildingIcons,
    HomeIcons,
    WareHouseIcons,
  } from "../../components/icons";
  

export const DataMenu = {
    admin:[
        {
          id: 1,
          icons: ()=>HomeIcons(),
          link: "/dashboard",
          text:"dashboard"
        },
        {
          id: 1,
          icons: ()=>HomeIcons(),
          link: "/transfers",
          text:"transfers"
        },
       
        {
          id: 1,
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
          id: 1,
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
        // {
        //   id: 5,
        //   icons: <TimeSheetIcons />,
        // },
        // {
        //   id: 6,
        //   icons: <PersonalDetailsIcons />,
        // },
        // {
        //   id: 7,
        //   icons: <PriceIcons />,
        // },
        // {
        //   id: 8,
        //   icons: <SaleIcons />,
        // },
        // {
        //   id: 9,
        //   icons: <QrcodeIcons />,
        // },
      ],
      user:[]
}
  