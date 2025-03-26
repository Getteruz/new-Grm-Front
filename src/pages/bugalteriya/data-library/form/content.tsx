

import FormTextInput from "@/components/forms/FormTextInput";
import TableWrapper from "@/components/table-wrapper";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteData, getAllData } from "@/service/apiHelpers";
import { TResponse } from "@/types";
import { TActionData } from "../type";
import { parseAsString, useQueryState } from "nuqs";
import FormSelectInput from "@/components/forms/FormSelect";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function FormContent({isPending}:{isPending:boolean}) {
  const [type,settype] = useQueryState("type",parseAsString.withDefault('country'))
  const {t} = useTranslation()
  const queryClient = useQueryClient()
  const {data,isLoading} =  useQuery({
    queryKey: [type],
    queryFn: () =>
      getAllData<TResponse<TActionData>,object>(`/${type}`,{
        
      }),
    select:(res)=>({
      items: res?.items.map(item=>({value:item?.id,label:item?.title})),
      meta:res?.meta
    })
  }
);
const { mutate } = useMutation({
  mutationFn: async (id:string) => {
    return await DeleteData(`/${type}`, id);
  },
  onSuccess: () => {
    toast.success(t("deleteToast"));
    queryClient.invalidateQueries({ queryKey: [type] });
  },
});

  return (
    < >
        <TableWrapper 
        className='border-r h-[calc(100vh-64px)] border-border'
            options={[
            {
                label:"Страна",
                value:"country",
                onClick:()=>settype("country"),
                isActive:type === "country"
            },
            {
              label:"Поставщики",
              value:"factory",
              onClick:()=>settype("factory"),
                isActive:type === "factory"
            },
            {
              label:"Партии",
              value:"partiya-number",
              onClick:()=>settype("partiya-number"),
                isActive:type === "partiya-number"
            },
            {
              label:"Коллекция",
              value:"collection",
              onClick:()=>settype("collection"),
                isActive:type === "collection"
            },
            {
              label:"Модели",
              value:"model",
              onClick:()=>settype("model"),
                isActive:type === "model"
            },
            {
              label:"Размеры",
              value:"size",
              onClick:()=>settype("size"),
                isActive:type === "size"
            },
            {
              label:"Форма",
              value:"shape",
              onClick:()=>settype("shape"),
                isActive:type === "shape"
            },
            {
              label:"Цвета",
              value:"color",
              onClick:()=>settype("color"),
                isActive:type === "color"
            },
            {
              label:"Стиль",
              value:"style",
              onClick:()=>settype("style"),
                isActive:type === "style"
            },
          ]} 
          title='Оснавные'
        />
        <TableWrapper 
          isAdd={true}
          isloading={isLoading}
          className='border-r border-border'
          title={type || ""}
          options={data?.items?.map((e)=>(
            {
              onDelete:()=>mutate(e?.value),
              ...e
            }
          ))}
          isPending={isPending as boolean}
        >
          {
              type === "model" && 
              <FormSelectInput
                classNameChild="mb-3 m-1 w-[95%] rounded-none bg-transparent border border-border" 
                className="w-full"
                fetchUrl="/collection"
                fieldNames={{ value: "id", label: "title" }}
                 name="collection"
                placeholder="collection"
              />
            }
         <div className="w-[95%] relative">
          <FormTextInput 
              classNameInput="mb-3 m-1 w-full bg-transparent border border-border" 
              name="title"
              type={"string"}
              placeholder="title" 
              />
              <Button className={`w-[30px] hover:bg-sidebar absolute top-2.5 right-0.5 flex items-center justify-center cursor-pointer h-[30px] rounded-[2px] bg-sidebar  text-border`}>
                <Check/>
              </Button>
         </div>
        </TableWrapper>

    </>
  );
}
