import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { getAllData } from "@/service/apiHelpers";
import { TResponse } from "@/types";
import debounce from "@/utils/debounce";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  // FormMessage,
} from "../ui/form";
import { ComboboxDemo } from "./Combobox";

interface Props<TQuery> {
  name: string;
  label?: string;
  placeholder?: string;
  fetchUrl?: string;
  className?: string;
  disabled?: boolean;
  queries?: TQuery;
  option?: TOption[];
  classNameChild?:string;
  fieldNames?: {
    value: string;
    label: string;
  };
}

export type TOption = {
  label: string;
  value: string;
};

export default function FormComboboxDemoInput<IData, TQuery>({
  name,
  fetchUrl,
  label,
  placeholder,
  className,
  classNameChild,
  disabled,
  queries,
  option,
  fieldNames,
}: Props<TQuery>) {
  const { control, watch } = useFormContext();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState();

  const { data, isLoading } = useQuery({
    queryKey: [fetchUrl, search],
    enabled: open && Boolean(fetchUrl),
    queryFn: () =>
      getAllData<TResponse<IData>, TQuery>(fetchUrl || "", {
        search:search || undefined ,
        ...queries,
      } as TQuery),
    select: (res) => ({
      data: res?.items.map((item) => ({
        value: fieldNames?.value
          ? (item as Record<string, string>)[fieldNames?.value]
          : String(item),
        label: fieldNames?.label
          ? (item as Record<string, string>)[fieldNames?.label]
          : String(item),
      })),
      meta: res.meta,
    }),
  });

  const memoizedData = useMemo(() => {
    if (option) return option;

    const value = watch(name);

    if (!data?.data) return [value];
    const containsValue = data.data.some((item) => item.value === value.value);
    return containsValue ? data.data : [value, ...data.data];
  }, [data, fieldNames, watch(name), option]);

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
              <FormLabel className=" font-medium text-primary text-[12px] dark:text-white">
                {t(label)}
              </FormLabel>
            )}
            <FormControl className="w-full">
              <ComboboxDemo
               className={cn("w-full h-[42px]", classNameChild)}
                onOpenChange={() => setOpen(true)}
                onFilter={debounce((e) => setSearch(e.target.value), 500)}
                disabled={disabled}
                value={field.value?.value ||""}
                isLoading={isLoading}
                options={memoizedData}
                placeholder={placeholder ? t(placeholder) : ""}
                onChange={field.onChange}
              />
            </FormControl>
            {/* <FormMessage className="text-sm text-red-500" /> */}
          </FormItem>
        );
      }}
    />
  );
}
