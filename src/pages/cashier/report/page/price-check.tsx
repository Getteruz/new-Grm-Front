
import { getByIdData } from "@/service/apiHelpers";
import { useQuery } from "@tanstack/react-query";
import { apiRoutes } from "@/service/apiRoutes";
import AddingParishOrFlow from "@/components/adding-parish-flow";
import { useMeStore } from "@/store/me-store";
import { IOpenKassa } from "@/types/api-type";

// Кнопка «Закрыть кассу» удалена: касса годовая, закрывается автоматически
// годовым кроном 7 января. Ежемесячное подтверждение отменено.
export default function Pricecheck({ id }: { disabled?: boolean; id: string }) {
  const { meUser } = useMeStore();
  const filialId = meUser?.filial.id;
  const { data } = useQuery({
    queryKey: [apiRoutes.filial, filialId],
    queryFn: () =>
      getByIdData<IOpenKassa, void>("/kassa/open-kassa", filialId || ""),
    enabled: !!filialId,
  });
  return (
    <div className="w-full   bg-background  max-w-[312px] pb-[10px] pt-6 sticky top-0">
      <AddingParishOrFlow kassaId={String(data?.id || id)} />
    </div>
  );
}
