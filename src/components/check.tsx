interface ICheckList{
    title:string;   

export default function CheckList({title}:ICheckList) {
  return (
    <div className='w-full bg-background p-5 mb-[25px]'>
        <h3 className="text-center text-primary font-bold text-[18px]">{title}</h3>
        <p className="text-primary text-center text-[9px] ">Вс, Май 5, 2024 • 20:07:53</p>
        <div className="flex items-center text-primary boder-border border-dashed border-b text-[11px] mt-[9px] pb-4 justify-between">
            <p >Способ оплаты</p>
            <p >Терминал, Наличие</p>
        </div>
        <ul>
            <li className="flex items-center text-primary text-[11px] mt-[14px] mb-[9px]  ">
                <p className="w-full">Aspendos</p>
                <p className="w-full text-end">200x300</p>
                <p className="w-full text-end">2x</p>
                <p className="w-full text-end">264$</p>
            </li> 
            <li className="flex items-center text-primary text-[11px]  mb-[9px]">
                <p className="w-full">Emirald Sanat</p>
                <p className="w-full text-end">100x780</p>
                <p className="w-full text-end">1x</p>
                <p className="w-full text-end">117$</p>
            </li> 
        </ul>
        <div className="flex items-center text-primary text-[14px] mt-[19px] pb-2 justify-between">
            <p>Итого</p>
            <p>381 $</p>
        </div>
        <ul className="boder-border border-dashed border-y  pt-[11px] pb-[24px]">
            <li className="flex items-center text-primary text-[11px] mt-[14px] mb-[9px]  ">
                <p className="w-full">Продавец:</p>
                <p className="w-full text-end">264$</p>
            </li> 
            <li className="flex items-center text-primary text-[11px]  mb-[9px]">
                <p className="w-full">Адресс:</p>
                <p className="w-full text-nowrap text-end">г.Ташкент, ул.Фарабий 1 дом</p>
            </li> 
        </ul>
        <p className="w-full text-[11px] mt-[11px] text-primary">Адресс</p>
    </div>
  )
}
