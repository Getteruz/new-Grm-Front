import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useFilialById, useFilialMutation } from "./actions";
import { FilialFormType, FilialSchema } from "./schema";
import { useQueryState } from "nuqs";
import FormContent from "./content";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ActionPage = () => {
  const form = useForm<FilialFormType>({
    resolver: zodResolver(FilialSchema),
    defaultValues: {
      type: 'filial',
    }
  });
  const [id,setId] = useQueryState("id");
  const { data } = useFilialById({
    id: id != "new" ? id || undefined : undefined,
  });
  const { mutate } = useFilialMutation({
    onSuccess: () => {
      if (id == "new") {
        toast.success("savedSuccessfully");
      } else {
        toast.success("updatedSuccessfully");
      }
      setId(null)
    },
  });

  console.log(form.formState.errors)

  useEffect(() => {
    if (data) {
      form.reset({
        name: data?.name || "",
        title: data?.title || "",
        telegram: data?.telegram || "",
        address: data?.address || "",
        addressLink: data?.addressLink || "",
        landmark: data?.landmark || "",
        phone1: data?.phone1 || "",
        startWorkTime:data?.startWorkTime||"",
        endWorkTime:data?.endWorkTime||"",
        type:"filial"
      });
    }
  }, [data]);


  return (
    <Dialog  open={Boolean(id)} onOpenChange={(isopen:boolean)=>{
      if(!isopen){
        console.log("hello")
        setId(null)
        form.reset()
      }
      }}>
        <DialogContent className="sm:max-w-[796px]">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              mutate({ data: data, id: id !== "new"  ? id || undefined : undefined });
            })}
          >
            <FormContent />
          
        
          </form>
        </FormProvider>
        </DialogContent>
      </Dialog>
  );
};

export default ActionPage;
