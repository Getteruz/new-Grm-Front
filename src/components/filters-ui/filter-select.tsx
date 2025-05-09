import { Store } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useTranslation } from "react-i18next";

import ShadcnSelect from "../Select";

interface iFilterSelect {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  classNameValue?: string;
  classNameContainer?: string;
  classNameItem?: string;
  icons?: boolean;
  options?: {
    label: string;
    value: string;
  }[];
}
export default function FilterSelect({
  name,
  icons,
  placeholder,
  className,
  classNameItem,
  defaultValue,
  classNameContainer,
  options,
  classNameValue,
}: iFilterSelect) {
  const [value, setValue] = useQueryState(
    name,
    parseAsString.withDefault(defaultValue || "")
  );
  const { t } = useTranslation();
  return (
    <div className={`flex items-center  ${className && className}`}>
      {icons ? <Store /> : ""}
      <ShadcnSelect
        className={` border-none  ${className && className}`}
        disabled={false}
        value={value || undefined}
        defaultValue={defaultValue && defaultValue}
        classNameContainer={classNameContainer && classNameContainer}
        classNameValue={classNameValue && classNameValue}
        classNameItem={classNameItem && classNameItem}
        isLoading={false}
        options={
          options
            ? options
            : [
                { label: "label", value: "value" },
                { label: "label", value: "value" },
              ]
        }
        placeholder={placeholder ? t(placeholder) : "select"}
        onChange={(e) => setValue(e || "")}
      />
    </div>
  );
}
