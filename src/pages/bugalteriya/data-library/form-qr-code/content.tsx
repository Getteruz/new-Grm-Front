import FormTextInput from "@/components/forms/FormTextInput";
import Filters from "./filters";
import BarcodeQenerat from "@/components/barcode-generat";
import FormComboboxDemoInput from "@/components/forms/FormCombobox";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";
import { Plus, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { generateRandomNumber } from "@/utils/generate";

export default function FormContent() {
  const [id,setId] = useQueryState("id");
  const [editble,setEditble] = useState<boolean>(true);
  const { watch,setValue } = useFormContext();
  useEffect(()=>{
    if(id === "new"){
      setEditble(true)
    }else{
      setEditble(false)
    }
  },[id])
  const collectionId = watch('collection')
  // const isMetric = watch('isMetric')

  const handleRegenrate = () => {
    const code = generateRandomNumber(1000000000000, 9999999999999)
    setValue('code',code)
  }

  return (
    <div className="w-full border-r border-border">
      <Filters/>
       <div className="grid row-start  px-[40px] py-[20px] gap-2 lg:grid-cols-2">
         <FormTextInput 
          classNameInput="h-[28px] p-2"
          name="code"
          placeholder="code"
          label="code"
          disabled={!editble}
            />
         <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/country"
             classNameChild="h-[28px] p-2"
            name="country"
            placeholder="country"
            label="country"
            disabled={!editble}
          />
           <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/collection"
            name="collection"
            classNameChild="h-[28px] p-2"
            placeholder="collection"
            label="collection"
            disabled={!editble}
          />
          <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl={collectionId?.value ? `/model/by-collection/${collectionId?.value}`:`/model`}
            name="model"
            disabled={!editble }
            classNameChild="h-[28px] p-2"
            placeholder="model"
            label="model"
          />
          <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/size"
            name="size"
             classNameChild="h-[28px] p-2"
            placeholder="size"
            label="size"
            disabled={!editble}
          />
           <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            option={[{value:'true', label: "Метражный"},{value:'false',label:"Штучный"}]}
            name="isMetric"
            classNameChild="h-[28px] p-2"
            placeholder="isMetric"
            label="isMetric"
            disabled={!editble}
          />
           <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/shape"
            name="shape"
            classNameChild="h-[28px] p-2"
            placeholder="shape"
            label="shape"
            disabled={!editble}
          />
           <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/style"
            name="style"
            classNameChild="h-[28px] p-2"
            placeholder="style"
            label="style"
            disabled={!editble}
          />
           <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/color"
            name="color"
            classNameChild="h-[28px] p-2"
            placeholder="color"
            label="color"
            disabled={!editble}
          />
         
         <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/factory"
            name="factory"
            classNameChild="h-[28px] p-2"
            placeholder="factory"
            label="factory"
            disabled={!editble}
          />
       </div>
       <div className="bg-sidebar border-y text-primary border-border  h-[44px] rounded-t-sm flex   ">
            <Button  type="button" onClick={()=>{
              setId('new')
              handleRegenrate()
            }} className="h-full  w-1/3 text-primary justify-center font-[16px] gap-1.5  border-none" 
            variant={"outline"} > 
            <Plus />
              Создать новый
            </Button>
            <Button  onClick={()=>setEditble(true)}  type="button" className="h-full border-y-0 w-1/3 text-primary justify-center font-[16px] gap-1.5  " 
            variant={"outline"} > 
             <SquarePen className="text-primary" />
             Изменить
            </Button>
            <Button  className="h-full  w-1/3 text-primary justify-center font-[16px] gap-1.5  border-none" 
            variant={"outline"} > 
            Добавить
            </Button>
        </div>
       <BarcodeQenerat/>
    </div>
  );
}
