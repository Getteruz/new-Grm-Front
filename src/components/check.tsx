import { IData } from "@/pages/cashier/home/type";
import { useMeStore } from "@/store/me-store";
import { format } from "date-fns";

interface ICheckList{
    selected:IData[]  
}
export default function CheckList({selected}:ICheckList) {
    const {meUser} = useMeStore() 
    const price =selected?.reduce((a,b)=> a + b.price, 0)
  return (
    <div className='w-full bg-background p-5 mb-[25px]'>
        <h3 className="text-center text-primary font-bold text-[18px]">{meUser?.filial?.name}</h3>
        <p className="text-primary text-center text-[9px] ">{format
    (new Date(), 'EEE, MMM d, yyyy • HH:mm')}</p>
        <div className="flex items-center text-primary boder-border border-dashed border-b text-[11px] mt-[9px] pb-4 justify-between">
            <p >Способ оплаты</p>
            <p >Терминал, Наличие</p>
        </div>
        <ul>
           {
            selected && selected.map((item, index)=>(
                <li key={index} className="flex items-center text-primary text-[11px] mt-[14px] mb-[9px]  ">
                <p className="w-full">{String(item?.product?.bar_code?.collection?.title || '')}</p>
                <p className="w-full text-end">{item?.product?.bar_code?.size?.title}</p>
                <p className="w-full text-end">{item?.x}x</p>
                <p className="w-full text-end">{item?.price}$</p>
            </li> 
            ))
           }
          
        </ul>
        <div className="flex items-center text-primary text-[14px] mt-[19px] pb-2 justify-between">
            <p>Итого</p>
            <p>{price} $</p>
        </div>
        <ul className="boder-border border-dashed border-y  pt-[11px] pb-[24px]">
          
            <li className="flex items-center text-primary text-[11px]  mb-[9px]">
                <p className="w-full">Адресс:</p>
                <p className="w-full text-nowrap text-end">{meUser?.filial?.address}</p>
            </li> 
        </ul>
        <p className="w-full text-[11px] mt-[11px] text-primary">Благодарим за покупку ковра в нашем магазине! Пусть новый приобретенный товары приносит вам радость и уют в ваш дом!</p>
    </div>
  )
}
