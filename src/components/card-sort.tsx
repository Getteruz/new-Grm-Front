import { BadgeCheck, ChevronDown, DollarSign, Plus } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useState } from "react";

import useDataFetch from "@/pages/filial/table/queries";
import {
  useDataCashflowTypes,
  useOpenKassa,
} from "@/pages/report/table/queries";
import { apiRoutes } from "@/service/apiRoutes";
import api from "@/service/fetchInstance";
import { useMeStore } from "@/store/me-store";

import ShadcnSelect from "./Select";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function CardSort() {
  const { meUser } = useMeStore();

  const [sorttype, setSortType] = useQueryState("sorttype", parseAsString);
  const [type, setType] = useState<string>("Приход");
  const [cashflow_type, setCashflow_type] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [filial, setFilial] = useState<string>("");
  const { data } = useDataFetch({});
  const { data: kassaId } = useOpenKassa({ id: filial });
  const { data: types } = useDataCashflowTypes({});

  const columns = [
    { title: "Продажа", price: "120" },
    { title: "Терминал", price: "120" },
    {
      title: "Инкассация",
      price: "120",
      button: (
        <div
          onClick={() => {
            setType("Приход");
          }}
          className="bg-[#F0F0E5] p-2.5 rounded-4xl"
        >
          <Plus size={13} color="#5D5D5390" />
        </div>
      ),
    },
    { title: "Навар", price: "120" },
    { title: "Скидка", price: "120" },
    {
      title: "Приход",
      price: "120",
      button: (
        <div
          onClick={() => {
            setType("Приход");
          }}
          className="bg-[#F0F0E5] p-2.5 rounded-4xl"
        >
          <Plus size={13} color="#5D5D5390" />
        </div>
      ),
    },
    {
      title: "Расход",
      price: "120",
      button: (
        <div
          onClick={() => {
            setType("Расход");
          }}
          className="bg-[#F0F0E5] p-2.5 rounded-4xl"
        >
          <Plus size={13} color="#5D5D5390" />
        </div>
      ),
    },
  ];

  const handleSubmit = async () => {
    const body = {
      cashflow_type,
      type,
      tip: "cashflow",
      comment,
      price,
      casher: meUser?.id,
      kassa: kassaId?.id || meUser?.position.id,
    };
    await api.post(apiRoutes.cashflow, body);
  };
  return (
    <>
      <Dialog>
        <div className="p-4 flex gap-1">
          <div className="bg-sidebar p-5 w-full max-w-[399px]">
            <div className="flex items-center">
              <DollarSign size={54} />
              <div>
                <p className="text-[12px] ">Итого</p>
                <p className="text-[25px] font-bold text-foreground">890.00</p>
              </div>
            </div>
            <p className="text-[12px] mt-[25px] mb-1 text-[#7E7E72]">
              Выбранные кол-во кассы:
            </p>
            <p className="text-[14px]  font-semibold">1 шт</p>
          </div>
          <div className="grid row-start  w-full  gap-1  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
            {columns?.map((e) => (
              <div
                key={e.title}
                onClick={() => setSortType(e.title)}
                className={`${sorttype == e.title ? "bg-primary text-background" : "bg-sidebar rounded-[3px] text-[#7E7E72]"}  cursor-pointer px-4 py-5`}
              >
                <div className="flex justify-between items-center">
                  <p className="text-[12px]  mb-0.5  flex items  ">
                    {e.title} <ChevronDown size={18} className="ml-3" />
                  </p>
                  {meUser?.position.role !== 6 && e.button && (
                    <DialogTrigger onClick={(e) => e.stopPropagation()}>
                      {e.button}
                    </DialogTrigger>
                  )}
                </div>
                <p className="text-[15px]  font-medium"> {e.price}</p>
              </div>
            ))}
          </div>
        </div>

        <DialogContent className="sm:max-w-[640px] p-1">
          <div className="grid grid-cols-2 gap-1">
            <div className=" w-full  max-h-[90px] grid grid-cols-3  gap-0.5 ">
              {types?.items.map((i) => (
                <div
                  key={i.id}
                  onClick={() => setCashflow_type(i.id)}
                  className={`${cashflow_type === i.id ? "bg-[#5D5D53] text-[white]" : "bg-input text-primary"}  flex items-center justify-center flex-col pt-4 rounded-[7px] text-center cursor-pointer`}
                >
                  {i.icon ? (
                    <div dangerouslySetInnerHTML={{ __html: i.icon }} />
                  ) : (
                    <BadgeCheck />
                  )}
                  <p className=" text-[13px] font-medium  my-2.5">{i.title}</p>
                </div>
              ))}
            </div>
            <div className=" w-full">
              <ShadcnSelect
                value={filial}
                options={
                  data?.pages[0].items.map((i) => ({
                    value: i.id,
                    label: i.title,
                  })) || []
                }
                placeholder={"Организации"}
                onChange={(value) => {
                  setFilial(value || "");
                }}
                className="w-full text-[#5D5D53] border-none h-[90px] !bg-input   !text-[22px] font-semibold rounded-[7px] px-[17px] py-[26px]"
              />

              <Input
                // value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                type="number"
                placeholder="0.00"
                className="w-full border-none h-[90px]  placeholder:text-[32px] mt-0.5 !text-[32px] font-semibold rounded-[7px] px-[17px] py-[26px]"
              />
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Комментария"
                className="w-full border-none focus:border-none outline-none mt-0.5 h-[90px] text-[13px] bg-input  font-semibold rounded-[7px] px-2 py-2.5"
              />
            </div>
          </div>
          <Button
            onClick={() => handleSubmit()}
            className={`p-5 rounded-[7px] ${type == "Приход" ? "bg-[#89A143]" : "bg-[#E38157]"}  text-white`}
          >
            Добавить в {type == "Приход" ? "приход" : "расход"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
