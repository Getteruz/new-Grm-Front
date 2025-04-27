import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
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
import { Switch } from "@/components/ui/switch";

import { useAddEmployeeToStatement } from "./queries";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  statementId: string;
}

// Sample employees data (would come from API in real implementation)
const sampleEmployees = [
  { id: "1", name: "Аббос Жанизаков", avatar: null },
  { id: "2", name: "Михаил Иванов", avatar: null },
  { id: "3", name: "Анна Петрова", avatar: null },
  { id: "4", name: "Сергей Сидоров", avatar: null },
  { id: "5", name: "Елена Смирнова", avatar: null },
];

// Sample filials (would come from API in real implementation)
const sampleFilials = [
  { id: "1", name: "Sanat Hali" },
  { id: "2", name: "Samerteks" },
  { id: "3", name: "Milat Hali" },
  { id: "4", name: "Elexus hall" },
];

const formSchema = z.object({
  employeeId: z.string().min(1, "Выберите сотрудника"),
  filialId: z.string().min(1, "Выберите филиал"),
  month: z.string().min(1, "Выберите месяц"),
  enableBonus: z.boolean().default(false),
  enablePremium: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddEmployeeModal({
  isOpen,
  onClose,
  statementId,
}: AddEmployeeModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const { mutate: addEmployee } = useAddEmployeeToStatement();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: "",
      filialId: "",
      month: "",
      enableBonus: false,
      enablePremium: true,
    },
  });

  const selectedEmployeeId = form.watch("employeeId");
  const selectedEmployee = sampleEmployees.find(emp => emp.id === selectedEmployeeId);

  const onSubmit = (data: FormValues) => {
    // In a real implementation, you'd calculate these values based on employee data
    // or they'd be entered by the user
    const employeeData = {
      name: selectedEmployee?.name || "",
      filial: sampleFilials.find(f => f.id === data.filialId)?.name || "",
      salary: 400,  // Sample value
      bonus: data.enableBonus ? 40 : 0,
      premium: data.enablePremium ? 200 : 0,
      advance: 0,   // Sample value
      total: 640,   // Sample calculation
      plastic: 240, // Sample calculation
      cash: 400,    // Sample calculation
    };

    addEmployee(
      { statementId, employeeData },
      {
        onSuccess: () => {
          toast.success("Сотрудник успешно добавлен");
          form.reset();
          onClose();
        },
        onError: () => {
          toast.error("Ошибка при добавлении сотрудника");
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[796px] p-0 bg-[#F0F0E5]">
        <DialogHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-medium">
              Добавить сотрудника
            </DialogTitle>
            <DialogClose className="h-6 w-6 rounded-full hover:bg-gray-100">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-[14px] font-medium">Данные о ведомости</h3>
                
                <div className="flex gap-4">
                  <div className="w-[220px]">
                    <Label htmlFor="filial" className="text-[12px] font-light">Филиал</Label>
                    <Select
                      onValueChange={(value) => form.setValue("filialId", value)}
                      value={form.watch("filialId")}
                    >
                      <SelectTrigger id="filial" className="w-[220px] bg-input p-2 h-[40px]">
                        <SelectValue className="bg-input" placeholder="Укажите филиал" />
                      </SelectTrigger>
                      <SelectContent className="bg-input">
                        {sampleFilials.map((filial) => (
                          <SelectItem key={filial.id} value={filial.id}>
                            {filial.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.filialId && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.filialId.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="w-full">
                    <Label htmlFor="employee" className="text-[12px] font-light">Сотрудник</Label>
                    <Select
                      onValueChange={(value) => form.setValue("employeeId", value)}
                      value={form.watch("employeeId")}
                    >
                      <SelectTrigger id="employee" className="w-full bg-input p-2 h-[40px]">
                        <SelectValue placeholder="Выберите сотрудников" />
                      </SelectTrigger>
                      <SelectContent>
                        {sampleEmployees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            <div className="flex items-center">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={employee.avatar || undefined} />
                                <AvatarFallback className="bg-primary text-white text-xs">
                                  {employee.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              {employee.name}
                            </div>
                          </SelectItem>
                        ))}
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
                  <Label htmlFor="month" className="text-[12px] font-light">За какой месяц</Label>
                  <div className="flex items-center">
                  <Input
                    id="month"
                    type="month"
                    className="mt-1 w-[220px] bg-input p-2 h-[40px]"
                    value={selectedDate ? selectedDate.toISOString().split('T')[0].substring(0, 7) : ''}
                    onChange={(e) => {
                      setSelectedDate(e.target.value ? new Date(`${e.target.value}-01`) : undefined);
                      form.setValue("month", e.target.value);
                    }}
                  />
                  {form.formState.errors.month && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.month.message}
                    </p>
                  )}

                  <div className="avatars flex ml-5 items-center justify-start w-full">
                    <Avatar className="p-6 border" >
                        <AvatarFallback ><span >{"AD"}</span></AvatarFallback>
                    </Avatar>
                    <Avatar className="p-6 border -left-2" >
                        <AvatarFallback><span>{"AD"}</span></AvatarFallback>
                    </Avatar>
                    <Avatar className="p-6 border -left-4">
                        <AvatarFallback><span>{"AD"}</span></AvatarFallback>
                    </Avatar>
                  </div>
                  </div>
                  
                </div>

              </div>
              
              <div className="space-y-4">
                <h3 className="text-[14px] font-medium">Дополнительные</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-start">
                    <Label htmlFor="bonus-switch" className="cursor-pointer text-[12px] font-light mr-3">
                      Бонуса
                    </Label>
                    <Switch
                      id="bonus-switch"
                      checked={form.watch("enableBonus")}
                      onCheckedChange={(checked) => form.setValue("enableBonus", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-start">
                    <Label htmlFor="premium-switch" className="cursor-pointer text-[12px] font-light mr-3">
                      Премии
                    </Label>
                    <Switch
                      id="premium-switch"
                      checked={form.watch("enablePremium")}
                      onCheckedChange={(checked) => form.setValue("enablePremium", checked)}
                    />
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
      </DialogContent>
    </Dialog>
  );
}