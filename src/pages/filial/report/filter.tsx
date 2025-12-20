
// import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import { UpdatePatchData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function Filters() {
  const { id } = useParams();
  return (
    <div className="  px-[20px] h-[64px]   bg-background  flex w-full  gap-2 mb-2  sticky top-0 z-50">
      <SearchInput  className="mr-auto"/>
      {/* <FilterSelect placeholder="Фильтр" name="news" /> */}
      <Button
        className="h-full  bg-white   hover:bg-white"
        variant={"secondary"}
        onClick={() => 
        {
          UpdatePatchData(
            apiRoutes.filialMakeReport,
            id ||"",
            {}
          )
            .then(() => toast.success("Переучёт отправлен"))
        }}
      >
        Запросить переучёт
      </Button>
    </div>
  );
}
