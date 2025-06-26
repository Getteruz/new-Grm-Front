import { DateRangePicker } from "@/components/filters-ui/date-picker-range";
import { Button } from "@/components/ui/button";
import { PatchData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function Filters({ status }: { status: string }) {
  const { id } = useParams();
  // const item = row.original;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => PatchData(apiRoutes.kassaReports + "/" + id, {}),
    onSuccess: () => {
      toast.success("Closed");
      queryClient.invalidateQueries({ queryKey: [apiRoutes.kassaReports] });
    },
  });
  return (
    <div className="bg-sidebar border-border border-b  px-[20px] h-[64px] items-center  flex   ">
      <p className="text-[#272727] text-[20px] mr-auto">Касса магазина</p>
      <DateRangePicker fromPlaceholder={`от`} toPlaceholder={`до`} />
      {/* <Button
        className="h-full  border-y-0 w-[140px] "
        variant={"outline"}
      >
        <FileOutput /> Экспорт
      </Button> */}
      {id && (status == "open" || status == "rejected") ? (
        <Button
          disabled={isPending}
          onClick={() => mutate()}
          className="h-full border-l-0 bg-primary hover:bg-[#525248] hover:text-accent text-accent border-y-0 w-[165px]  "
          variant={"outline"}
        >
          {/* <X />  */}
          {isPending ? <Loader className="animate-spin" /> : ""}
          Закрыть месяц
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
