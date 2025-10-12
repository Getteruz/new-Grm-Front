import {
  FileOutput,
 
} from "lucide-react";

import FilterSelect from "@/components/filters-ui/filter-select";
import { Button } from "@/components/ui/button";
import qs from "qs";
import { parseAsString, useQueryState } from "nuqs";
import api from "@/service/fetchInstance";
import { apiRoutes } from "@/service/apiRoutes";
import { useMutation } from "@tanstack/react-query";
const Sort = [
  {
    label: "Открытый",
    value: "open",
  },
  {
    label: "В ожидание подтверждения",
    value: "closed_by_c",
  },
  {
    label: "Подтверждённые",
    value: "accepted",
  },
  {
    label: "Отменённые",
    value: "rejected",
  },
];

const SortSingle = [
  {
    label: "Все",
    value: "Все",
  },
  {
    label: "Расход",
    value: "Расход",
  },
  {
    label: "Приход",
    value: "Приход",
  },
];
export default function Filters({ kassaId}: { countLength: number,kassaId:string | undefined }) {
  const [id] = useQueryState("id");
  const [sort] = useQueryState(
    "sort",
    parseAsString.withDefault("open")
  );
  const { mutate: exelMudate } = useMutation({
    mutationFn: async () => {
      const query = {
        // reportId: myCashFlow && !FManagerCashFlow ? id : undefined,
        kassaId: sort == "open" ? kassaId: id || undefined,
      };
      const params = query
        ? `?${qs.stringify(query, { arrayFormat: "repeat" })}`
        : "";
      const blob = await api.get(apiRoutes.excelCashflowsExcel + params, {
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
    <div className="w-full mb-2 sticky top-0 flex gap-3  h-[50px] ">
      {id ? (
        <FilterSelect
          options={SortSingle}
          className="max-w-[426px] rounded-xl bg-primary text-[#E6E6D9]  w-full text-[20px]"
          classNameValue="bg-red-200"
          placeholder="Все операции"
          classNameContainer="bg-primary text-[#E6E6D9]"
          classNameItem="bg-primary p-4 text-[20px]"
          defaultValue="Все"
          name="sortSingle"
        />
      ) : (
        <FilterSelect
          options={Sort}
          className="max-w-[426px] rounded-xl bg-primary text-[#E6E6D9]  w-full text-[20px]"
          classNameValue="bg-red-200"
          placeholder="Все операции"
          classNameContainer="bg-primary text-[#E6E6D9]"
          classNameItem="bg-bg-primary p-4 text-[20px]"
          defaultValue="open"
          name="sort"
        />
      )}
    
      {/* <Button
        className="h-full border-l-1 text-primary justify-center gap-1 w-[60px] border-y-0 border-r-0"
        size={"icon"}
        variant={"outline"}
      >
        <SquarePen />
      </Button> */}
      {/* <Button
        className="h-full  border-l-1 text-primary justify-center gap-1 px-4 border-y-0 "
        variant={"outline"}
      >
        <Tornado />
        Фильтр
      </Button> */}

      {sort === "open"  || Boolean(id)  ? (
        <Button
          onClick={() => exelMudate()}
          className="h-full ml-auto  bg-card hover:bg-card rounded-xl  text-primary justify-center gap-1 px-4 border-0"
          variant={"outline"}
        >
          <FileOutput /> Экспорт
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
