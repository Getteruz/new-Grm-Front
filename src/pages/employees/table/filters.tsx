import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import { usefilialWarehouseFetch } from "@/pages/reports/m-manager/remaider/queries";
import { useMeStore } from "@/store/me-store";
import { Archive, FileOutput, Plus, Store, Trash2 } from "lucide-react";
import { useQueryState } from "nuqs";

export default function Filters() {
  const [, setId] = useQueryState("id");

  const { data } = usefilialWarehouseFetch({
    queries: { limit: 50 },
  });
  const filialOption =
    data?.pages[0]?.items?.map((e) => ({
      label: e?.name,
      value: e?.id,
    })) || [];
  const { meUser } = useMeStore();

  return (
    <div className="bg-sidebar border-border border-b  px-[20px] h-[64px]   flex   ">
      <SearchInput className="w-full border border-y-0 border-l-0 border-r mr-4" />
      {meUser?.position.role == 11 ? (
        <FilterSelect
          icons={<Store />}
          className="w-full max-w-[170px]"
          placeholder="Филиалы"
          name="filial"
          options={[{ label: "Все", value: "all" }, ...filialOption]}
        />
      ) : (
        ""
      )}
      <Button className="h-full  border-y-0 w-[64px]" variant={"outline"}>
        <Trash2 />
      </Button>
      <Button className="h-full  border-0 w-[64px]  " variant={"outline"}>
        <Archive />
      </Button>
      <Button className="h-full  border-y-0 w-[140px] " variant={"outline"}>
        <FileOutput /> Экспорт
      </Button>
      {(meUser?.position.role == 11 || meUser?.position.role == 4) ? (
        <Button
          onClick={() => setId("new")}
          className="h-full   border-l-0   border-y-0   "
          variant={"outline"}
        >
          <Plus size={24} /> Добавить
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
