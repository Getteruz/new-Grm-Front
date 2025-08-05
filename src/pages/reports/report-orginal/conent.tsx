import FormTextInput from "@/components/forms/FormTextInput";
import { Button } from "@/components/ui/button";
import useDataFetch from "./queries";
import { useMeStore } from "@/store/me-store";
import { format, getMonth, getYear } from "date-fns";
import { parseAsString, useQueryState } from "nuqs";
import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";

export default function Conent() {
  const  {meUser} = useMeStore()
  const [month] = useQueryState(
    "month",
    parseAsString.withDefault(getMonth(new Date()) + 1 + "")
  );
  const [filial] = useQueryState("filial");
  const {data} = useDataFetch({
    queries:{
      filialId:meUser?.position?.role == 4 ? meUser?.filial?.id : filial || undefined,
      month: +month || undefined,
      year:getYear(new Date()) ,
    }
  })
  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];

  return (
    <div className="h-full flex flex-col w-full border-border border-x">
      <div className="flex items-center border-border border-b h-[56px] gap-[100px] justify-center">
        <p className="text-[13px] text-[#272727] font-semibold">{format(new Date(2025, +month - 1, 1), "MMMM")} {getYear(new Date()) }</p>
        <p className="text-[17px] text-[#272727] font-extrabold">
          {meUser?.position?.role == 4 ? meUser?.filial?.name : "Филиал"}
        </p>
        <p className="text-[13px] text-[#272727] font-semibold">
          {meUser?.firstName} {meUser?.lastName}
        </p>
      </div>

      <div className="w-full max-w-[610px] mx-auto border-border border m-[20px] overflow-hidden  rounded-sm">
          {
           flatData?.map((e) => (
              <div key={e?.id} className="flex items-center w-full border-border border-b">
              
                <p className="pr-[23px] py-[11px] flex items-center gap-[3px]  w-[379px] text-[#272727] text-[15px] border-border border-r font-medium">
                  <TableAction 
                   ShowPreview={false}
                    ShowUpdate={false}
                    id={e?.id}
                    url={apiRoutes.paperReport}
                    refetchUrl={apiRoutes.paperReport}
                    /> {e?.title}
                </p>
                <p className="px-[23px] py-[11px] w-[110px]  text-nowrap text-[#272727] text-[15px]  border-border border-r font-medium">
                  {e?.price} м²
                </p>
                <p className="px-[23px] py-[11px]  w-[110px] text-nowrap text-[#272727] text-[15px] font-medium">
                  ${e?.price}
                </p>
              </div>
            ))
          }
        <div className="flex items-center w-full border-border border-b">
          <FormTextInput classNameInput="min-w-[378px] bg-background"  name="title" placeholder="Пишите сюда" />
          <FormTextInput classNameInput="min-w-[100px] bg-background" name="price" type="number" placeholder="price" />
          <FormTextInput classNameInput="min-w-[100px] bg-background" disabled name="price1" type="number" placeholder="price" />
        </div>
      </div>

      <div className="flex items-center justify-center border-border border-t mt-auto p-3">
        <Button disabled={month !== getMonth(new Date()) + 1 + ""} className="w-full rounded-md max-w-[610px] bg-[#272727]">
          Добавить
        </Button>
      </div>
    </div>
  );
}
