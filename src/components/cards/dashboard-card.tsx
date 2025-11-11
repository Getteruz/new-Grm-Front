import { PropsWithChildren } from "react";


interface DashboardCardProps extends PropsWithChildren {
    className?: string;
    title:string,
    icons:any,
    price:string,
    price2:string,
  }
export default function DashboardCard({
    title,
    icons,
    price,
    price2,
    children,
    className = ""
}:DashboardCardProps) {
  return (
    <div className={`${className} p-[30px] rounded-2xl bg-white border-border border`}>
        <div className="flex items-center mb-auto justify-between"> 
            <p className="text-[17px]">{title}</p>
            {icons()}
        </div>
        {children}
        <p className="text-[15px]">{price}</p>
        <p className="text-[24px] mt-1">{price2}</p>
    </div>
  )
}
