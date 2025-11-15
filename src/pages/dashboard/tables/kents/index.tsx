import Filters from './filters'

export default function KentsTable() {
    const data:any={}
  return (
    <>
        <Filters/>
        <div className="bg-[#EEEEEE] flex">
            <p className=" p-[25px] border-border border-r  text-[17px] w-full">Итого</p>
            <p className=" p-[25px] border-border border-r  text-[17px] w-full">{data?.pages?.[0]?.meta.totals?.totalKv || 0}$ м²</p>
            <p className=" p-[25px] border-border border-r  text-[17px] w-full">{data?.pages?.[0]?.meta.totals?.totalPrice||0}м²</p>
            <p className=" p-[25px]  text-[17px] w-full">{data?.pages?.[0]?.meta.totals?.totalCount || 0} шт</p>
        </div> 
    </>
  )
}
