// form/CreateBonusModal.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BONUS_UNITS, MEASUREMENT_UNITS, OPERATORS } from "../mock-data";
import { useCreateBonus } from "../table/queries";

interface CreateBonusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  condition: z.coerce.number().min(1, "Условие должно быть больше 0"),
  measurementUnit: z.string().min(1, "Выберите единицу измерения"),
  operator: z.string().min(1, "Выберите оператор"),
  bonusValue: z.coerce.number().min(1, "Бонус должен быть больше 0"),
  bonusUnit: z.string().min(1, "Выберите единицу измерения"),
  period: z.string().min(1, "Выберите период"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateBonusModal({
  isOpen,
  onClose,
}: CreateBonusModalProps) {
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const { mutate: createBonus } = useCreateBonus();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Бонус 0001",
      condition: 100,
      measurementUnit: "шт",
      operator: ">",
      bonusValue: 1,
      bonusUnit: "%",
      period: "за месяц",
    },
  });

  const onSubmit = (data: FormValues) => {
    createBonus({
      ...data,
      endDate: endDate?.toISOString(),
    }, {
      onSuccess: () => {
        toast.success("Бонус успешно создан");
        form.reset();
        onClose();
      },
      onError: () => {
        toast.error("Ошибка при создании бонуса");
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
              Создания бонуса
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-6">
            <Label>Введите условия и сумма премье</Label>
            
            <div className="space-y-4 mt-3">
              <div>
                <Label htmlFor="name" className="text-[#99998C] text-[12px]">Название бонуса</Label>
                <Input
                  id="name"
                  className="mt-1 h-[40px]"
                  {...form.register("name")}
                  placeholder="Bonus 0001"
                />
                {form.formState.errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="condition" className="text-[#99998C] text-[12px]">Условия</Label>
                  <div className="flex mt-1">
                    <Input
                      id="condition"
                      className="rounded-r-none h-[40px]"
                      {...form.register("condition")}
                      placeholder="100"
                    />
                    <Select
                      value={form.watch("measurementUnit")}
                      onValueChange={(value) => form.setValue("measurementUnit", value)}
                    >
                      <SelectTrigger className="w-20 rounded-l-none border-l-0 h-[42px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MEASUREMENT_UNITS.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {form.formState.errors.condition && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.condition.message}
                    </p>
                  )}
                </div>
                
                <div>
                  <Label className="text-[#99998C] text-[12px]">Выберите оператора</Label>
                  <Select
                    value={form.watch("operator")}
                    onValueChange={(value) => form.setValue("operator", value)}
                  >
                    <SelectTrigger className="mt-1 w-[220px] bg-input p-2 h-[40px]">
                      <SelectValue placeholder="Оператор" />
                    </SelectTrigger>
                    <SelectContent>
                      {OPERATORS.map((operator) => (
                        <SelectItem key={operator.id} value={operator.id}>
                          {operator.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="bonusValue" className="text-[#99998C] text-[12px]">Бонус</Label>
                  <div className="flex mt-1">
                    <Input
                      id="bonusValue"
                      className="rounded-r-none h-[40px]"
                      {...form.register("bonusValue")}
                      placeholder="1"
                    />
                    <Select
                      value={form.watch("bonusUnit")}
                      onValueChange={(value) => form.setValue("bonusUnit", value)}
                    >
                      <SelectTrigger className="w-20 rounded-l-none border-l-0 h-[42px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {BONUS_UNITS.map((unit) => (
                          <SelectItem key={unit.id} value={unit.id}>
                            {unit.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {form.formState.errors.bonusValue && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.bonusValue.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="endDate" className="text-[#99998C] text-[12px]">Дата окончание бонуса</Label>
                <Input
                  id="endDate"
                  type="date"
                  className="mt-1 max-w-[220px]"
                  value={endDate ? endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : undefined)}
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