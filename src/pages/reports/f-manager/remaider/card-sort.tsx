import { parseAsString, useQueryState } from "nuqs";

import { Skeleton } from "@/components/ui/skeleton";

import { MIcon } from "@/components/icons";
import useProductRemainingProducts, { useProductRemainingColaction } from "./queries";
import { useMeStore } from "@/store/me-store";

export default function CardSortRemaider() {
  const { meUser } = useMeStore();

  const [fromDate] = useQueryState<Date | undefined>("startDate", {
    parse: () => undefined,
  });

  const [toDate] = useQueryState<Date | undefined>("endDate", {
    parse: () => undefined,
  });
  const {data} = useProductRemainingProducts({
   queries:{
    filialId:meUser?.filial?.id,
    startDate:fromDate || undefined,
    endDate:toDate|| undefined
  }
  })

  const {data:remainingColaction} = useProductRemainingColaction({
    queries:{
      filialId:meUser?.filial?.id,
      startDate:fromDate|| undefined,
      endDate:toDate|| undefined
    }
  })
  const [sorttype, setSortType] = useQueryState("sorttype", parseAsString);

  function formatPrice(price: number): string {
    return Number(price).toFixed(2);
  }

  return (
      <div className=" flex bg-sidebar ">
          <div className="bg-sidebar p-5 pl-7 w-full border-border border-r max-w-[399px]">
            <div className="flex gap-3 items-center">
              <MIcon />
              <div>
                <p className="text-[12px] ">У вас должно быть:</p>
                {false ? (
                  <Skeleton className="h-7 w-24 mt-1" />
                ) : (
                  <p className="text-[25px] font-bold text-foreground">
                   {formatPrice(data?.remainingSize|| 0)}
                  </p>
                )}
              </div>
            </div>
            <p className="text-[12px] mt-[15px] mb-1 text-[#5D5D53]">
                Сумма объёма
            </p>
            <p className="text-[14px] font-semibold">   {formatPrice(data?.remainingSum|| 0)} $</p>
          </div>
          <div className="grid row-start w-full  grid-cols-4  ">
            {remainingColaction?.map((e) => (
              <div
                key={e?.country?.id}
                onClick={() => setSortType(e?.country?.id)}
                className={`${sorttype == e?.country?.id? "bg-primary   text-background" : "bg-sidebar  text-primary"} h-[78px] border-border border-r border-b  flex justify-between items-center cursor-pointer px-4 py-5`}
              >
                <div className="">
                  <p className="text-[12px] mb-0.5 flex  items">{e?.country?.title}</p>
                <p className="text-[15px]  font-medium">{formatPrice(e?.remainingSize)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
  );
}
