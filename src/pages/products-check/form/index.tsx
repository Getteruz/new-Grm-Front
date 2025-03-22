import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { ProductsCheckFormType, ProductsCheckSchema } from "./schema";
import ProductsCheckFormContent from "./content";
import { useProductsCheckById, useProductsCheckMutation } from "./actions";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";

const ActionPage = () => {
  const form = useForm<ProductsCheckFormType>({
    resolver: zodResolver(ProductsCheckSchema),
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useProductsCheckById({
    id: id != "new" ? id : undefined, });
  const { mutate } = useProductsCheckMutation({
    onSuccess: () => {
      if (id == "new") {
        toast.success("savedSuccessfully");
      } else {
        toast.success("updatedSuccessfully");
      }
      navigate("/crops");
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data?.name || "",
     
      });
    }
  }, [data]);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          mutate({ data: data, id: id !== "new" ? id : undefined });
        })}
      >
        <ProductsCheckFormContent />
      </form>
    </FormProvider>
  );
};

export default ActionPage;
