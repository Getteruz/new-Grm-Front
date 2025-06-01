import { FileOutput } from "lucide-react";
import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import FileExelUpload from "@/components/file-upload";
import { useParams } from "react-router-dom";


export default function Filters() {
  const {id} = useParams()

  return (
    <div className="bg-sidebar border-border border-b h-[64px]   flex  ">
      <SearchInput className="border-border border-r" />
      <FilterSelect
        className="border-border max-w-[150px] w-full border-r"
        options={[
          { label: "Накладной", value: "new" },
          { label: "Оприходован", value: "переучет" },
          { label: "Розница", value: "излишки" },//дефицит
        ]}
        placeholder="Накладной"
        name="tip"
      />
      <FilterSelect
        className="border-border max-w-[150px] w-full border-r"
        options={[
          { label: "Коллекция", value: "collection" },
          { label: "Продукт", value: "default" },
        ]}
        defaultValue="default"
        placeholder="Коллекция"
        name="type"
      />
      <FileExelUpload partiyaId={id ||""}/>
    
      <Button className="h-full ml-auto  border-y-0  " variant={"outline"}>
        <FileOutput /> Отправить на приходование 
      </Button>
    </div>
  );
}
