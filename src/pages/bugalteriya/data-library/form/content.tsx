
import { useState } from "react";

import FormComboboxDemoInput from "@/components/forms/FormCombobox";
import FormTextInput from "@/components/forms/FormTextInput";
import TableWrapper from "@/components/table-wrapper";

export default function FormContent() {
  const [type,settype] = useState<string>()
  return (
    < >
      <TableWrapper 
        className='border-r border-border'
            options={[
            {
                label:"Страна",
                value:"Страна"
            },
          ]} 
          title='Оснавные'
        />
          <TableWrapper 
          className='border-r border-border'
          title='Страна'
        >
          <FormTextInput 
            classNameInput="mb-3 m-1 w-[95%] bg-sidebar border border-border" 
            name="name"
            placeholder="name" 
            />
            {
              type === "Партии" && 
              <FormComboboxDemoInput 
                classNameChild="mb-3 m-1 w-[95%] rounded-none bg-sidebar border border-border" 
                className="w-full"
                option={[{label:"new",value:"new"}]}
                 name="nam1"
                placeholder="name"
              />
            }
        </TableWrapper>

    </>
  );
}
