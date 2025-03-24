
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import {   DialogFooter, DialogHeader } from "@/components/ui/dialog";
import FormTextInput from "@/components/forms/FormTextInput";

export default function FormContent() {
  return (
      <>
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
        </DialogHeader>
      <div className="grid row-start  gap-4 lg:grid-cols-3">
      <FormTextInput label="title" className="w-full" name="title" placeholder="title"  />
        <FormTextInput label="name" className="w-full" name="name" placeholder="name"  />
        <FormTextInput label="addressLink" className="w-full" name="addressLink" placeholder="addressLink"  />
        <FormTextInput label="address" className="w-full" name="address" placeholder="address"  />
        <FormTextInput label="landmark" className="w-full" name="landmark" placeholder="landmark"  />
        <FormTextInput label="phone1" className="w-full" name="phone1" placeholder="phone1"  />
        <FormTextInput label="telegram" className="w-full" name="telegram" placeholder="telegram"  />
        <FormTextInput label="telegram" className="w-full" name="startWorkTime" placeholder="startWorkTime"  />
        <FormTextInput label="endWorkTime" className="w-full" name="endWorkTime" placeholder="endWorkTime"  />
      </div>
        <DialogFooter className="justify-start flex">
          <Button type="submit">Save</Button>
          <Button variant={'outline'} type="button">back</Button>
        </DialogFooter>
      </>
     
   
   
  );
}
