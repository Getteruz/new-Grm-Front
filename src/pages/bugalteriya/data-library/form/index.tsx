import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { useDataLibrary,useDataLibraryId } from "./actions";
import { CropFormType, CropSchema } from "./schema";
import FormContent from "./content";
import { parseAsString, useQueryState } from "nuqs";
import { useQueryClient } from "@tanstack/react-query";

const ActionPage = () => {
  const form = useForm<CropFormType>({
    resolver: zodResolver(CropSchema),
  });
  const { id } = useParams();
  const { data } = useDataLibraryId({
    id: id != "new" ? id : undefined,
  });
  const [type] = useQueryState("type",parseAsString.withDefault('country'))
  const [idMadal,setidMadal] = useQueryState("idMadal",parseAsString.withDefault('new'))
const queryClient = useQueryClient()

  const { mutate ,isPending} = useDataLibrary({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [type] });
      form.reset({
        title:''
      })
      setidMadal("new")
      if (idMadal == "new") {
        toast.success("savedSuccessfully");
      } else {
        toast.success("updatedSuccessfully");
      }
    },
  });

  useEffect(()=>{
    form.reset({
      title:''
    })
    setidMadal("new")
  },[type])

  useEffect(() => {
    if (data) {
      form.reset({
        title: data?.title || "",
        });
    }
  }, [data]);
  return (
    <FormProvider {...form}>
      <form
      className="w-1/3 flex"
        onSubmit={form.handleSubmit((data) => {
          mutate({url:`/${type}`, data: data, id: idMadal !== "new" ? idMadal : undefined });
        })}
      >
        <FormContent isPending={isPending} />
      </form>
    </FormProvider>

  );
};

export default ActionPage;
