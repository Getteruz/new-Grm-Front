import { parseAsInteger, useQueryState } from "nuqs";
import useDataFetch from "./queries";
import Filters from "./filters";
import { Pen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { toast } from "sonner";
import { TData } from "./type";

const EditablePriceInput = ({ item, year }: { item: TData; year: string | number }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [price, setPrice] = useState(item?.plan_price);
  const queryClient = useQueryClient();

  useEffect(() => {
    setPrice(item?.plan_price);
  }, [item?.plan_price]);

  const { mutate, isPending } = useMutation({
    mutationFn: (newPrice: string) =>
      UpdateData(apiRoutes.filialPlan, item.filialId, {
        price: newPrice,
        year: Number(year),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [apiRoutes.filialPlan] });
      toast.success("Plan updated successfully");
      setIsEditable(false);
    },
    onError: () => {
      toast.error("Error updating plan");
    },
  });

  const handleBlur = () => {
    if (price != item.plan_price) {
      mutate(price);
    } else {
      setIsEditable(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div className="flex items-center gap-2 border rounded-md px-3 py-2 w-[200px] justify-between bg-white h-[45px]">
      {isEditable ? (
        <Input
          autoFocus
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={isPending}
          className="h-full p-0 border-none shadow-none focus-visible:ring-0 text-lg font-bold"
        />
      ) : (
        <span className="font-bold text-lg">
          {new Intl.NumberFormat("ru-RU").format(Number(price || 0)).replace(/,/g, " ")}{" "}
          $
        </span>
      )}
      {!isEditable && (
        <Pen
          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={() => setIsEditable(true)}
        />
      )}
    </div>
  );
};

export default function PlanYears() {
  const [limit] = useQueryState("limit", parseAsInteger.withDefault(10));
  const [page] = useQueryState("page", parseAsInteger.withDefault(1));
  const [year] = useQueryState("year");

  // const [search ] = useQueryState("search");
  const { data } = useDataFetch({
    year: year || "2026",
    queries: {
      limit,
      page,
      // search:search || undefined,
    },
  });
  const flatData = data?.pages?.flatMap((page) => page?.items || []) || [];
  return (
    <>
      <Filters />
      <div className="bg-[#EEEEEE] flex">
        <p className=" p-[25px] border-border border-r  text-[17px] w-full">
          Планка
          <span className="font-bold ml-2">
            {new Intl.NumberFormat("ru-RU")
              .format(
                flatData.reduce(
                  (acc, curr) => acc + Number(curr.plan_price || 0),
                  0
                )
              )
              .replace(/,/g, " ")}
            $
          </span>
        </p>
        <p className=" p-[25px] border-border border-r  text-[17px] w-full">
          Сделанный
          <span className="font-bold ml-2">
            {new Intl.NumberFormat("ru-RU")
              .format(
                flatData.reduce((acc, curr) => acc + Number(curr?.earn || 0), 0)
              )
              .replace(/,/g, " ")}
            $
          </span>
        </p>
      </div>
      <div className="px-5 bg-card flex flex-col gap-4 py-4">
        {flatData?.map((item) => (
          <div
            key={item.filialId}
            className="flex flex-col gap-2 border-b border-border pb-4 last:border-0"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-xl">{item.filialTitle}</h3>
              </div>
              <div className="flex gap-4 items-center">
                <EditablePriceInput item={item} year={year || 2026} />

                <div className="border rounded-md px-3 py-2 w-[200px] bg-white text-gray-700 h-[45px] flex items-center">
                  <span className="font-bold text-[#89A143] text-lg">
                    {new Intl.NumberFormat("ru-RU")
                      .format(Number(item.earn || 0))
                      .replace(/,/g, " ")}
                    $
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
