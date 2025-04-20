import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import FormTextInput from "@/components/forms/FormTextInput";
import FormTimePicker from "@/components/forms/FormTimePicker";

export default function FormContent() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Филиалы</DialogTitle>
      </DialogHeader>
      <div className="grid row-start  my-2 gap-4 lg:grid-cols-3">
        <FormTextInput
          label="Официальное название"
          className="w-full"
          name="title"
          placeholder="Официальное название"
        />
        <FormTextInput
          label="Второе название"
          className="w-full"
          name="name"
          placeholder="Второе название"
        />
        <FormTextInput
          label="Геолокацию"
          className="w-full"
          name="addressLink"
          placeholder="Геолокацию"
        />
        <FormTextInput
          label="Адресс"
          className="w-full"
          name="address"
          placeholder="Адресс"
        />
        <FormTextInput
          label="Ориентир"
          className="w-full"
          name="landmark"
          placeholder="Ориентир"
        />
        <FormTextInput
          type="tel"
          label="Номер телефона"
          className="w-full"
          name="phone1"
          placeholder="Номер телефона"
        />
        <FormTextInput
          label="Телеграм"
          className="w-full"
          name="telegram"
          placeholder="Телеграм"
        />
        <FormTimePicker
          label="Время работы, От"
          className="w-full"
          name="startWorkTime"
          placeholder="От"
        />
        <FormTimePicker
          label="До"
          className="w-full"
          name="endWorkTime"
          placeholder="До"
        />
      </div>
      <DialogFooter className="justify-start mt-2 flex ">
        <Button type="submit">Создать</Button>
        <Button variant={"outline"} type="button">
          Отменить
        </Button>
      </DialogFooter>
    </>
  );
}
