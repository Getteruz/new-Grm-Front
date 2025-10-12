import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import Statistics from "@/components/filters-ui/statistics";
import { BrCodeIcons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { apiRoutes } from "@/service/apiRoutes";
import api from "@/service/fetchInstance";
import { useMeStore } from "@/store/me-store";
import { useMutation } from "@tanstack/react-query";
import { FileOutput, Loader } from "lucide-react";


// /excel/product/excel/new
export default function Filters() {
const {meUser} = useMeStore()
  const { mutate: exelMudate,isPending } = useMutation({
    mutationFn: async () => {
  
      const blob = await api.get(apiRoutes.excelProductExcelNew + `?filialId=${meUser?.filial?.id}` , {
        responseType: "blob",
      });
      if (!(blob.data instanceof Blob)) {
        throw new Error("Received data is not a Blob");
      }
      const blobUrl = window.URL.createObjectURL(blob.data);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    },
  });

  return (
    <div className=" gap-2 mb-4 px-[20px] h-[64px] flex ">
      <SearchInput />
      <Button
        className="h-full w-[63px] bg-card hover:bg-card rounded-xl  justify-center font-[16px] gap-1  border-0 "
        variant={"outline"}
      >
        <BrCodeIcons />
      </Button>
      {/* <FilterSelect placeholder="Фильтр" name="news" /> */}
      <FilterSelect 
        placeholder="Продукт"
        className=" w-[150px]"
        defaultValue="collections"
        options={[
          { label: "Продукт", value: "product"},
          { label: "Коллекция", value: "collections" }
        ]}
        name="collection" 
      />

    
      <FilterSelect 
        placeholder="Лист" 
        className="w-[150px]" 
        name="card"
        defaultValue="list"
        options={[
          { label: "Лист", value: "list"},
          { label: "Карточкы", value: "card" }
        ]}
      />
      <Statistics />
      <Button
      onClick={()=>exelMudate()}
        className="h-full border-0 bg-card rounded-xl hover:bg-card w-[140px]  ml-auto"
        variant={"outline"}
      >
       {isPending? <Loader className="animate-spin"/>:<FileOutput />}   Экспорт
      </Button>
    </div>
  );
}
