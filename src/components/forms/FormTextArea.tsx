import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
}

export default function FormTextArea({
  name,
  label,
  placeholder,
  className,
  ...props
}: Props) {
  const { control } = useFormContext();
  const { t } = useTranslation();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col items-start w-full", className)}>
          {label && (
            <FormLabel className="font-medium text-[#99998C] dark:text-white">
              {t(label)}
            </FormLabel>
          )}
          <FormControl className="w-full">
            <Textarea
              className="w-full"
              placeholder={placeholder ? t(placeholder) : ""}
              {...field}
              onChange={field.onChange}
              {...props}
            />
          </FormControl>
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
}
