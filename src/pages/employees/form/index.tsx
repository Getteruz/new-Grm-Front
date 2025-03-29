import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUserById, useUserMutation } from "./actions";
import { UserFormType, UserSchema } from "./schema";
import { useQueryState } from "nuqs";
import FormContent from "./content";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "@/service/apiRoutes";

const ActionPage = () => {
  const form = useForm<UserFormType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      filial: {
        value: undefined,
        label: "",
    },
    position: {
      value: undefined,
      label: "",
  },
    }
  });
  const [id,setId] = useQueryState("id");
  const { data } = useUserById({
    id: id != "new" ? id || undefined : undefined,
  });
  const queryClient = useQueryClient();
  const resetFrom =()=>{
    form.reset({ });
  }
  const { mutate } = useUserMutation({
    onSuccess: () => {
      resetFrom()
      setId(null)
      queryClient.invalidateQueries({ queryKey: [apiRoutes.filial] });
      if (id == "new") {
        toast.success("savedSuccessfully");
      } else {
        toast.success("updatedSuccessfully");
      }
    },
  });

  useEffect(() => {
    if (data) {
      // form.reset({
      //   ...Object.keys(UserSchema.shape).reduce((acc, key) => ({
      //     ...acc,
      //     [key]: data?.[key as keyof typeof data] || ""
      //   }), {})
      // });
    }
  }, [data]);
  return (
    <Dialog  open={Boolean(id)} onOpenChange={(isopen:boolean)=>{
      if(!isopen){
        setId(null)
        resetFrom()
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
