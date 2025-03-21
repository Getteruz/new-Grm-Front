import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { getAllData } from "@/service/apiHelpers";
import { TResponse } from "@/types";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import ShadcnSelect from "../Select";

interface Props<TQuery> {
  name: string;
  label?: string;
  placeholder?: string;
  fetchUrl: string;
  className?: string;
  disabled?: boolean;
  queries?: TQuery;
  fieldNames?: {
    value: string;
    label: string;
  };
}

export default function FormSelectInput<IData, TQuery>({
  name,
  fetchUrl,
  label,
  placeholder,
  className,
  disabled,
  queries,
  fieldNames,
}: Props<TQuery>) {
  const { control } = useFormContext();
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  const { data, isLoading } = useQuery({
    queryKey: [fetchUrl],
    enabled: open,
    queryFn: () => getAllData<TResponse<IData>, TQuery>(fetchUrl, queries),
    select: (res) => ({
      data: res?.items.map((item) => ({
        value: fieldNames?.value
          ? (item as Record<string, string>)[fieldNames.value]
          : String(item),
        label: fieldNames?.label
          ? (item as Record<string, string>)[fieldNames.label]
          : String(item),
      })),
      meta: res.meta,
    }),
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem
            className={cn("flex flex-col items-start w-full", className)}
          >
            {label && (
              <FormLabel className="mb-1 font-medium text-foreground ">
                {t(label)}
              </FormLabel>
            )}
            <FormControl className="w-full">
              <ShadcnSelect
                onOpenChange={() => setOpen(true)}
                disabled={disabled}
                value={field.value}
                isLoading={isLoading}
                options={data?.data || []}
                placeholder={placeholder ? t(placeholder) : ""}
                onChange={field.onChange}
                className="border-none"
              />
            </FormControl>
            <FormMessage className="text-sm text-red-500" />
          </FormItem>
        );
      }}
    />
  );
}
