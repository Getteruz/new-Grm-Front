import { FileOutput } from "lucide-react";

import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TData } from "../type";

export default function Filters({SortData}:{SortData?:TData}) {
  const { id } = useParams();


  return (
    <div className="bg-sidebar border-border border-b  px-[20px] h-[64px] items-center  flex   ">
      {id ? (
        <p className="text-[#272727] text-[20px] mr-auto">{SortData?.fullName}</p>
      ) :""}
     {id ? <Button
        className="h-full  border-y-0 w-[140px]  ml-auto"
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button>:""}
    
    </div>
  );
}
