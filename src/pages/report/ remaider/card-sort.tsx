import { parseAsString, useQueryState } from "nuqs";

import { Skeleton } from "@/components/ui/skeleton";
import { DialogTrigger } from "@/components/ui/dialog";

import { MIcon } from "@/components/icons";
import useProductRemainingProducts, { useProductRemainingColaction } from "./queries";
import { useMeStore } from "@/store/me-store";

export default function CardSortRemaider() {
  const { meUser } = useMeStore();
  const {data} = useProductRemainingProducts({
   queries:{
    filialId:meUser?.filial?.id
   }
  })

  const {data:remainingColaction} = useProductRemainingColaction({
    queries:{
      filialId:meUser?.filial?.id
    }
  })
  const [sorttype, setSortType] = useQueryState("sorttype", parseAsString);
  const  isReportLoading=false;

  console.log(remainingColaction,"remainingColaction")

  const columns = [
    {
      title: "Kartal",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(0)
      ),
    },
    {
      title: "Gheteran",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice( 0)
      ),
    },
  ];

  function formatPrice(price: number): string {
    return Number(price).toFixed(2);
  }

  return (
      <div className=" flex bg-sidebar ">
          <div className="bg-sidebar p-5 pl-7 w-full border-border border-r max-w-[399px]">
            <div className="flex gap-3 items-center">
              <MIcon  />
              <div>
                <p className="text-[12px] ">У вас должно быть:</p>
                {false ? (
                  <Skeleton className="h-7 w-24 mt-1" />
                ) : (
                  <p className="text-[25px] font-bold text-foreground">
                   {data?.remainingSize}
                  </p>
                )}
              </div>
            </div>
            <p className="text-[12px] mt-[15px] mb-1 text-[#5D5D53]">
                Сумма объёма
            </p>
            <p className="text-[14px] font-semibold">   {data?.remainingSum} $</p>
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
