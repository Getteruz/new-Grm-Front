import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import { UpdatePatchData } from "@/service/apiHelpers";
import { useMeStore } from "@/store/me-store";
import { EditIcon, FileOutput, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Filters() {
  const {meUser} = useMeStore()
  const navigate = useNavigate();
  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px]   flex   ">
      <SearchInput/>
      <FilterSelect  options={[
        {label:"Личные",value:"излишки"},
        {label:"Недостатки",value:"дефицит"},
        {label:"Переучёт",value:"переучет"},
        {label:"Остатки",value:"all"}
        ]} placeholder="Оприходован" name="type"/>
      <Button  className="h-full border-l-1  ml-auto justify-center font-[16px] gap-1  border-y-0  border-r-0" 
       variant={"outline"} > 
       <EditIcon/>
      </Button>
      <Button  className="h-full border-l-1  justify-center font-[16px] gap-1  border-y-0  border-r-0" 
       variant={"outline"} > 
       <Trash2/>
      </Button>
      <Button onClick={()=>{
        if(meUser?.filial?.id){
          UpdatePatchData('/product/close-report', meUser?.filial?.id,{})
         .then(()=>{
          toast.success('Переучёт отправлен')
          navigate('/monitoring')
         })
         .catch(()=>toast.error("что-то пошло не так"))
        }
        }}
            className="h-full border-l-0 border-y-0 w-[140px]"  variant={"outline"} ><FileOutput/> Сохранить</Button>
    </div>
  );
}
