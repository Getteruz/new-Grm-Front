import FormTextInput from "@/components/forms/FormTextInput";
import Filters from "./filters";
import BarcodeQenerat from "@/components/barcode-generat";
import FormComboboxDemoInput from "@/components/forms/FormCombobox";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { parseAsString, useQueryState } from "nuqs";
import { useMeStore } from "@/store/me-store";

export default function FormContent() {
  const { meUser } = useMeStore();

  const [editble] = useState<boolean>(true);
  const [barcode, setBarCode] = useQueryState("barcode");
  const { watch } = useFormContext();
  const isMetric = watch("isMetric");
  const [tip] = useQueryState(
    "tip",
    parseAsString.withDefault(meUser?.position?.role == 7 ? "переучет" : "new")
  );

  return (
    <div className="w-full max-h-[calc(100vh-66px)] scrollCastom border-border border-r ">
      <Filters />
      <div className="grid row-start  px-[40px] py-[20px] gap-2 lg:grid-cols-2">
        <FormTextInput
          classNameInput="h-[28px] p-2"
          name="code"
          placeholder="code"
          localChange={() => {
            setBarCode("new");
          }}
          label="code"
        />

        <FormComboboxDemoInput
          fieldNames={{ value: "id", label: "title" }}
          fetchUrl="/country"
          classNameChild="h-[28px] p-2"
          name="country"
          placeholder="country"
          label="country"
          disabled={true}
        />
        <FormComboboxDemoInput
          fieldNames={{ value: "id", label: "title" }}
          fetchUrl="/factory"
          name="factory"
          classNameChild="h-[28px] p-2"
          placeholder="factory"
          label="factory"
          disabled={true}
        />
        <FormComboboxDemoInput
          fieldNames={{ value: "id", label: "title" }}
          fetchUrl="/collection"
          name="collection"
          disabled={true}
          classNameChild="h-[28px] p-2"
          placeholder="collection"
          label="collection"
        />
        <FormComboboxDemoInput
          fieldNames={{ value: "id", label: "title" }}
          fetchUrl={`/model`}
          name="model"
          disabled={true}
          classNameChild="h-[28px] p-2"
          placeholder="model"
          label="model"
        />
        <FormTextInput
          classNameInput="h-[28px] p-2"
          name="isMetric"
          placeholder="isMetric"
          disabled={true}
          label="isMetric"
        />
        <FormComboboxDemoInput
          fieldNames={{ value: "id", label: "title" }}
          fetchUrl="/shape"
          name="shape"
          disabled={true}
          classNameChild="h-[28px] p-2"
          placeholder="shape"
          label="shape"
        />
        <FormComboboxDemoInput
          fieldNames={{ value: "id", label: "title" }}
          fetchUrl="/size"
          name="size"
          disabled={true}
          classNameChild="h-[28px] p-2"
          placeholder="size"
          label="size"
        />
        <FormTextInput
          type="number"
          classNameInput="h-[28px] p-2"
          name="count"
          placeholder={isMetric == "Метражный" ? "Длина" : "count"}
          disabled={!editble}
          label={isMetric == "Метражный" ? "Длина" : "count"}
        />
        <FormComboboxDemoInput
          fieldNames={{ value: "id", label: "title" }}
          fetchUrl="/color"
          name="color"
          classNameChild="h-[28px] p-2"
          placeholder="color"
          disabled={true}
          label="color"
        />
        <FormComboboxDemoInput
          fieldNames={{ value: "id", label: "title" }}
          fetchUrl="/style"
          name="style"
          classNameChild="h-[28px] p-2"
          placeholder="style"
          disabled={true}
          label="style"
        />
      </div>
      <div className="bg-sidebar border-y text-primary border-border  h-[44px]  flex  items-center justify-end  ">
        {meUser?.position.role == 9 && tip != "излишки" ? (
          <Button
            className={`h-full w-1/2 text-primary justify-center font-[16px] gap-1.5  border-none`}
            variant={"outline"}
            disabled={barcode == "new" || barcode == undefined}
          >
            Изменить
          </Button>
        ) : (
          ""
        )}
        {(meUser?.position.role == 9 && tip == "new") ||
        meUser?.position.role === 5 ||
        (meUser?.position.role == 7 && tip == "переучет") ? (
          <Button
            className={`h-full w-1/2 text-primary justify-center font-[16px] gap-1.5  border-none`}
            variant={"outline"}
            disabled={barcode != "new" && barcode != undefined}
          >
            Добавить
          </Button>
        ) : (
          ""
        )}
      </div>
      <BarcodeQenerat />
    </div>
  );
}
