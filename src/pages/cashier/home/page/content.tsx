import CarpetCashierCard from "@/components/cards/carpet-cashier-card";
import Filters from "./filter";
import Pricecheck from "./price-check";
import { IData } from "../type";

const Ids = [ 1,2,3,4,5,6,7,8,9,10]
export default function Content({}:{orderList:IData[]}) {
  return (
    <div className="flex ">
      <div className="w-full">
        <Filters/>
        <div className="my-[13px] h-[calc(100vh-160px)]  overflow-y-scroll mx-[40px]">
          <p className="pb-3 font-medium text-primary text-[15px]">12-Mart</p>
     {
        Ids.map((item, index) => {
          return   <CarpetCashierCard 
          key={index}
          className="mb-1"
          tags={['tags','news',"hello","what"]} 
          discount={"5"} 
          id={item } 
          img="/images/image.png" 
          model="M39A" 
          size="100X150" 
          count="1" 
          price="170" 
          colaction="Sanat Montreal" 
          color="Beige"
          />
        })
     }
        </div>
      </div>
      <Pricecheck/>
    </div>
  )
}
