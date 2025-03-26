import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";
import { PhoneInput } from "./phone-input";

interface Props extends InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  classNameInput?: string;
}

export default function FormTextInput({
  name,
  type,
  label,
  placeholder,
  className,
  classNameInput,
  ...props
}: Props) {
  const { control } = useFormContext();
  const { t } = useTranslation();
  // bg-[#EDECE3] text-[15px] leading-[18px] font-medium px-[13px] py-[20px] border-none outline-none rounded-none mb-[54px] w-full max-w-[296px]

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex gap-1 flex-col items-start w-full", className)}>
          {label && (
            <FormLabel className="font-medium text-[12px] text-primary">
              {t(label)}
            </FormLabel>
          )}
          <FormControl className="w-full">
           { type== "tel"?
            <PhoneInput
            placeholder={placeholder ? t(placeholder) : ""}
            onChange={field.onChange}
            value={field.value}
            />
           :
            <Input
              type={type ?? "text"}
              className={cn("flex flex-col items-start w-full", classNameInput)}
              placeholder={placeholder ? t(placeholder) : ""}
              {...field}
              onChange={(e) => {
                if (type === "number") {
                  if (isNaN(e.target.valueAsNumber)) {
                    field.onChange(null);
                  } else {
                    field.onChange(e.target.valueAsNumber);
                  }
                } else {
                  field.onChange(e.target.value);
                }
              }}
              {...props}
            />}
          </FormControl>
          {/* <FormMessage className="text-sm text-red-500" /> */}
        </FormItem>
      )}
    />
  );
}
