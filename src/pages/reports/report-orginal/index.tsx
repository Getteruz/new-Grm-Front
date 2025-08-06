import Conent from "./conent";
import LeftConent from "./left-conent";
import RightConent from "./right-conent";

import { FormProvider, useForm } from "react-hook-form";
import { ReportFormType, ReportSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "@/service/apiRoutes";
import { AddData } from "@/service/apiHelpers";
import { toast } from "sonner";
import { useMeStore } from "@/store/me-store";
import { useQueryState } from "nuqs";

export default function PageOrginal() {
  const form = useForm<ReportFormType>({
    resolver: zodResolver(ReportSchema),
  });
  const queryClient = useQueryClient();
  const {meUser} = useMeStore()
  const [filial] = useQueryState("filial");

  const { mutate } = useMutation({
    mutationFn: async ({ data }: { data: ReportFormType }) => {
      const costomData: object = {
        ...data,
        filialId: meUser?.position?.role == 4 ? meUser?.filial?.id : filial || undefined,
      };
      // if (id)
      //   return await UpdatePatchData<ReportFormType>(
      //     apiRoutes.user,
      //     id,
      //     costomData as ReportFormType
      //   );
      return await AddData<ReportFormType>(
        apiRoutes.paperReport,
        costomData as ReportFormType
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiRoutes.paperReport] });
      toast.success("savedSuccessfully");
      form.reset({
        title:"",
        price:0
      })
    },
  });


      
  return (
    <FormProvider {...form}>
      <form
        className="flex h-[calc(100vh-65px)]"
        onSubmit={form.handleSubmit((data) => {
          mutate({
            data: data,
          });
        })}
      >
        <LeftConent />
        <Conent />
        <RightConent />
      </form>
    </FormProvider>
  );
}
