
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {   DialogFooter, DialogHeader } from "@/components/ui/dialog";
import FormTextInput from "@/components/forms/FormTextInput";
import FormTimePicker from "@/components/forms/FormTimePicker";
import FormDatePicker from "@/components/forms/FormDateRangePicker";
import FormComboboxDemoInput from "@/components/forms/FormCombobox";

export default function FormContent() {
  return (
      <>
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
        </DialogHeader>
      <div className="grid row-start  mb-2 gap-4 lg:grid-cols-3">
      <FormTextInput label="firstName" className="w-full" name="firstName" placeholder="firstName"  />
        <FormTextInput label="lastName" className="w-full" name="lastName" placeholder="lastName"  />
        <FormTextInput label="fatherName" className="w-full" name="fatherName" placeholder="fatherName"  />
        <FormDatePicker label="hired" className="w-full" name="hired" placeholder="hired" />
      <div className="flex w-full overflow-hidden items-end">
      <FormTimePicker label="Время работы" className="w-1/2" name="from" placeholder="from" />
      <FormTimePicker  className="w-1/2" name="to" placeholder="to" />
      </div>
      <FormTextInput type="tel" label="phone" className="w-full" name="phone" placeholder="phone"  />
      <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            fetchUrl="/filial"
            name="filial"
            placeholder="filial"
            label="filial"
          />
         
      <FormTextInput type="number" label="salary"  name="salary" placeholder="salary"  />

      <FormComboboxDemoInput
            fieldNames={{ value: "id", label: "title" }}
            name="bonus"
            option={[]}
            disabled={true}
            placeholder="bonus"
            label="bonus"
          />

        <FormComboboxDemoInput
          fieldNames={{ value: "id", label: "title" }}
          fetchUrl="/position"
          name="position"
          placeholder="position"
          label="position"
        />
      <FormTextInput label="login"  name="login" placeholder="login"  />

      </div>
        <DialogFooter className="justify-start mt-2 flex">
          <Button type="submit">Save</Button>
          <Button variant={'outline'} type="button">back</Button>
        </DialogFooter>
      </>
     
   
   
  );
}
