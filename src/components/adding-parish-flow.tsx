import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { BriefcaseBusiness, Receipt, Shield, Store } from "lucide-react";
import { useState } from "react";
import { JSX } from "react";
import { toast } from "sonner";

import { AddData, getAllData } from "@/service/apiHelpers";
import { apiRoutes } from "@/service/apiRoutes";
import { useMeStore } from "@/store/me-store";

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { Textarea } from "./ui/textarea";
export interface CategoryProps {
  title: string;
  icons?: () => JSX.Element;
  isSelected: boolean;
  onClick: () => void;
  type: string;
}
export type CashflowType = {
  id: string;
  title: string;
  slug: string;
  type: "in" | "out" | "both";
  icon: string;
  is_visible: boolean;
  positions?: any[]; // Based on the API response showing an empty array
};

// Clickable category component
const CardSelect = ({
  title,
  icons,
  isSelected,
  onClick,
  type,
}: CategoryProps) => {
  return (
    <div
      className={`w-[calc(50%-2px)] h-20 bg-input flex items-center justify-center flex-col rounded-[7px] text-center cursor-pointer ${isSelected && type === "parish" ? "ring-2 ring-[#89A143]" : isSelected && type === "flow" ? "ring-2 ring-[#E38157]" : ""}`}
      onClick={onClick}
    >
      {icons ? icons() : ""}
      <p className="text-primary text-[13px] font-medium mt-2.5">{title}</p>
    </div>
  );
};

export default function AddingParishOrFlow({ kassaId }: { kassaId: string }) {
  const { meUser } = useMeStore();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<string>("parish");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  // Fetch cashflow types
  const { data: cashflowTypesResponse, isLoading: typesLoading } = useQuery({
    queryKey: ["/cashflow-types/for/cashier"],
    queryFn: () => getAllData("/cashflow-types/for/cashier"),
  });

  // Create mutation for adding cashflow
  const { mutate: addCashflow, isPending } = useMutation({
    mutationFn: (data: any) => AddData(apiRoutes.cashflow, data),
    onSuccess: () => {
      toast.success(
        type === "parish"
          ? "Приход успешно добавлен"
          : "Расход успешно добавлен"
      );
      queryClient.invalidateQueries({ queryKey: [apiRoutes.openKassa] });
      queryClient.invalidateQueries({ queryKey: [apiRoutes.cashflow] });
      setIsOpen(false);
    },
  });

  const openDialog = (flowType: string) => {
    setType(flowType);
    setIsOpen(true);
    // Reset form
    setSelectedCategory("");
    setAmount("");
    setComment("");
  };

  // Prepare categories data with cashflow type IDs
  const getCategories = () => {
    // Filter cashflow types based on current operation type (parish = "Приход", flow = "Расход")
    const operationType = type === "parish" ? "in" : "out";
    return  (cashflowTypesResponse as unknown as  CashflowType[])?.filter((ct) => ct.type === operationType || ct.type === "both")
      ?.map((ct) => ({
        id: ct.id,
        title: ct.title,
        icon: () => {
          if (!ct.icon) {
            try {
              if (ct.title.toLowerCase().includes("инкасат")) return <Shield />;
              if (ct.title.toLowerCase().includes("аренд")) return <Store />;
              if (
                ct.title.toLowerCase().includes("долг") ||
                ct.title.toLowerCase().includes("аванс")
              )
                return <Receipt />;
              if (ct.title.includes("Босс")) return <BriefcaseBusiness />;

              return <Receipt />;
            } catch (e) {
              // Fallback icon
              return <Receipt />;
            }
          }
          return <Receipt />;
        },
      }));
  };


  const categories = getCategories();

  const handleSubmit = () => {
    if (!selectedCategory) {
      toast.error("Выберите категорию");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Введите корректную сумму");
      return;
    }

    if (!meUser?.id) {
      toast.error("Пользователь не авторизован");
      return;
    }

    // Prepare data for API call
    const cashflowData = {
      price: parseFloat(amount),
      type: type === "parish" ? "Приход" : "Расход",
      comment: comment,
      title:
        type === "parish"
          ? categories.find((c) => c.id === selectedCategory)?.title
          : categories.find((c) => c.id === selectedCategory)?.title,
      casher: meUser.id,
      kassa: kassaId,
      cashflow_type: selectedCategory,
      tip: "cashflow",
      // filial: meUser.filial.id,
    };
    // Send to API
    addCashflow(cashflowData);
  };

  return (
    <Dialog open={isOpen}  onOpenChange={setIsOpen}>
      <div>
        <DialogTrigger asChild>
          <Button
            onClick={() => openDialog("parish")}
            className="py-8 h-full ml-auto text-[22px] px-11 bg-[#89A143] text-white"
          >
            Приход
          </Button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button
            onClick={() => openDialog("flow")}
            className="py-8 h-full text-[22px] px-12 bg-[#E38157] text-white"
          >
            Расход
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="costomModal min-w-[494px] p-1 rounded-[10px]">
        <div
          className={`p-1 h-[30px] pb-0 text-center mx-auto rounded-t-[7px] w-1/2 -mt-[35px]  ${type == "parish" ? "bg-[#89A143]" : "bg-[#E38157]"} text-white`}
        >
          {type === "parish" ? "Добавление прихода" : "Добавление расхода"}
        </div>

        <div className="flex gap-1">
          <div className="flex w-full max-w-[210px] flex-wrap gap-0.5">
            {typesLoading ? (
              <div className="w-full flex justify-center items-center h-[181px]">
                <Spinner /> {/* Assuming you have a spinner component */}
              </div>
            ) : (
              categories.map((category) => (
                <CardSelect
                  key={category.id}
                  title={category.title}
                  icons={category.icon}
                  isSelected={selectedCategory === category.id}
                  type={type}
                  onClick={() => setSelectedCategory(category.id)}
                />
              ))
            )}
          </div>

          <div className="w-full">
            <div className="flex pl-2 items-center bg-input rounded-[7px] h-[90px]">
              <Input
                placeholder="0.00"
                value={amount}
                type="number"
                min={0}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border-none h-[90px] placeholder:text-[32px] !text-[32px] font-semibold rounded-[7px] bg-transparent px-0"
              />
              <div className="text-4xl text-[#5D5D53] mx-4">$</div>
            </div>

            <Textarea
              placeholder="Комментария"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border-none focus:border-none outline-none mt-0.5 h-[90px] text-[13px] bg-input font-semibold rounded-[7px] px-2 py-2.5"
            />
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isPending || !selectedCategory || !amount}
          className={`p-5 rounded-[7px] ${type == "parish" ? "bg-[#89A143]" : "bg-[#E38157]"} text-white ${isPending ? " cursor-not-allowed" : ""}`}
        >
          {isPending ? (
            <span className="flex items-center">
              <span className="mr-2">
                {type == "parish"
                  ? "Добавляем в приход..."
                  : "Добавляем в расход..."}
              </span>
              <Spinner className="h-4 w-4" />
            </span>
          ) : (
            `Добавить в ${type == "parish" ? "приход" : "расход"}`
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
