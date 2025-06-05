
import { parseAsString, useQueryState } from "nuqs";
import { useTranslation } from "react-i18next";

import ShadcnSelect from "../Select";
import { useEffect } from "react";

interface iFilterSelect {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  classNameValue?: string;
  classNameContainer?: string;
  classNameItem?: string;
  icons?: React.ReactNode;
  options?: {
    label: string;
    value: string | undefined;
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

  useEffect(()=>{
    if(defaultValue)  setValue(defaultValue)
  },[defaultValue])

  const { t } = useTranslation();
  
  return (
    <div className={`flex items-center  ${className && className}`}>
      { icons && icons}
      <ShadcnSelect
        className={` border-none  ${className && className}`}
        disabled={false}
        value={value?.length ? value : undefined}
        defaultValue={defaultValue && defaultValue}
        classNameContainer={classNameContainer && classNameContainer}
        classNameValue={classNameValue && classNameValue}
        classNameItem={classNameItem && classNameItem}
        isLoading={false}
        options={
          options
            ? options
            : []
        }
        placeholder={placeholder ? t(placeholder) : "Выберите"}
        onChange={(e) => {
          if(e== "clear"){
            setValue(null)
          }else{
            setValue(e || "")
          }
        }}
      />
    </div>
  );
}
