import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useProductsCheckById } from "./actions";
import ProductsCheckFormContent from "./content";
import { ProductsCheckFormType, ProductsCheckSchema } from "./schema";

const ActionPage = () => {
  const form = useForm<ProductsCheckFormType>({
    resolver: zodResolver(ProductsCheckSchema),
  });
  const [id] = useQueryState("id");
  const [barcode] = useQueryState("barcode");

  const { data } = useProductsCheckById({
    id: id || undefined,
  });

  useEffect(() => {
    if (data) {
      form.reset({
        code: data?.code || "",

        name: data.id,
        country: data?.country?.title,
        collection: data?.collection?.title,
        size: data?.size?.title,
        shape: data?.shape?.title,
        style: data?.style?.title,
        color: data?.color?.title,
        model: data?.model?.title,
        factory: data?.factory?.title,
      });
    }
  }, [data]);

  useEffect(() => {
    form.setValue("code", barcode || "");
  }, [barcode]);

  return (
    <FormProvider {...form}>
      <form>
        <ProductsCheckFormContent />
      </form>
    </FormProvider>
  );
};

export default ActionPage;
