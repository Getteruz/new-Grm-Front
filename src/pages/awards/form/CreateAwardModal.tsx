// form/CreateAwardModal.tsx
import { zodResolver } from "@hookform/resolvers/zod";
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

import { useCreateAward } from "../table/queries";

interface CreateAwardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  amount: z.coerce.number().min(1, "Сумма должна быть больше 0"),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateAwardModal({
  isOpen,
  onClose,
}: CreateAwardModalProps) {
//   const [date, ] = useState<Date | undefined>(new Date());
  const { mutate: createAward } = useCreateAward();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
    },
  });

  const onSubmit = (data: FormValues) => {
    createAward({
      ...data,
    //   createdAt: date?.toISOString() || new Date().toISOString(),
    }, {
      onSuccess: () => {
        toast.success("Премия успешно создана");
        form.reset();
        onClose();
      },
      onError: () => {
        toast.error("Ошибка при создании премии");
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
              Создания премии
            </DialogTitle>
          </div>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="p-6">
            <Label htmlFor="name">Введите условия и сумма премье</Label>
            <div className="space-y-4 mt-3">
              <div className="flex">
                <div className="mr-2 flex-1">
                  <Label htmlFor="name" className="text-[#99998C] text-[12px]">Название</Label>
                  <Input
                    id="name"
                    className="mt-1"
                    {...form.register("name")}
                    placeholder="Введите название условии"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                
                <div className="max-w-[220px]">
                  <Label htmlFor="amount" className="text-[#99998C] text-[12px]">Сумма</Label>
                  <Input
                    id="amount"
                    type="number"
                    className="mt-1"
                    {...form.register("amount")}
                    placeholder="Введите сумма"
                  />
                  {form.formState.errors.amount && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.amount.message}
                    </p>
                  )}
                </div>
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