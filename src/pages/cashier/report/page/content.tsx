import CarpetCashierCard from "@/components/cards/carpet-cashier-card";
import Filters from "./filter";
import Pricecheck from "./price-check";
import CardSort from "@/components/card-sort";

export default function Content() {
  return (
    <div className="flex ">
      <div className="w-full">
        <Filters/>
        <CardSort/>
        <div className="my-[13px] mx-[30px]">
      
        </div>
      </div>
      <Pricecheck/>
    </div>
  )
}
