
import { Bookmark, RectangleVertical, ShoppingCart } from "lucide-react";
import { useQueryState } from "nuqs";
import { useNavigate } from "react-router-dom";


interface ICarpetCard {
    id:string;
    className?:string;
    model:string;
    size:string;
    count:string;
    img:string;
    price:string;
    color:string;
    colaction:string;
    discount?:string;
    carpetType:string;
    isBron?:boolean;

}

export default function CarpetCard({className,id,isBron,discount,model,carpetType,size,price,count,img,colaction,color}:ICarpetCard) {
    const [ ,setCarpetType] = useQueryState("carpetType");
    const navigate = useNavigate()
  return (
    <div className={`w-full relative bg-sidebar border-border border ${className && className}`}>
        <div className="flex ">
            <p className="p-2 w-full text-[12px] text-primary text-center border-border border-r">{model}</p>
            <p className="p-2 w-full text-[12px] text-primary text-center border-border border-r">{size}</p>
            <p className="p-2 w-full text-[12px] text-primary text-center">{count}x</p>
        </div>
        <div onClick={()=>navigate(`/carpet/${id}`)}  className="w-full relative ">
            <p className="bg-sidebar text-primary font-bold absolute left-0.5 top-0.5 p-1">{colaction}</p>
            <img className="w-full" style={{aspectRatio:"0.67/1"}}  src={img }/>
            <p className="text-primary absolute left-3 bottom-1">{color}</p>
        </div>
       <p className="flex gap-2 items-center px-1.5"> <RectangleVertical className="text-primary w-4"/>{price}$</p>
            {
                discount ? <div>
                 <div className="w-[46px] cursor-pointer absolute right-0 bottom-[46px] bg-[#FF5E45] text-sidebar h-[46px] flex items-center justify-center">
                    -{discount}%
                </div>
                </div>:""
            }
      {isBron?
        <div  onClick={(e)=>{
            e.stopPropagation()
            setCarpetType(carpetType||null)
            }} className="w-[46px] cursor-pointer absolute right-0 bottom-0 bg-[#FF7700] text-background h-[46px] flex items-center justify-center">
        <Bookmark className="text-white w-[24px]"/>
       </div>
        :
       <div  onClick={(e)=>{
        e.stopPropagation()
        setCarpetType(carpetType||null)
        }}  className="w-[46px] cursor-pointer absolute right-0 bottom-0 bg-primary text-background h-[46px] flex items-center justify-center">
        <ShoppingCart/>
       </div>}
    </div>

  )
}
