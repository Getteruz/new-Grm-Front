import {  parseAsString, useQueryState } from "nuqs";
import ShadcnSelect from "../Select";
import { useTranslation } from "react-i18next";

interface iFilterSelect {
    name:string;
    defaultValue?:string;
    placeholder?:string;
    className?:string;
    classNameValue?:string;
    classNameContainer?:string;
    classNameItem?:string;
    options?:{
      label:string;
      value:string;
    }[]
}
export default function FilterSelect({name,placeholder,className,classNameItem,defaultValue,classNameContainer,options,classNameValue}:iFilterSelect) {
    const  [value,setValue] = useQueryState(name,parseAsString.withDefault(defaultValue || ""))
    const {t} = useTranslation()
  return (
      <ShadcnSelect
              className={` border-none  ${className && className}`}
            disabled={false}
            value={value||undefined}
            defaultValue={defaultValue && defaultValue}
            classNameContainer={classNameContainer && classNameContainer}
            classNameValue={classNameValue && classNameValue}
            classNameItem={classNameItem && classNameItem}
            isLoading={false}
            options={ options? options:[{label:"label",value:"value"},{label:"label",value:"value"}]}
            placeholder={placeholder ? t(placeholder) : "select"}
            onChange={(e)=>setValue(e||"")}
          />
  )
}
