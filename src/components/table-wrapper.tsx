import  { PropsWithChildren } from "react";
import { Skeleton } from "./ui/skeleton";
import { TSelectOption } from "@/types";

interface  iOpetion extends  TSelectOption {
    count?:number;
    onClick?:()=>void;
}

interface ITableWrapper extends PropsWithChildren {
    title: string;
    className?:string;
    options?:iOpetion[];
    isloading?:boolean;
  }
  
export default function TableWrapper({className,title,children,options,isloading}:ITableWrapper) {
  return (
    <div className={`${className && className} w-full  `}>
        <h4 className="text-[14px] border-border border-solid border-b p-[21.22px] bg-sidebar font-semibold text-foreground">{title}</h4>
        <div className="p-3">
            {
              isloading ?  Array.from({ length: 4 })?.map(()=>(
                    <Skeleton className="h-10 mb-2 rounded-none w-full" />
                )):""}
            {options&& options?.map((e:iOpetion)=>(
                <p key={e?.value} onClick={e?.onClick && e.onClick} className={"text-foreground flex items-center justify-between cursor-pointer mb-1 text-[14px]  hover:bg-sidebar px-3  py-2.5"}>
                    {e.label}
                       {e?.count && <span className="bg-[#FFA500] p-0.5 text-[10px]">+{e?.count}</span>}
                </p>
            ))}
            {children}
        </div>
    </div>
  )
}
