import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import FormComboboxDemoInput from "@/components/forms/FormCombobox";
import { AddData, getAllData } from "@/service/apiHelpers";
import { toast } from "sonner";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  statementId: string;
  selectedFilialId?: string;
}

interface Employee {
  id: string;
  name: string;
  avatar: { path: string } | null;
  firstName: string;
  lastName: string;
  salary: number;
}

type PayrollItemsResponse = Employee[];

const formSchema = z.object({
  employeeId: z.string().min(1, "Выберите сотрудника"),
  filial: z.object({
    value: z.string(),
    label: z.string()
  }).refine((data) => data.value, "Выберите филиал"),
  month: z.string().min(1, "Выберите месяц"),
  enableBonus: z.boolean().default(false),
  enablePremium: z.boolean().default(true),
  salary: z.number().default(0),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddEmployeeModal({
  isOpen,
  onClose,
  statementId,
}: AddEmployeeModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [filialId, setFilialId] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: "",
      filial: { value: "", label: "" },
      month: "",
      enableBonus: false,
      enablePremium: true,
      salary: 0,
    },
  });

  // Watch for filial changes in the form
  const selectedFilial = form.watch("filial");

  // Update filialId when filial selection changes
  useEffect(() => {
    if (selectedFilial?.value) {
      setFilialId(selectedFilial.value);
    }
  }, [selectedFilial]);

  const { data: usersData, isLoading: isUsersLoading } = useQuery<PayrollItemsResponse>({
    queryKey: ["users", filialId],
    queryFn: () => getAllData<PayrollItemsResponse, any>(`/user/filial/${filialId}`, {}),
    enabled: !!filialId,
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const month = parseInt(data.month.split("-")[1]); // Extract month number from YYYY-MM format
      await AddData("/payroll-items", {
        selectedMonth: month,
        plastic: 0,
        in_hand: data.salary,
        prepayment: 0,
        payrollId: statementId,
        userId: data.employeeId,
        is_premium: false,
        is_bonus: false
      });

      toast.success("Сотрудник успешно добавлен");
      onClose();
    } catch (error) {
      toast.error("Ошибка при добавлении сотрудника");
      console.error(error);
    }
  };

  if (!isOpen) return null;
  console.log(usersData);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[796px] p-0 bg-[#F0F0E5]">
        <DialogHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-medium">
              Добавить сотрудника
            </DialogTitle>
          </div>
        </DialogHeader>
        <FormProvider {...form}>
          <form >
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-[14px] font-medium">
                    Данные о ведомости
                  </h3>

                  <div className="flex gap-4">
                    <div className="w-[220px]">
                      <FormComboboxDemoInput
                        fieldNames={{ value: "id", label: "title" }}
                        fetchUrl="/filial"
                        classNameChild="h-[40px] p-2"
                        name="filial"
                        placeholder="Укажите флиал"
                        label="Флиал"
                      />
                      {form.formState.errors.filial && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.filial.message}
                        </p>
                      )}
                    </div>

                    <div className="w-full">
                      <Label htmlFor="employee" className="text-[12px] font-light">
                        Сотрудник
                      </Label>
                      <Select
                        onValueChange={(value) => {
                          const selectedEmployee = usersData?.find(emp => emp.id === value);
                          form.setValue("employeeId", value);
                          form.setValue("salary", selectedEmployee?.salary || 0);
                        }}
                        value={form.watch("employeeId")}
                        disabled={!filialId || isUsersLoading}
                      >
                        <SelectTrigger id="employee" className="w-full bg-input p-2 h-[40px]">
                          <SelectValue placeholder={"Выберите сотрудника"} />
                        </SelectTrigger>
                        <SelectContent>
                          {usersData === undefined ? (
                            <div className="p-2 text-center text-gray-500">Загрузка...</div>
                          ) : usersData.length === 0 ? (
                            <div className="p-2 text-center text-gray-500">В этом филиале нет сотрудников</div>
                          ) : (
                            usersData.map((employee: Employee) => (
                              <SelectItem key={employee.id} value={employee.id}>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={employee.avatar?.path} />
                                    <AvatarFallback className="bg-primary text-white text-xs">
                                      {employee.firstName?.charAt(0)}{employee.lastName?.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>
                                    {employee.firstName} {employee.lastName}
                                  </span>
                                </div>
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.employeeId && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.employeeId.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="">
                    <Label htmlFor="month" className="text-[12px] font-light">
                      За какой месяц
                    </Label>
                    <div className="flex items-center">
                      <Input
                        id="month"
                        type="month"
                        className="mt-1 w-[220px] bg-input p-2 h-[40px]"
                        value={
                          selectedDate
                            ? selectedDate
                                .toISOString()
                                .split("T")[0]
                                .substring(0, 7)
                            : ""
                        }
                        onChange={(e) => {
                          setSelectedDate(
                            e.target.value
                              ? new Date(`${e.target.value}-01`)
                              : undefined
                          );
                          form.setValue("month", e.target.value);
                        }}
                      />
                      {form.formState.errors.month && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.month.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with buttons */}
            <div className="flex border-t p-2 bg-[#E6E6D9]">
              <Button
                type="submit"
                className="rounded-none h-12 w-[220px] mx-3"
                onClick={e => {
                  e.stopPropagation();
                  onSubmit(form.getValues());
                }}
              >
                Сохранить
              </Button>
              <Button
                type="button"
                className="rounded-none h-12 w-[220px] border-l bg-[#F0F0E5]"
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