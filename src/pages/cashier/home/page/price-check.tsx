import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";

import CheckList from "@/components/check";
import { Button } from "@/components/ui/button";
import { UpdatePatchData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";

import { IData } from "../type";

export default function Pricecheck({ selected }: { selected: IData[] }) {
  const price = selected?.reduce((a, b) => a + b.plasticSum + b.price , 0);
  const discountSum = selected?.reduce(
    (a, b) => a + b.discountSum,
    0
  );
  const queryClient = useQueryClient();
  const AccepedFunt = () => {
    UpdatePatchData(apiRoutes.order + "/accept", "", {
      ids: selected?.map((e) => e.id),
    })
      .then(() => {
        toast.success("Подтверждено успешно");
        queryClient.invalidateQueries({ queryKey: [apiRoutes.orderByKassa] });
      })
      .catch(() => toast.error("что-то пошло не так"));
  };
  return (
    <div className="w-full bg-card max-w-[312px] flex flex-col justify-between  h-[calc(100vh-90px)] pt-[23px] ">
      <div className="w-full  h-[calc(100vh-260px)]  overflow-y-scroll px-5">
        <div className="sticky top-0">
        <p className="text-primary text-[14px] font-medium">Итого:</p>
        <p className="text-primary font-bold text-[28px] mt-0.5 mb-[27px]">
          {price} $
        </p>
        <div className="bg-background flex items-center  text-primary justify-between px-[13px] py-[14px] mb-[1px]">
          <p className="text-[14px] font-semibold ">Cкидка:</p>
          <p className="text-[22px] font-semibold">
            - {discountSum}$
          </p>
          {/* <p className="text-[14px] font-semibold mt-2.5 text-[#E38157]">
            -{discount}%
          </p> */}
        </div>
        <div className="bg-background flex items-center  mb-2 text-primary justify-between px-[13px] py-[14px] ">
          <p className="text-[14px] font-semibold ">Промокод:</p>
          <p className="text-[22px] font-semibold">~</p>
        </div>
        </div>
        
        
        <CheckList price={price} discountSum={discountSum} selected={selected} />
      </div>

      <div className="w-full">
        <Button
          onClick={AccepedFunt}
          className="w-full h-[90px] p-10 bg-primary mt-auto text-background text-[22px] font-semibold "
        >
          Подтвердить продажу
        </Button>
        <div className="flex items-center text-primary justify-between px-4 py-2.5">
          <p className="text-[14px] font-medium">
            {format(new Date(), "EEE, MMM d, yyyy ")}
          </p>
          <p className="text-[14px] font-medium">
            {format(new Date(), "HH:mm")}
          </p>
        </div>
      </div>
    </div>
  );
}
