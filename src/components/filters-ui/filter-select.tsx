import { useQueryState } from "nuqs";
import ShadcnSelect from "../Select";
import { useTranslation } from "react-i18next";

interface iFilterSelect {
    name:string;
    placeholder?:string;
    className?:string;
    options?:{
      label:string;
      value:string;
    }[]
}
export default function FilterSelect({name,placeholder,className,options}:iFilterSelect) {
    const  [value,setValue] = useQueryState(name)
    const {t} = useTranslation()
  return (
      <ShadcnSelect
              className={` border-none  ${className && className}`}
            disabled={false}
            value={value||undefined}
            isLoading={false}
            options={ options? options:[{label:"label",value:"value"},{label:"label",value:"value"}]}
            placeholder={placeholder ? t(placeholder) : "select"}
            onChange={(e)=>setValue(e||"")}
          />
  )
}
