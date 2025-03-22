import FormTextInput from "@/components/forms/FormTextInput";
import Filters from "./filters";
import BarcodeQenerat from "@/components/barcode-generat";
import Teminal from "@/components/teminal";

export default function FormContent() {
  return (
    <div className="w-full">
      <Filters/>
       <div className="grid row-start  px-[40px] py-[20px] gap-2 lg:grid-cols-2">
         <FormTextInput classNameInput="h-[28px] p-2" name="name" placeholder="name" label="name" />
         <FormTextInput classNameInput="h-[28px] p-2" name="name" placeholder="name" label="name" />
         <FormTextInput classNameInput="h-[28px] p-2" name="name" placeholder="name" label="name" />
         <FormTextInput classNameInput="h-[28px] p-2" name="name" placeholder="name" label="name" />
         <FormTextInput classNameInput="h-[28px] p-2" name="name" placeholder="name" label="name" />
         <FormTextInput classNameInput="h-[28px] p-2" name="name" placeholder="name" label="name" />
       </div>
       <BarcodeQenerat/>
    </div>
  );
}
