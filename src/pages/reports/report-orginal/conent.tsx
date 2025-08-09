import FormTextInput from "@/components/forms/FormTextInput";
import { Button } from "@/components/ui/button";
import useDataFetch from "./queries";
import { useMeStore } from "@/store/me-store";
import { format, getMonth, getYear } from "date-fns";
import { parseAsString, useQueryState } from "nuqs";
import TableAction from "@/components/table-action";
import { apiRoutes } from "@/service/apiRoutes";
import { getAllData } from "@/service/apiHelpers";
import { useQuery } from "@tanstack/react-query";
import { TStaticData } from "./type";
import { forwardRef } from "react";

function RowUI({
  id,
  title,
  price,
  kv,
}: {
  id?: string;
  title: string;
  price: number;
  kv: number;
}) {
  return (
    <div className="flex items-center w-full border-border border-b">
      <p
        className={`${id ? "pr-[23px]" : "px-[23px]"}  py-[11px] flex items-center gap-[3px]  w-[379px] text-[#272727] text-[15px] border-border border-r font-medium`}
      >
        {id ? (
          <TableAction
            ShowPreview={false}
            ShowUpdate={false}
            id={id}
            url={apiRoutes.paperReport}
            refetchUrl={apiRoutes.paperReport}
          />
        ) : (
          ""
        )}
        {title}
      </p>
      <p className="px-[23px] py-[11px] w-[110px]  text-nowrap text-[#272727] text-[15px]  border-border border-r font-medium">
        {kv.toFixed(2)} м²
      </p>
      {
        <p className="px-[23px] py-[11px]  w-[110px] text-nowrap text-[#272727] text-[15px] font-medium">
          ${price.toFixed(2)}
        </p>
      }
    </div>
  );
}


export const Conent = forwardRef<HTMLDivElement>(
  (_, ref) => {
    const { meUser } = useMeStore();
    const [month] = useQueryState(
      "month",
      parseAsString.withDefault(getMonth(new Date()) + 1 + "")
    );
    const [filial] = useQueryState("filial");
  
    const { data: StatucData } = useQuery({
      queryKey: [apiRoutes.paperReportStatic,meUser,filial,month],
      queryFn: () =>
        getAllData<TStaticData, object>(apiRoutes.paperReportStatic, {
          month: +month || undefined,
          year: getYear(new Date()),
          filialId:
            meUser?.position?.role == 4
              ? meUser?.filial?.id
              : filial || undefined,
        }),
    });
  
    const { data } = useDataFetch({
      queries: {
        filialId:
          meUser?.position?.role == 4 ? meUser?.filial?.id : filial || undefined,
        month: +month || undefined,
        year: getYear(new Date()),
      },
    });
    const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
  
    return (
      <div ref={ref} className="min-h-full flex flex-col w-full border-border border-x">
        <div className="flex items-center border-border border-b h-[56px] gap-[100px] justify-center">
          <p className="text-[13px] text-[#272727] font-semibold">
            {format(new Date(2025, +month - 1, 1), "MMMM")} {getYear(new Date())}
          </p>
          <p className="text-[17px] text-[#272727] font-extrabold">
            {meUser?.position?.role == 4 ? meUser?.filial?.name : "Филиал"}
          </p>
          <p className="text-[13px] text-[#272727] font-semibold">
            {meUser?.firstName} {meUser?.lastName}
          </p>
        </div>
  
        <div  className="w-full max-w-[610px] max-h-[700px] mx-auto border-border border m-[20px] rounded-sm">
          <div className=" max-h-[640px]  overflow-scroll ">
            <RowUI
              title={"Продажа"}
              price={StatucData?.savdoNarxi || 0}
              kv={StatucData?.savdoKv || 0}
            />
            <RowUI
              title={"Terminal va perechisleniya savdosi"}
              price={StatucData?.terminal || 0}
              kv={0}
            />
            <RowUI
              title={"Inskassatsiya"}
              price={StatucData?.inkasatsiya || 0}
              kv={0}
            />
            <RowUI
              title={"Qaytgan tovarlar"}
              price={StatucData?.qaytganNarx || 0}
              kv={StatucData?.qaytganKv || 0}
            />
            {StatucData?.davlatlar?.map((item) => (
              <RowUI
                key={item?.countryId}
                title={item?.countryName}
                price={item?.totalPrice || 0}
                kv={item?.totalKv || 0}
              />
            ))}
  
            <RowUI
              title={"Skidka"}
              price={StatucData?.skidka || 0}
              kv={StatucData?.skidka || 0}
            />
            <RowUI
              title={"Qarzga sotilgan"}
              price={StatucData?.qarzgaSotilganNarx || 0}
              kv={StatucData?.qarzgaSotilganKv || 0}
            />
            <RowUI
              title={"Kelgan qarzlar"}
              price={StatucData?.kelganQarzlar || 0}
              kv={0}
            />
            <RowUI
              title={"Magazin rasxod"}
              price={StatucData?.magazinRasxod || 0}
              kv={0}
            />
            <RowUI title={"Навар сумма"} price={StatucData?.navar || 0} kv={0} />
  
            {flatData?.map((e) => (
              <RowUI
                key={e.id}
                id={e.id}
                title={e.title}
                price={e.price}
                kv={e.kv}
              />
            ))}
          </div>
          <div className="flex  items-center w-full border-border border-b">
            <FormTextInput
              classNameInput="min-w-[378px] bg-background"
              name="title"
              placeholder="Пишите сюда"
            />
             <FormTextInput
              classNameInput="min-w-[100px] bg-background"
              name="kv"
              type="number"
              placeholder="kv"
            />
            <FormTextInput
              classNameInput="min-w-[100px] bg-background"
              name="price"
              type="number"
              placeholder="price"
            />
          </div>
        </div>
  
        {meUser?.position?.role == 4 && (
          <div className="flex items-center justify-center border-border border-t mt-auto p-3">
            <Button
              disabled={month !== getMonth(new Date()) + 1 + ""}
              className="w-full rounded-md max-w-[610px] bg-[#272727]"
            >
              Добавить
            </Button>
          </div>
        )}
      </div>
    )
  }
);

