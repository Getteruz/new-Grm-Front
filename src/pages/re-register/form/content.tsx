import FormTextInput from "@/components/forms/FormTextInput";
import Filters from "./filters";
import BarcodeQenerat from "@/components/barcode-generat";
import FormComboboxDemoInput from "@/components/forms/FormCombobox";
import { Button } from "@/components/ui/button";

export default function FormContent() {
  return (
    <div className="w-full">
      <Filters/>
       <div className="grid row-start  px-[40px] py-[20px] gap-2 lg:grid-cols-2">
         <FormTextInput classNameInput="h-[28px] p-2" name="code" placeholder="code" label="code" />
         <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/country"
             classNameChild="h-[28px] p-2"
            name="country"
            placeholder="country"
            label="country"
          />
           <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/collection"
            name="collection"
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
           <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/size"
            name="size"
             classNameChild="h-[28px] p-2"
            placeholder="size"
            label="size"
          />
           <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/shape"
            name="shape"
             classNameChild="h-[28px] p-2"
            placeholder="shape"
            label="shape"
          />
           <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/style"
            name="style"
             classNameChild="h-[28px] p-2"
            placeholder="style"
            label="style"
          />
           <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/color"
            name="color"
             classNameChild="h-[28px] p-2"
            placeholder="color"
            label="color"
          />
         
         
       </div>
       <div className="bg-sidebar border-y text-primary border-border  h-[44px] rounded-t-sm flex   ">
            <Button  className="h-full  w-full text-primary justify-center font-[16px] gap-1.5  border-none" 
            variant={"outline"} > 
           
           Добавить
            </Button>
        </div>
       <BarcodeQenerat/>
    </div>
  );
}
