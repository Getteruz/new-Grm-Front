import { useQueryClient } from "@tanstack/react-query";
import { DollarSign, Plus } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

import ShadcnSelect from "@/components/Select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import useDataFetch from "@/pages/filial/table/queries";
import {
  useDataCashflowTypes,
  useKassaById,
} from "@/pages/report/table/queries";
import { apiRoutes } from "@/service/apiRoutes";
import api from "@/service/fetchInstance";
import { useMeStore } from "@/store/me-store";

export default function CardSort({KassaId}:{KassaId:string}) {
  const { meUser } = useMeStore();
  const queryClient = useQueryClient();
  const location = useLocation();

  // Fetch kassa report data

  // State variables for form
  const [sorttype, setSortType] = useQueryState("sorttype", parseAsString);
  const [type, setType] = useState<string>("Приход");
  const [cashflow_type, setCashflow_type] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [filial, setFilial] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Fetch necessary data
  const { data: filialData } = useDataFetch({});
  const { data: kassaId, isLoading: isReportLoading } = useKassaById({
    id:KassaId,
  });
  const { data: types } = useDataCashflowTypes({
    queries: { limit: 20, page: 1, search: "" },
  });

  // Prepare column data using report data
  const columns = [
    {
      title: "Продажа",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(kassaId?.sale || 0)
      ),
    },
    {
      title: "Терминал",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(kassaId?.plasticSum || 0)
      ),
    },
    {
      title: "Инкассация",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(kassaId?.cash_collection || 0)
      ),
      button:
        meUser?.position.role === 3 ? (
          ""
        ) : (
          <div
            onClick={() => {
              setType("Приход");
              setDialogOpen(true);
            }}
            className="bg-[#F0F0E5] p-2.5 rounded-4xl"
          >
            <Plus size={13} color="#5D5D5390" />
          </div>
        ),
    },
    {
      title: "Навар",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(kassaId?.additionalProfitTotalSum || 0)
      ),
    },
    {
      title: "Скидка",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(Number(kassaId?.discount) || 0)
      ),
    },
    {
      title: "Приход",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(kassaId?.income || 0)
      ),
      button:
        meUser?.position.role === 3 ? (
          ""
        ) : (
          <div
            onClick={() => {
              setType("Приход");
              setDialogOpen(true);
            }}
            className="bg-[#F0F0E5] p-2.5 rounded-4xl"
          >
            <Plus size={13} color="#5D5D5390" />
          </div>
        ),
    },
    {
      title: "Расход",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        `-${formatPrice(kassaId?.expense || 0)}`
      ),
      button:
        meUser?.position.role === 3 ? (
          ""
        ) : (
          <div
            onClick={() => {
              setType("Расход");
              setDialogOpen(true);
            }}
            className="bg-[#F0F0E5] p-2.5 rounded-4xl"
          >
            <Plus size={13} color="#5D5D5390" />
          </div>
        ),
    },
    {
      title: "",
      price: '',
     
    },
  ];

  const hrColumns = [
    {
      title: "Пластик",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(kassaId?.income || 0)
      ),
    },
    {
      title: "Наличному",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(kassaId?.income || 0)
      ),
    },
    {
      title: "Бонус",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(kassaId?.income || 0)
      ),
    },
    {
      title: "Аванс",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(kassaId?.income || 0)
      ),
    },
    {
      title: "Премя",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(kassaId?.income || 0)
      ),
    },
  ];

  // Helper function to format price
  function formatPrice(price: number): string {
    return Number(price).toFixed(2);
  }

  const handleSubmit = async () => {
    try {
      if (!cashflow_type) {
        toast.error("Выберите тип операции");
        return;
      }

      if (!price || price <= 0) {
        toast.error("Введите корректную сумму");
        return;
      }

      setIsSubmitting(true);

      const body = {
        cashflow_type,
        type,
        tip: "cashflow",
        comment,
        price,
        casher: meUser?.id,
        kassa: kassaId?.id || meUser?.position?.id,
      };

      await api.post(apiRoutes.cashflow, body);

      toast.success(`${type} успешно добавлен`);

      // Reset form fields
      setCashflow_type("");
      setComment("");
      setPrice(0);

      // Close dialog
      setDialogOpen(false);

      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["kassa-report"] });
    } catch (error) {
      toast.error(String(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const column = meUser?.position.role === 11 ? hrColumns : columns;

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="flex ">
          <div className="bg-sidebar/20 p-5 w-full border border-t border-r max-w-[399px]">
            <div className="flex items-center">
              <DollarSign size={54} />
              <div>
                <p className="text-[12px] ">Итого</p>
                {isReportLoading ? (
                  <Skeleton className="h-7 w-24 mt-1" />
                ) : (
                  <p className="text-[25px] font-bold text-foreground">
                    {formatPrice(kassaId?.totalSum || 0)}
                  </p>
                )}
              </div>
            </div>
            <p className="text-[12px] mt-[25px] mb-1 text-[#7E7E72]">
              Выбранные кол-во кассы:
            </p>
            <p className="text-[14px] font-semibold">1 шт</p>
          </div>
          <div className="grid row-start w-full  border-border  border-b grid-cols-4  ">
            {column?.map((e) => (
              <div
                key={e.title}
                onClick={() => setSortType(e.title)}
                className={`${sorttype == e.title ? "bg-primary text-background" : "bg-sidebar/20  text-primary"} border-t border-r border-border cursor-pointer px-4 py-5`}
              >
                <div className="flex justify-between items-center">
                  <p className="text-[12px] mb-0.5 flex items">{e.title}</p>
                  {meUser?.position?.role !== 6 &&
                    (meUser?.position?.role !== 10 ||
                      location.pathname === "/report-finance") &&
                    "button" in e && (
                      <DialogTrigger
                        onClick={(event) => {
                          event.stopPropagation();
                          setType(e.title === "Расход" ? "Расход" : "Приход");
                        }}
                      >
                        {e.button as React.ReactNode}
                      </DialogTrigger>
                    )}
                </div>
                <p className="text-[15px] font-medium">{e.price}</p>
              </div>
            ))}
          </div>
        </div>

        <DialogContent className="sm:max-w-[640px] p-1">
          <div className="grid grid-cols-2 gap-1">
            <div className="w-full  grid grid-cols-3 gap-0.5">
              {types?.items
                ?.filter((i) => i?.is_visible)
                ?.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setCashflow_type(item.id)}
                    className={`${cashflow_type === item.id ? "bg-[#5D5D53] text-[white]" : "bg-input text-primary"} flex items-center justify-center flex-col pt-4 rounded-[7px] text-center cursor-pointer`}
                  >
                    <img
                      src={`/images/icons/${item.id === "46f17d71-cc7e-4af8-99f7-097c88562cb4" ? "bank" : item?.title}.svg`}
                      style={{
                        filter:
                          cashflow_type === item.id
                            ? "invert(1) brightness(2)"
                            : "",
                      }}
                    />

                    <p className="text-[13px] font-medium my-2.5">
                      {item.title}
                    </p>
                  </div>
                ))}
            </div>
            <div className="w-full">
              <ShadcnSelect
                value={filial}
                options={
                  filialData?.pages[0]?.items?.map((item) => ({
                    value: item.id,
                    label: item.title,
                  })) || []
                }
                placeholder={"Организации"}
                onChange={(value) => {
                  setFilial(value || "");
                }}
                className="w-full text-[#5D5D53] border-none h-[90px] !bg-input !text-[22px] font-semibold rounded-[7px] px-[17px] py-[26px]"
              />

              <Input
                value={price || ""}
                onChange={(e) => setPrice(Number(e.target.value))}
                type="number"
                placeholder="0.00"
                className="w-full border-none h-[90px] placeholder:text-[32px] mt-0.5 !text-[32px] font-semibold rounded-[7px] px-[17px] py-[26px]"
              />
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Комментария"
                className="w-full border-none focus:border-none outline-none mt-0.5 h-[90px] text-[13px] bg-input font-semibold rounded-[7px] px-2 py-2.5"
              />
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`p-5 rounded-[7px] ${type === "Приход" ? "bg-[#89A143]" : "bg-[#E38157]"} text-white ${isSubmitting ? "opacity-70" : ""}`}
          >
            {isSubmitting
              ? "Добавление..."
              : `Добавить в ${type === "Приход" ? "приход" : "расход"}`}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
