import CarpetCashierCard from "@/components/cards/carpet-cashier-card";
import Filters from "./filter";
import Pricecheck from "./price-check";
import { IData } from "../type";
import { useState } from "react";

export default function Content({orderList}:{orderList:IData[]}) {
  const [selected, setSelected] =useState<IData[]>([])

  return (
    <div className="flex ">
      <div className="w-full">
        <Filters countLength={selected.length }/>
        <div className="my-[13px] h-[calc(100vh-160px)]  overflow-y-scroll mx-[40px]">
          <p className="pb-3 font-medium text-primary text-[15px]">12-Mart</p>
     {
      orderList &&  orderList?.map((item, index) => {
          return   <CarpetCashierCard 
          key={index}
          className="mb-1"
          onCheckedChange={(e)=>{
            setSelected((prev)=>{
              if(e){
                return [...prev, item]
              }else{
                return prev.filter((e)=>e.id !== item.id)
              }
            })
          }}
          tags={[
            item?.product?.bar_code?.isMetric ? "Метражный":"Штучный",
            item?.product?.bar_code?.shape?.title,
            item?.product?.bar_code?.style?.title,
            item?.product?.bar_code?.color?.title,
            item?.product?.bar_code?.country?.title,
            item?.product?.partiya_title,
            ]} 
          discount={item?.discountPercentage === null ? "~" : `-${item?.discountPercentage}%`} 
          id={item?.id } 
          img="/images/image.png" 
          model={item?.product?.bar_code?.model?.title}
          size={item?.product?.bar_code?.size?.title}
          count={item?.x+'x'}
          status={item?.status}
          seller={item?.seller}
          price={item?.price+'$'}
          priceMitr={item?.product?.collection_price?.priceMeter ? item?.product?.collection_price?.priceMeter  +"$": 0 +"$"}
          colaction={item?.product?.bar_code?.collection?.title}
          color="Beige"
          />
        })
     }
        </div>
      </div>
      <Pricecheck selected={selected}/>
    </div>
  )
}
