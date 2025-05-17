import { DialogTitle } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { FormProvider, useForm, useWatch } from "react-hook-form";

import FormComboboxDemoInput from "@/components/forms/FormCombobox";
import FormDatePicker from "@/components/forms/FormDateRangePicker";
import FormTextInput from "@/components/forms/FormTextInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { apiRoutes } from "@/service/apiRoutes";
import api from "@/service/fetchInstance";

export default function FormContent() {
  const [id, setId] = useQueryState("id");
  const form = useForm();
  const queryClient = useQueryClient();

  const country = useWatch({
    control: form.control,
    name: "country",
  });
  const factory = useWatch({
    control: form.control,
    name: "factory",
  });
  const partiya_no = useWatch({
    control: form.control,
    name: "partiya_no",
  });
  const expense = useWatch({
    control: form.control,
    name: "expense",
  });

  const volume = useWatch({
    control: form.control,
    name: "volume",
  });
  const user = useWatch({
    control: form.control,
    name: "user",
  });
  const warehouse = useWatch({
    control: form.control,
    name: "warehouse",
  });
  const date = useWatch({
    control: form.control,
    name: "date",
  });

  const handleSubmit = async () => {
    const data = {
      country: country.value,
      factory: factory.value,
      partiya_no: partiya_no.value,
      warehouse: warehouse.value,
      user: user.value,
      expense,
      date: date,
      volume,
    };
    await api.post(apiRoutes.parties, data);
    await queryClient.invalidateQueries({ queryKey: ["clients"] });
    setId(null);
  };

  return (
    <Dialog open={Boolean(id)} onOpenChange={() => setId(null)}>
      <FormProvider {...form}>
        <DialogContent className="sm:max-w-[796px]">
          <DialogHeader>
            <DialogTitle>Создание новой партии</DialogTitle>
          </DialogHeader>

          <div className="mx-15 my-8">
            <h3 className="text-foreground text-[17px] font-medium">
              Данные о партии и поставщике
            </h3>
            <p className="mt-0.5 text-foreground/45 text-[12px] mb-4">
              Укажите данные о партии: откуда она поступила, какой поставщик и к
              какой партии за этот год она относится.
            </p>

            <div className="flex gap-2">
              <FormComboboxDemoInput
                fieldNames={{ value: "id", label: "title" }}
                fetchUrl="/country"
                name="country"
                placeholder="country"
                label="country"
              />
              <FormComboboxDemoInput
                fieldNames={{ value: "id", label: "title" }}
                fetchUrl="/factory"
                name="factory"
                placeholder="factory"
                label="factory"
              />
              <FormComboboxDemoInput
                fieldNames={{ value: "id", label: "title" }}
                fetchUrl="/partiya-number"
                name="partiya_no"
                placeholder="Партия"
                label="Партия"
              />
            </div>

            <h3 className="text-foreground mt-[30px] text-[17px] font-medium">
              Данные о получении и расходе партии
            </h3>
            <p className="mt-0.5 text-foreground/45 text-[12px] mb-4">
              Укажите дату получения партии, её объём и общий расход, а также
              итоговое количество.
            </p>

            <div className="flex gap-2">
              <FormTextInput
                name="expense"
                placeholder="Введите расход в $"
                label="Расход"
                type="number"
              />
              <FormTextInput
                name="volume"
                placeholder="Введите обём в м²"
                type="number"
                label="Обём"
              />
              <FormDatePicker
                name="date"
                label="Дата создания партии"
                placeholder="12 янв 2025"
              />
            </div>

            <h3 className="text-foreground text-[17px] font-medium mt-8">
              Оприходование партии на склад.
            </h3>
            <p className="mt-0.5 text-foreground/45 text-[12px] mb-4">
              Укажите, какой склад будет принимать эту партию и кто за это будет
              отвечать.
            </p>

            <div className="flex gap-2">
              <FormComboboxDemoInput
                fieldNames={{ value: "id", label: "title" }}
                fetchUrl="/filial"
                queries={{ type: "warehouse" }}
                name="warehouse"
                placeholder="Укажите склад"
                label="Склад"
              />
              <FormComboboxDemoInput
                option={[
                  {
                    label: "Alisher",
                    value: "d53fcfc7-5615-4896-bf8b-500a43ff47a7",
                  },
                ]}
                name="user"
                placeholder="Ответсвенный лицо"
                label="Ответсвенный лицо"
              />
            </div>
          </div>

          <DialogFooter className="justify-start">
            <Button onClick={handleSubmit} type="submit">
              Сохранить
            </Button>
            <Button variant="outline" type="button" onClick={() => setId(null)}>
              Отменить
            </Button>
          </DialogFooter>
        </DialogContent>
      </FormProvider>
    </Dialog>
  );
}
