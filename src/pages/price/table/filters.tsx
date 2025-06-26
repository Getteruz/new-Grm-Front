import { BadgePercent, Gift, Tag, Ticket } from "lucide-react";
import { useQueryState } from "nuqs";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import Statistics from "@/components/filters-ui/statistics";
import { Button } from "@/components/ui/button";
import { useMeStore } from "@/store/me-store";

export default function Filters() {
  const [edit, setEdit] = useQueryState("edit");
  const { meUser } = useMeStore();
  const navigate = useNavigate();
  const handleSave = () => {
    if (edit === "edit") {
      setEdit("no");
      toast.success("Сохранено");
      navigate("/price");
      window.location.reload();
    } else {
      setEdit("edit");
    }
  };
  return (
    <div className="bg-sidebar border-border border-b  flex justify-between px-[20px] h-[64px]     ">
      <div className="flex  ">
        <Button className="h-full px-[50px] w-full max-w-[160px]">
          <Tag />
          Цены
        </Button>
        <Button
          variant={"outline"}
          className="h-full border-y-0 px-[50px] w-full max-w-[160px]"
        >
          <BadgePercent />
          Скидки
        </Button>
        <Button
          variant={"outline"}
          className="h-full border-y-0 px-[50px] w-full max-w-[160px]"
        >
          <Gift />
          Акции
        </Button>
        <Button
          variant={"outline"}
          className="h-full border-y-0 px-[50px] w-full max-w-[160px]"
        >
          <Tag />
          Бонусы
        </Button>
        <Button
          variant={"outline"}
          className="h-full border-y-0 px-[50px] w-full max-w-[160px]"
        >
          <Ticket />
          Промокоды
        </Button>
        <Statistics />
      </div>
      {meUser?.position.role === 9 && (
        <Button onClick={() => handleSave()} className="h-full w-[146px]">
          {edit === "edit" ? "Сохранить" : "Изменить"}
        </Button>
      )}
    </div>
  );
}
