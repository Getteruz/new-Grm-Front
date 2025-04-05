import { FormProvider, useForm } from "react-hook-form";

import FormTextInput from "@/components/forms/FormTextInput";


export default function Action() {
    const form = useForm<any>();
  return (
    <div className="w-[34%]">
      <div className="border-[#CBCBC1] border w-full">
        <p className="py-[5px] px-[14px] leading-[14px] text-[12px] bg-[#DBDAD1] text-[#99998C]">
          Продукт найден
        </p>
        <FormProvider {...form}>
            <form
            className="py-[5px] px-[14px] flex flex-wrap bg-[#E0DFD6] pb-[66px] items-center gap-[8px]"
                onSubmit={form.handleSubmit((data) => {
                    console.log(data)
                // mutate({ data: data, id: id !== "new" ? id : undefined });
                })}
            >
                    <FormTextInput
                    name="name"
                    className="clom3"
                    placeholder="Коллекция"
                    label="Коллекция"
                />
                <FormTextInput
                    name="name"
                    className="clom3"
                    placeholder="Коллекция"
                    label="Коллекция"
                />
                <FormTextInput
                    name="name"
                    className="clom3"
                    placeholder="Коллекция"
                    label="Коллекция"
                />
                <FormTextInput
                    name="name"
                    className="clom3"
                    placeholder="Коллекция"
                    label="Коллекция"
                />
                <FormTextInput
                    name="name"
                    className="clom3"
                    placeholder="Коллекция"
                    label="Коллекция"
                />
                <FormTextInput
                    name="name"
                    className="clom3"
                    placeholder="Коллекция"
                    label="Коллекция"
                />
            </form>
        </FormProvider>

      </div>

      <div className="bg-[#191919] rounded-[2px] w-full p-[20px] mt-[10px]">
        <h3 className="text-[#00FF19] text-[16px] leading-[19px]">
          Дата: 01.01.2025
        </h3>
      </div>
    </div>
  );
}