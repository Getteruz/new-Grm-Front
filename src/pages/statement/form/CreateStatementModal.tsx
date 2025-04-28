import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCreateStatement } from "../table/queries";

interface CreateStatementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  number: z.string().min(1, "Номер обязателен"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateStatementModal({
  isOpen,
  onClose,
}: CreateStatementModalProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { mutate: createStatement } = useCreateStatement();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      number: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    createStatement({
      ...data,
      createdAt: date?.toISOString() || new Date().toISOString(),
      premiumsTotal: 0,
      bonusesTotal: 0,
      salaryTotal: 0,
      totalSum: 0,
      status: "В процессе",
    }, {
      onSuccess: () => {
        toast.success("Ведомость успешно создана");
        form.reset();
        onClose();
      },
      onError: () => {
        toast.error("Ошибка при создании ведомости");
      }
    });
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
        
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-6">
            <div className="space-y-4">
            <Label htmlFor="number">Данные о ведомости</Label>
              <div className="flex mt-3">
              <div className="mr-2">
                <Label htmlFor="number" className="text-[#99998C] text-[12px]">Номер ведомости</Label>
                <Input
                  id="number"
                  className="mt-1 w-[100px]"
                  {...form.register("number")}
                  placeholder="№ 235"
                />
                {form.formState.errors.number && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.number.message}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="name" className="text-[#99998C] text-[12px]">Название</Label>
                <Input
                  id="name"
                  className="mt-1 min-w-[448px]"
                  {...form.register("name")}
                  placeholder="Введите название"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              </div>
              
              <div>
                <Label htmlFor="date" className="text-[#99998C] text-[12px]">Дата приёма</Label>
                <Input
                  id="date"
                  type="date"
                  className="mt-1 max-w-[220px]"
                  value={date ? date.toISOString().split('T')[0] : ''}
                  onChange={(e) => setDate(e.target.value ? new Date(e.target.value) : undefined)}
                />
              </div>
            </div>
          </div>
          
          {/* Footer with buttons */}
          <div className="flex justify-start border-t p-3 bg-[#E6E6D9]">
            <Button
              type="submit"
              className="rounded-none w-[220px] mx-3 h-[44px] bg-[#5D5D53]"
            >
              Сохранить
            </Button>
            <Button
              type="button"
              className="rounded-none w-[220px] h-[44px] bg-[#F0F0E5] border"
              variant="outline"
              onClick={onClose}
            >
              Отменить
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}