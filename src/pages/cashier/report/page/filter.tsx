import {
  CircleX,
  FileOutput,
  SquareCheckBig,
  SquarePen,
  Tornado,
} from "lucide-react";

import FilterSelect from "@/components/filters-ui/filter-select";
import { Button } from "@/components/ui/button";
import qs from "qs";
import { useQueryState } from "nuqs";
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
export default function Filters({ countLength }: { countLength: number }) {
  const [id] = useQueryState("id");

  const { mutate: exelMudate } = useMutation({
    mutationFn: async () => {
      const query = {
        // reportId: myCashFlow && !FManagerCashFlow ? id : undefined,
        kassaId: id || undefined,
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
    <div className="w-full  sticky top-0 flex h-[40px] bg-sidebar">
      {id ? (
        <FilterSelect
          options={SortSingle}
          className="max-w-[426px] bg-primary text-[#E6E6D9]  w-full text-[20px]"
          classNameValue="bg-red-200"
          placeholder="Все операции"
          classNameContainer="bg-primary text-[#E6E6D9]"
          classNameItem="bg-[#5D5D53CC] hover:bg-[#5D5D53CC] p-4 text-[20px]"
          defaultValue="Все"
          name="sortSingle"
        />
      ) : (
        <FilterSelect
          options={Sort}
          className="max-w-[426px] bg-primary text-[#E6E6D9]  w-full text-[20px]"
          classNameValue="bg-red-200"
          placeholder="Все операции"
          classNameContainer="bg-primary text-[#E6E6D9]"
          classNameItem="bg-[#5D5D53CC] hover:bg-[#5D5D53CC] p-4 text-[20px]"
          defaultValue="open"
          name="sort"
        />
      )}
      <Button
        className="h-full border-l-1 text-primary justify-center gap-1 w-[60px] border-y-0 border-r-0"
        size={"icon"}
        variant={"outline"}
      >
        <SquareCheckBig />
        {countLength}
      </Button>
      <Button
        className="h-full border-l-1 text-primary justify-center gap-1 w-[60px] border-y-0 border-r-0"
        size={"icon"}
        variant={"outline"}
      >
        <CircleX />
      </Button>
      <Button
        className="h-full border-l-1 text-primary justify-center gap-1 w-[60px] border-y-0 border-r-0"
        size={"icon"}
        variant={"outline"}
      >
        <SquarePen />
      </Button>
      <Button
        className="h-full  border-l-1 text-primary justify-center gap-1 px-4 border-y-0 "
        variant={"outline"}
      >
        <Tornado />
        Фильтр
      </Button>

      {id ? (
        <Button
          onClick={() => exelMudate()}
          className="h-full ml-auto  border-l-1 text-primary justify-center gap-1 px-4 border-y-0 border-r-0"
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
