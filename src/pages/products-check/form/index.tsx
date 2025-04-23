import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useProductsCheckById } from "./actions";
import ProductsCheckFormContent from "./content";

const ActionPage = () => {
  const form = useForm();
  const [id] = useQueryState("id");
  const [barcode] = useQueryState("barcode");

  const { data } = useProductsCheckById({
    id: id || undefined,
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.id || "",
        code: data?.code || "",

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
