import api from "@/service/fetchInstance";
import { managerStatus, ManagerStatusKey } from "./constants";
import { apiRoutes } from "@/service/apiRoutes";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function StatusAction({
  row,
}: {
  row: {
    original: { id: string; status: string };
  };
}) {
  const queryClient = useQueryClient();
  const statusKey = row.original.status as ManagerStatusKey;
  const updateStatus = async () => {
    await api.patch(apiRoutes.kassaClose, {
      ids: [row.original.id],
    });
    queryClient.invalidateQueries({ queryKey: [apiRoutes.kassaClose] });
    toast.success(`Успешно`);
  };
  return (
    <div className="flex">
      <p
        onClick={(e) => {
          e.stopPropagation();
          if (row.original.status === "closed_by_c") {
            updateStatus();
          }
        }}
        className={`
                  bg-[${managerStatus[statusKey].background}]
                  text-[${managerStatus[statusKey].color}]
                  border-[${managerStatus[statusKey].color}]
                  ${row.original.status != "closed_by_c" && "cursor-default"}
                  min-w-[120px] rounded-4xl px-[14px] w-[100px] text-center py-3 border  `}
      >
        {managerStatus[statusKey].text}
      </p>
    </div>
  );
}
