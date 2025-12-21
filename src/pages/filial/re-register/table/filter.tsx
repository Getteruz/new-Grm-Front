import { FileCheck, FileOutput, Loader } from "lucide-react";
import FilterSelect from "@/components/filters-ui/filter-select";
import SearchInput from "@/components/filters-ui/search-input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useMeStore } from "@/store/me-store";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { UpdatePatchData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

export default function Filters({
  partiyaStatus = "new",
}: {
  partiyaStatus?: string;
  check?: boolean;
}) {
  const { filialId } = useParams();
  const { meUser } = useMeStore();

  const StatusText = {
    open: "Отправить на подтверждение",
    accepted: "В ожидании...",
    closed: "Принято",
  };

  const StatusMManaerText = {
    open: "Принимается",
    accepted: "Принять переучёт",
    closed: "Принято",
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      return await UpdatePatchData(
        partiyaStatus == "open"? apiRoutes.productAcceptReport: apiRoutes.productCloseReport,
        filialId == "my-filial" ?meUser?.filial?.id ||"" :filialId || "",
        {}
      );
    },
    onSuccess: () => {
      toast.success("closed");
      // queryClient.invalidateQueries({ queryKey: [apiRoutes.parties] });
    },
  });
  return (
    <div className="bg-sidebar border-border border-b h-[64px]   flex  ">
      <SearchInput className="border-border border-r" />
      <FilterSelect
        className="border-border max-w-[150px] w-full border-r"
        options={[
          { label: "Остатка", value: "new" },
          { label: "Переучёт", value: "переучет"},
          { label: "Розница", value: "излишки"},
        ]}
        defaultValue={
          meUser?.position?.role == 7 || meUser?.position.role == 4
            ? "переучет"
            : "new"
        }
        placeholder="Накладной"
        name="tip"
      />
      {/* <FilterSelect
        className="border-border max-w-[150px] w-full border-r"
        options={[
          { label: "Коллекция", value: "collection" },
          { label: "Продукт", value: "default" },
        ]}
        defaultValue="default"
        placeholder="Коллекция"
        name="type"
      /> */}

      {meUser?.position?.role == 9 ? (
        <Button
          disabled={partiyaStatus != "accepted"}
          onClick={() => (partiyaStatus == "accepted" ? mutate() : {})}
          variant={"outline"}
          className="h-full ml-auto  border-y-0"
        >
          <FileCheck />
          {/* @ts-ignore */}
          {StatusMManaerText[partiyaStatus]}
        </Button>
      ) : (
        <Button
          onClick={() => (partiyaStatus == "open" ? mutate() : {})}
          disabled={
            partiyaStatus != "open" || isPending
          }
          className="h-full ml-auto  border-y-0"
          variant={partiyaStatus != "open" ? "outline" : "default"}
        >
          {isPending ? <Loader className="animate-spin" /> : <FileOutput />}
          {/* @ts-ignore */}
          { StatusText[partiyaStatus]}
        </Button>
      )}
    </div>
  );
}
