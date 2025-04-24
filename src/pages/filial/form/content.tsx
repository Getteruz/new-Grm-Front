import { DialogTitle } from "@radix-ui/react-dialog";
import { Copy } from "lucide-react";
import { useState } from "react";

import FormTextInput from "@/components/forms/FormTextInput";
import FormTimePicker from "@/components/forms/FormTimePicker";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { apiRoutes } from "@/service/apiRoutes";
import api from "@/service/fetchInstance";
import { useMeStore } from "@/store/me-store";

export default function FormContent() {
  const { meUser } = useMeStore();
  const [loginId, setLoginId] = useState("#id");
  const generateLoginId = () => {
    api.get(apiRoutes.userLoginGenerate).then((res) => setLoginId(res.data));
  };

  return (
    <>
      <DialogHeader className="mb-8 ">
        <DialogTitle className="text-[18px]">
          {meUser?.position.role === 6 ? "Дилер" : "Филиал"}
        </DialogTitle>
      </DialogHeader>
      <div className="grid row-start  my-2 gap-4 grid-cols-3">
        <p className="col-span-3 text-[#5D5D53] font-medium text-[14px] text-left">
          Данные Дилера
        </p>
        <FormTextInput
          label={
            meUser?.position.role === 6
              ? "Название дилера"
              : "Официальное название"
          }
          className={` ${meUser?.position.role !== 6 ? "w-full" : "col-span-2"}`}
          name="title"
          placeholder={
            meUser?.position.role === 6
              ? "Название дилера"
              : "Официальное название"
          }
        />
        <FormTextInput
          label="Ответственное лицо"
          className="w-full"
          name="addressLink"
          placeholder="Ответственное лицо"
        />
        {meUser?.position.role !== 6 && (
          <FormTextInput
            label="Второе название"
            className="w-full"
            name="name"
            placeholder="Второе название"
          />
        )}
        {meUser?.position.role !== 6 && (
          <FormTextInput
            label="Геолокацию"
            className="w-full"
            name="addressLink"
            placeholder="Геолокацию"
          />
        )}
        <FormTextInput
          label="Адресс"
          className={` ${meUser?.position.role !== 6 ? "w-full" : "col-span-2"}`}
          name="address"
          placeholder="Адресс"
        />
        {meUser?.position.role !== 6 && (
          <FormTextInput
            label="Ориентир"
            className="w-full"
            name="landmark"
            placeholder="Ориентир"
          />
        )}
        <FormTextInput
          type="tel"
          label="Номер телефона"
          className="w-full"
          name="phone1"
          placeholder="Номер телефона"
        />
        {meUser?.position.role !== 6 && (
          <FormTextInput
            label="Телеграм"
            className="w-full"
            name="telegram"
            placeholder="Телеграм"
          />
        )}
        {meUser?.position.role !== 6 && (
          <>
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
          </>
        )}

        <p className="col-span-3 mt-8 text-[#5D5D53] font-medium text-[14px] text-left">
          Доступ в систему
        </p>
        <FormTextInput
          readOnly
          label="Должность"
          className="w-full"
          name="position"
          placeholder="Менеджер"
        />
        <div className="relative col-span-2">
          <FormTextInput
            label="Генерация id для входа"
            className="w-full"
            name="position"
            value={loginId}
            placeholder="# id"
          />
          <div className="absolute right-1 bottom-0.5 flex gap-2 items-center">
            <Copy width={16} height={16} color="#5D5D53" />
            <Button onClick={() => generateLoginId()} type="button">
              Сгенерировать
            </Button>
          </div>
        </div>
      </div>
      <DialogFooter className="!justify-start !flex  !flex-row mt-10 ">
        <Button type="submit" className="w-[220px] h-[44px]">
          Создать
        </Button>
        <Button
          variant={"outline"}
          type="button"
          className="w-[220px] h-[44px]"
        >
          Отменить
        </Button>
      </DialogFooter>
    </>
  );
}
