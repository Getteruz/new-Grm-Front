import  { PropsWithChildren } from "react";
import { Skeleton } from "./ui/skeleton";
import { TSelectOption } from "@/types";
import { Button } from "./ui/button";
import {  Edit2, Loader, Plus, Trash2 } from "lucide-react";
import {  UseFormSetValue } from "react-hook-form";
import { parseAsString, useQueryState } from "nuqs";

interface  iOpetion extends  TSelectOption {
    count?:number;
    onClick?:()=>void;
    isActive?:boolean;
    onDelete?:()=>void;
}

interface ITableWrapper extends PropsWithChildren {
    title: string;
    className?:string;
    options?:iOpetion[];
    isloading?:boolean;
    isAdd?:boolean;
    isPending?:boolean ;
    setValue?:UseFormSetValue<any>;
  }
  
export default function TableWrapper({className,isPending,title,setValue,isAdd,children,options,isloading}:ITableWrapper) {

  const [,setidMadal] = useQueryState("idMadal",parseAsString.withDefault('new'))
  return (
    <div className={`${className && className} w-full  `}>
      <div className="w-full flex h-[64px] items-center justify-between border-border border-solid border-b p-[21.22px] bg-sidebar">
        <h4 className="text-[14px] font-semibold text-foreground">{title}</h4>
        {isAdd ?<>
        {
          isPending ? <Loader className="animate-spin" />:<Button type="submit" className="border-none" variant={"outline"}><Plus/></Button>
        }</>:""}
      </div>
      {children}
        <div className="p-3">
            {
              isloading ?  Array.from({ length: 4 })?.map(()=>(
                    <Skeleton className="h-10 mb-2 rounded-none w-full" />
                )):""}
            {options&& options?.map((e:iOpetion)=>(
                <p key={e?.value} onClick={e?.onClick && e.onClick} className={`${e?.isActive ?"bg-sidebar":""} group text-foreground flex items-center justify-between cursor-pointer mb-1 text-[14px]  hover:bg-sidebar px-3  py-2.5`}>
                    {e.label}
                       {e?.count && <span className={`bg-[#FFA500]  p-0.5 text-[10px]`}>+{e?.count}</span>}
                       {isAdd  && <div className="group-hover:flex items-center gap-1.5  hidden">
                        <span onClick={e?.onDelete && e.onDelete}
                         className=" p-0.5 ml-auto text-[10px]"
                         >
                          <Trash2 size={14}/>
                         </span>
                        <span onClick={()=>{
                        setidMadal(e?.value)
                        if(setValue) setValue("title",e?.label)
                        }} className=" p-0.5 text-[10px]"><Edit2 size={14}/></span>
                       </div>}
                </p>
            ))}
          
        </div>
    </div>
  )
}
