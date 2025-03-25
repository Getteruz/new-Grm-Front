

import FormTextInput from "@/components/forms/FormTextInput";
import TableWrapper from "@/components/table-wrapper";
import {  useQuery } from "@tanstack/react-query";
import { getAllData } from "@/service/apiHelpers";
import { TResponse } from "@/types";
import { TData } from "../type";
import { parseAsString, useQueryState } from "nuqs";
import FormSelectInput from "@/components/forms/FormSelect";


export default function FormContent({isPending}:{isPending:boolean}) {
  const [type,settype] = useQueryState("type",parseAsString.withDefault('country'))
  const {data,isLoading} =  useQuery({
    queryKey: [type],
    queryFn: () =>
      getAllData<TResponse<TData>,object>(`/${type}`),
    select:(res)=>({
      items: res?.items.map(item=>({value:item?.id,label:item?.title})),
      meta:res?.meta
    })
  }
);

  return (
    < >
        <TableWrapper 
        className='border-r border-border'
            options={[
            {
                label:"Страна",
                value:"country",
                onClick:()=>settype("country")
            },
            {
              label:"Поставщики",
              value:"factory",
              onClick:()=>settype("factory")
            },
            {
              label:"Партии",
              value:"partiya-number",
              onClick:()=>settype("partiya-number")
            },
            {
              label:"Коллекция",
              value:"collection",
              onClick:()=>settype("collection")
            },
            {
              label:"Модели",
              value:"model",
              onClick:()=>settype("model")
            },
            {
              label:"Размеры",
              value:"size",
              onClick:()=>settype("size")
            },
            {
              label:"Форма",
              value:"shape",
              onClick:()=>settype("shape")
            },
            {
              label:"Цвета",
              value:"color",
              onClick:()=>settype("color")
            },
            {
              label:"Стиль",
              value:"style",
              onClick:()=>settype("style")
            },
          ]} 
          title='Оснавные'
        />
        <TableWrapper 
          isAdd={true}
          isloading={isLoading}
          className='border-r border-border'
          title={type || ""}
          options={data?.items}
          isPending={isPending as boolean}
        >
          <FormTextInput 
            classNameInput="mb-3 m-1 w-[95%] bg-sidebar border border-border" 
            name="title"
            placeholder="title" 
            />
            {
              type === "color"  &&
              <FormTextInput 
              classNameInput="mb-3 m-1 w-[95%] bg-sidebar border border-border" 
              name="code"
              placeholder="code" 
              required
              />
            }
            {
              type === "model" && 
              <FormSelectInput
                classNameChild="mb-3 m-1 w-[95%] rounded-none bg-sidebar border border-border" 
                className="w-full"
                fetchUrl="/collection"
                fieldNames={{ value: "id", label: "title" }}
                 name="collection"
                placeholder="collection"
              />
            }
        </TableWrapper>

    </>
  );
}
