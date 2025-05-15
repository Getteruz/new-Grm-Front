import { Banknote, DollarSign, Plus } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";

import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ShadcnSelect from "@/components/Select";

export default function CardSort() {

  const [sorttype, setSortType] = useQueryState("sorttype", parseAsString);
  const [type, setType] = useState<string>("Приход");
  const [typePay, setTypePay] = useState<string>("cash");
  const  isReportLoading=false;

  const columns = [
    {
      title: "Отправлено",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(0)
      ),
    },
    {
      title: "Итого задолжность",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice( 0)
      ),
    },
   
    {
      title: "Навар",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice( 0)
      ),
    },
    {
      title: "Обратно",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(Number(0))
      ),
    },
    {
      title: "Получено",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice(0)
      ),
      button:
      <div
      onClick={() => setType("Приход")}
      className="bg-[#F0F0E5] p-4 rounded-4xl"
      >
        <Plus size={20} color="#5d5d53" className="opacity-100" />
      </div>
    },
    {
      title: "Расход",
      price: isReportLoading ? (
        <Skeleton className="h-5 w-12" />
      ) : (
        formatPrice( 0)
      ),
      button:
        <div
        onClick={() => setType("Расход")}
          className="bg-[#F0F0E5] p-4 rounded-4xl"
        >
          <Plus size={20} color="#5d5d53" className="opacity-100" />
        </div>
    },
   
  ];

  function formatPrice(price: number): string {
    return Number(price).toFixed(2);
  }

  return (
    < Dialog>
      <div className=" flex bg-sidebar ">
          <div className="bg-sidebar p-5 pl-7 w-full border-border border-r max-w-[399px]">
            <div className="flex items-center">
              <DollarSign size={54} />
              <div>
                <p className="text-[12px] ">Итого задолжность</p>
                {false ? (
                  <Skeleton className="h-7 w-24 mt-1" />
                ) : (
                  <p className="text-[25px] font-bold text-foreground">
                   0
                  </p>
                )}
              </div>
            </div>
            <p className="text-[12px] mt-[15px] mb-1 text-[#5D5D53]">
             Объём долга:
            </p>
            <p className="text-[14px] font-semibold">0 м²</p>
          </div>
          <div className="grid row-start w-full  grid-cols-4  ">
            {columns?.map((e) => (
              <div
                key={e.title}
                onClick={() => setSortType(e.title)}
                className={`${sorttype == e.title ? "bg-primary   text-background" : "bg-sidebar  text-primary"} ${e.button ? "":"border-b"} h-[78px] border-border border-r  flex justify-between items-center cursor-pointer px-4 py-5`}
              >
                <div className="">
                  <p className="text-[12px] mb-0.5 flex  items">{e.title}</p>
                <p className="text-[15px]  font-medium">{e.price}</p>
                 
                </div>
                { "button" in e && (
                      <DialogTrigger
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        {e.button as React.ReactNode}
                      </DialogTrigger>
                    )}
              
              </div>
            ))}
          </div>
        </div>


        <DialogContent  className="costomModal border-0 gap-[0px] min-w-[494px] p-1 rounded-[10px]">
        <div
          className={`p-3 h-[44px] font-bold pb-0 text-center mx-auto rounded-t-[7px] w-1/2 -mt-[48px]  ${type === "Приход" ? "bg-[#89A143]" : "bg-[#E38157]"} text-white`}
        >
          {type === "Приход" ? "Добавление прихода" : "Добавление расхода"}
         </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="w-full">
              <div className="flex pl-2 items-center bg-input rounded-[7px] h-[90px]">
                <Input
                  placeholder="0.00"
                  // value={amount}
                  type="number"
                  min={0}
                  // onChange={(e) => setAmount(e.target.value)}
                  className="w-full border-none h-[90px] placeholder:text-[32px] !text-[32px] font-semibold rounded-[7px] bg-transparent px-0"
                />
                <div className="text-4xl text-[#5D5D53] mx-4">$</div>
              </div>
                <div className="text-center mt-1 w-full bg-input p-1  rounded-[7px]" >
                    <div className="flex items-center justify-center mt-[18px] mb-2">
                    <Banknote/>
                    </div>
                    <div className="flex relative rounded-[5px] p-0.5 items-center bg-primary">

                      <div  className={`${typePay == "cash" ? " left-0.5 ":"left-[120px] "} transition-all duration-300 ease-in-out w-[118px] absolute rounded-[3px] top-0.5 h-[31px] bg-input`}>

                      </div>
                        <p onClick={()=>setTypePay("cash")} className={`${typePay == "cash" ? "text-primary":"text-input "} text-[13px] p-[6px]  transition-all duration-300 ease-in-out z-10 w-full text-center rounded-[3px]  font-medium`}>Наличий</p> 
                        <p onClick={()=>setTypePay("online")} className={`${typePay == "online" ? "text-primary ":"text-input "} text-[13px] p-[6px] transition-all duration-300 ease-in-out  z-10   w-full text-center rounded-[3px]  font-medium`}>Онлайн</p> 
                    </div>
                </div>
            </div>
          <div className="w-full">

            <ShadcnSelect
                options={ []}
                placeholder={"Укажите дилера"}
                onChange={(e) => console.log(e)}
                className="w-full text-[#5D5D53] border-none h-[90px] !bg-input !text-[22px] font-semibold rounded-[7px] px-[17px] py-[26px]"
              />

            <Textarea
              placeholder="Комментария"
              // value={comment}
              // onChange={(e) => setComment(e.target.value)}
              className="w-full border-none focus:border-none outline-none mt-0.5 h-[90px] text-[13px] bg-input font-semibold rounded-[7px] px-2 py-2.5"
            />
          </div>
          </div>
          <Button
            // onClick={handleSubmit}
            // disabled={isSubmitting}
            type="submit"
            className={`p-5 mt-[6px]   rounded-[7px] h-[50px] ${type === "Приход" ? "bg-[#89A143] hover:bg-[#799132]" : "bg-[#E38157] hover:bg-[#D27047]"} text-white ${false ? "opacity-70" : ""}`}
          >
            {false
              ? "Добавление..."
              : `Добавить в ${type === "Приход" ? "приход" : "расход"}`}
          </Button>
        </DialogContent>
      </Dialog>
  );
}
