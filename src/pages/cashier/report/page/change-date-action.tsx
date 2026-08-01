import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { CalendarClock, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UpdatePatchData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { useMeStore } from "@/store/me-store";

/**
 * Пункт меню «Изменить дату» для операции кассы (cashflow).
 * Кассир (роль 3) — только ручные приход/расход в открытой кассе, в пределах года.
 * Бухгалтер (10), M-менеджер (9), Boss (12) — любые операции и даты (валидируется на бэке).
 */
export default function ChangeDateAction({
  id,
  tip,
  currentDate,
}: {
  id: string;
  tip?: string;
  currentDate?: string | Date;
}) {
  const { meUser } = useMeStore();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<string>(
    currentDate ? format(new Date(currentDate), "yyyy-MM-dd") : ""
  );

  const role = meUser?.position?.role;
  const canEdit =
    role === 10 || role === 9 || role === 12 || (role === 3 && tip === "cashflow");

  const { mutate, isPending } = useMutation({
    mutationFn: () => UpdatePatchData(apiRoutes.cashflow + "/" + id, "date", { date }),
    onSuccess: () => {
      toast.success("Дата операции изменена");
      queryClient.invalidateQueries({ queryKey: [apiRoutes.cashflow] });
      setOpen(false);
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Не удалось изменить дату";
      toast.error(String(message));
    },
  });

  if (!canEdit) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)} className="w-full">
        <div className="text-center flex flex-col items-center justify-center pt-[14px] pb-[8px] w-full">
          <CalendarClock className="w-[28px] h-[28px] text-primary" />
          <p className="text-primary text-[13px]">Изменить дату</p>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[340px]">
        <DialogHeader>
          <DialogTitle className="text-center">Новая дата операции</DialogTitle>
        </DialogHeader>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full h-12 rounded-xl border border-border bg-background px-3 text-[16px]"
        />
        <DialogFooter className="sm:justify-start w-full flex gap-2">
          <DialogClose asChild>
            <Button type="button" className="w-1/2" variant="secondary">
              Отмена
            </Button>
          </DialogClose>
          <Button
            disabled={isPending || !date}
            onClick={() => mutate()}
            className="w-1/2"
          >
            {isPending ? <Loader className="animate-spin" /> : ""}
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
