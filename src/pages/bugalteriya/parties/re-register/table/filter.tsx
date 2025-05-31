import { FileOutput } from "lucide-react";
import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import FileExelUpload from "@/components/file-upload";
import { useParams } from "react-router-dom";


export default function Filters() {
  const {id} = useParams()

  return (
    <div className="bg-sidebar border-border border-b  px-[51px] h-[64px]   flex  ">
      <SearchInput className="border-border border-r" />
      <FilterSelect
        className="border-border max-w-[150px] w-full border-r"
        options={[
          { label: "Накладной", value: "переучет" },
          { label: "Оприходован", value: "дефицит" },
          { label: "Розница", value: "излишки" },
        ]}
        placeholder="Переучёт"
        name="type"
      />
      <FileExelUpload partiyaId={id ||""}/>
    
      <Button className="h-full  border-y-0  " variant={"outline"}>
        <FileOutput /> Отправить на приходование 
      </Button>
    </div>
  );
}
