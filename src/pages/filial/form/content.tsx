
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {   DialogFooter, DialogHeader } from "@/components/ui/dialog";
import FormTextInput from "@/components/forms/FormTextInput";
import FormTimePicker from "@/components/forms/FormTimePicker";

export default function FormContent() {
  return (
      <>
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
        </DialogHeader>
      <div className="grid row-start  mb-2 gap-4 lg:grid-cols-3">
      <FormTextInput label="title" className="w-full" name="title" placeholder="title"  />
        <FormTextInput label="name" className="w-full" name="name" placeholder="name"  />
        <FormTextInput label="addressLink" className="w-full" name="addressLink" placeholder="addressLink"  />
        <FormTextInput label="address" className="w-full" name="address" placeholder="address"  />
        <FormTextInput label="landmark" className="w-full" name="landmark" placeholder="landmark"  />
        <FormTextInput type="tel" label="phone1" className="w-full" name="phone1" placeholder="phone1"  />
        <FormTextInput label="telegram" className="w-full" name="telegram" placeholder="telegram"  />
        <FormTimePicker label="telegram" className="w-full" name="startWorkTime" placeholder="startWorkTime"  />
        <FormTimePicker label="endWorkTime" className="w-full" name="endWorkTime" placeholder="endWorkTime"  />
        
      </div>
        <DialogFooter className="justify-start mt-2 flex">
          <Button type="submit">Save</Button>
          <Button variant={'outline'} type="button">back</Button>
        </DialogFooter>
      </>
     
   
   
  );
}
