import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRoutes } from "@/service/apiRoutes";
import api from "@/service/fetchInstance";
import { toast } from "sonner";
import { useQueryState } from "nuqs";
import { useTranslation } from "react-i18next";

interface CreateStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateStatementModal({
  isOpen,
  onClose,
}: CreateStatementModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const [id, setId] = useQueryState("id");

  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const onSubmit = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

      const body = {
        title: data.title,
        to_date: today,
      };

      await api.post(apiRoutes.payrolls, body);
      setId(null);
      queryClient.invalidateQueries({ queryKey: [apiRoutes.payrolls] });
      toast.success(id === "new" ? t("savedSuccessfully") : t("updatedSuccessfully"));
      onClose();
    } catch (error) {
      toast.error("Ошибка при сохранении");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[796px] p-0 bg-[#F0F0E5]">
        <DialogHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-medium">
              Создания ведомость
            </DialogTitle>
          </div>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="p-6">
              <div className="space-y-4">
                <Label htmlFor="number">Данные о ведомости</Label>
                <div className="flex mt-3">
                  <div className="mr-2">
                    <Label
                      htmlFor="number"
                      className="text-[#99998C] text-[12px]"
                    >
                      Номер ведомости
                    </Label>
                    <Input
                      readOnly
                      id="number"
                      placeholder='№ ---'
                      className="mt-1 w-[100px]"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="name"
                      className="text-[#99998C] text-[12px]"
                    >
                      Название
                    </Label>
                    <Input
                      id="title"
                      className="mt-1 min-w-[448px]"
                      {...form.register("title")}
                      placeholder="Введите название"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with buttons */}
            <div className="flex justify-start border-t p-3 bg-[#E6E6D9]">
              <Button
                type="submit"
                disabled={isLoading}
                className="rounded-none w-[220px] mx-3 h-[44px] bg-[#5D5D53]"
              >
                {isLoading ? "Сохранение..." : "Сохранить"}
              </Button>
              <Button
                type="button"
                disabled={isLoading}
                className="rounded-none w-[220px] h-[44px] bg-[#F0F0E5] border"
                variant="outline"
                onClick={onClose}
              >
                Отменить
              </Button>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}