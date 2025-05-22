import { ColumnDef } from "@tanstack/react-table";
import { Gem, Gift, IdCardIcon, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Statement } from "../type";
import { DeleteData, getAllData } from "@/service/apiHelpers";
import FormSwitch from "@/components/forms/FormSwitch";

export const StatementEmployeeColumns = (): ColumnDef<Statement>[] => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const form = useForm();

  const handleDelete = async (id: string) => {
    try {
      await DeleteData(`/payroll-items`, id);
      toast.success("Сотрудник удалён");
    } catch (error) {
      toast.error("Ошибка при удалении");
    }
  };

  type AwardsResponse = {
    items: {
      id: string;
      title: string;
      sum: number;
      createdAt: string;
      payroll_items: any[];
    }[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };

  type BonusResponse = {
    items: {
      id: string;
      title: string;
      condition: number;
      conditionUnit: string;
      operator: string;
      bonusAmount: number;
      bonusUnit: string;
      endDate: string;
      createdAt: string;
      payroll_items: any[];
    }[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };

  const { data: awardData, isLoading: isAwardLoading } = useQuery<AwardsResponse>({
    queryKey: ["awards"],
    queryFn: () => getAllData<AwardsResponse, any>("/awards", {}),
    refetchOnMount: false
  });

  const { data: bonusData, isLoading: isBonusLoading } = useQuery<BonusResponse>({
    queryKey: ["bonus"],
    queryFn: () => getAllData<BonusResponse, any>("/bonus", {}),
    refetchOnMount: false
  });

  const isBonusEnabled = form.watch("bonus");
  const isAwardEnabled = form.watch("award");

  return [
    {
      id: "employee",
      header: "Сотрудник",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <Avatar className="h-9 w-9 mr-2">
              <AvatarImage
                src={
                  row.original.user?.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd_XRGE9j0tQkvkYFKQU5MlZw86IXuV9TbfA&s"
                }
              />
              <AvatarFallback className="bg-primary text-white">
                {row.original.user?.firstName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="font-normal text-foreground tetx-[13px]">
              {row.original.user?.firstName} {` `}
              {row.original.user?.lastName}
            </div>
          </div>
        );
      },
      size: 200,
    },
    {
      header: "Филиал",
      accessorKey: "filial",
      cell: ({ row }) => {
        return (
          <div className="bg-[#F0F0E5] py-[12px] px-[16px] rounded-full inline-block text-[#5D5D53] text-[12px]">
            {row.original.user?.filial}
          </div>
        );
      },
    },
    {
      header: "Зарплата",
      accessorKey: "salary",
      cell: ({ row }) => {
        return (
          <span className="text-[#E38157] flex items-center">
            {" "}
            <IdCardIcon className="mr-1 text-[12px]" size={18} />{" "}
            {row.original.user?.salary} $
          </span>
        );
      },
    },
    {
      header: "Бонус",
      accessorKey: "bonus",
      cell: ({ row }) => {
        return row.original.payroll?.bonus ? (
          <span className="text-[#C3AD54] flex items-center">
            {" "}
            <Gem className="mr-1 text-[12px]" size={18} /> +{row.original.payroll?.bonus} $
          </span>
        ) : (
          <span>—</span>
        );
      },
    },
    {
      header: "Премии",
      accessorKey: "premium",
      cell: ({ row }) => {
        return row.original.payroll?.award ? (
          <span className="text-[#94C3DC] flex items-center">
            <Gift className="mr-1 text-[12px]" size={18} /> +
            {row.original.payroll?.award} $
          </span>
        ) : (
          <span>—</span>
        );
      },
    },
    {
      header: "Аванс",
      accessorKey: "prepayment",
      cell: ({ row }) => {
        return row.original.payroll?.prepayment ? (
          <span className="text-[#E38157] flex items-center">
            {" "}
            <IdCardIcon className="mr-1 text-[12px]" size={18} />{" "}
            {row.original.payroll?.prepayment} $
          </span>
        ) : (
          <span>—</span>
        );
      },
    },
    {
      header: "Итого",
      accessorKey: "total",
      cell: ({ row }) => {
        return (
          <span className="font-medium text-[#5D5D53] text-[16px]">
            {row.original.payroll?.total} $
          </span>
        );
      },
    },
    {
      header: "Пластик",
      accessorKey: "plastic",
      cell: ({ row }) => {
        return (
          <span className="p-2 border bg-[#F0F0E5]">
            {row.original.payroll?.plastic} $
          </span>
        );
      },
    },
    {
      header: "Наличные",
      accessorKey: "cash",
      cell: ({ row }) => {
        return (
          <span className="p-2 border bg-[#EAEADE]">{row.original.payroll?.in_hand} $</span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditId(String(row.original.id))}>
                Изменить
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={e => {
                  e.stopPropagation();
                  setDeleteId(String(row.original.id));
                }}  
              >
                Удалить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {deleteId === String(row.original.id) && (
            <Dialog open={true} onOpenChange={() => setDeleteId(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Вы уверены?</DialogTitle>
                </DialogHeader>
                <div className="flex justify-end gap-4 pt-0 p-4">
                  <Button
                    variant="outline"
                    onClick={() => setDeleteId(null)}
                  >
                    Отмена
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await handleDelete(String(row.original.id));
                      setDeleteId(null);
                    }}
                  >
                    Удалить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}

          {editId === String(row.original.id) && (
            <Dialog open={true} onOpenChange={() => setEditId(null)}>
              <DialogContent className="gap-0">
                <DialogHeader className="p-4 border-b">
                  <div>
                    <DialogTitle className="text-lg font-medium">
                      Изменить данные о ведомости
                    </DialogTitle>
                  </div>
                </DialogHeader>

                <div className="w-full px-[30px] py-[15px] bg-[#f0f0e5]">
                  <div className="flex items-center gap-[10px] MB-[20PX]">
                    <div className="w-[50px] h-[50px] rounded-[50%] border-[#E6E6D9] border-[2px]">
                    </div>

                    <div className="flex flex-col gap-[4px]">
                      <span className="text-[13px] font-[500] text-[#5D5D53]">Аббос Жанизаков</span>
                      <p className='text-[13px] text-[#99998C]'>Итого: <span className="text-[#5D5D53]">4152 $</span></p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <label className="text-[#99998C] text-[13px] mb-1">Зарплата</label>
                      <input
                        type="text"
                        className="w-full bg-[#EAEADE] rounded-[2px] px-[12px] py-[11px] text-[14px] text-[#5D5D53] border-[#CBCBC1] border-[1px] font-medium outline-none"
                        defaultValue="400 $"
                      />
                    </div>
                    <div>
                      <label className="text-[#99998C] text-[13px] mb-1">Аванс</label>
                      <input
                        type="text"
                        className="w-full bg-[#EAEADE] rounded-[2px] px-[12px] py-[11px] text-[14px] text-[#5D5D53] border-[#CBCBC1] border-[1px] font-medium outline-none"
                        defaultValue="~ $"
                      />
                    </div>
                    <div>
                      <label className="text-[#99998C] text-[13px] mb-1">Пластик</label>
                      <input
                        type="text"
                        className="w-full bg-[#EAEADE] rounded-[2px] px-[12px] py-[11px] text-[14px] text-[#5D5D53] border-[#CBCBC1] border-[1px] font-medium outline-none"
                        defaultValue="471 $"
                      />
                    </div>
                    <div>
                      <label className="text-[#99998C] text-[13px] mb-1">Наличные</label>
                      <input
                        type="text"
                        className="w-full bg-[#EAEADE] rounded-[2px] px-[12px] py-[11px] text-[14px] text-[#5D5D53] border-[#CBCBC1] border-[1px] font-medium outline-none"
                        defaultValue="1000 $"
                      />
                    </div>
                  </div>

                  {/* Bonus ... */}
                
                  <div className="mt-8 flex flex-col gap-6">
                    <FormProvider {...form}>
                      <div className="flex items-center gap-6">
                        <div className="flex gap-[8px] items-end">
                          <FormSwitch name="bonus" label="Бонуса" className=""/>
                        </div>
                        <Select
                          onValueChange={(value) => {
                            const selectedBonus = bonusData?.items.find(bonus => bonus.id === value);
                            form.setValue("bonusId", value);
                            form.setValue("bonusAmount", selectedBonus?.bonusAmount || 0);
                          }}
                          value={form.watch("bonusId")}
                          disabled={isBonusLoading || !isBonusEnabled}
                        >
                          <SelectTrigger id="bonus" className="w-[300px] ml-auto bg-[#E6E6D9] border-[#CBCBC1]">
                            <SelectValue placeholder="Выбрать бонус" />
                          </SelectTrigger>
                          <SelectContent>
                            {isBonusLoading ? (
                              <div className="p-2 text-center text-gray-500">Загрузка...</div>
                            ) : bonusData?.items.length === 0 ? (
                              <div className="p-2 text-center text-gray-500">Нет доступных бонусов</div>
                            ) : (
                              bonusData?.items.map((bonus) => (
                                <SelectItem key={bonus.id} value={bonus.id}>
                                  <div className="flex items-center gap-2">
                                    <span>{bonus.title}</span>
                                    <span className="text-[#C3AD54]">
                                      {bonus.condition} {bonus.conditionUnit} {bonus.operator} = +{bonus.bonusAmount}{bonus.bonusUnit}
                                    </span>
                                  </div>
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex gap-[8px] items-end">
                          <FormSwitch name="award" label="Премии" className=""/>
                        </div>
                        <Select
                          onValueChange={(value) => {
                            const selectedAward = awardData?.items.find(award => award.id === value);
                            form.setValue("awardId", value);
                            form.setValue("awardSum", selectedAward?.sum || 0);
                          }}
                          value={form.watch("awardId")}
                          disabled={isAwardLoading || !isAwardEnabled}
                        >
                          <SelectTrigger id="award" className="w-[300px] ml-auto bg-[#E6E6D9] border-[#CBCBC1]">
                            <SelectValue placeholder="Выбрать бонус" />
                          </SelectTrigger>
                          <SelectContent>
                            {isAwardLoading ? (
                              <div className="p-2 text-center text-gray-500">Загрузка...</div>
                            ) : awardData?.items.length === 0 ? (
                              <div className="p-2 text-center text-gray-500">Нет доступных бонусов</div>
                            ) : (
                              awardData?.items.map((award) => (
                                <SelectItem key={award.id} value={award.id}>
                                  <div className="flex items-center gap-2">
                                    <span>{award.title}</span>
                                    <span className="text-[#C3AD54]">+{award.sum} $</span>
                                  </div>
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormProvider>
                  </div>
                </div>

                <DialogFooter className="flex gap-4 py-[9px] px-[30px] items-center justify-between bg-[#E6E6D9]">
                  <Button variant="default" className="rounded-[3px] px-[74px] py-[13px]">
                    Сохранить
                  </Button>
                  <Button variant="outline" onClick={() => setEditId(null)} className="rounded-[3px] bg-[#F0F0E5] px-[74px] py-[13px]">
                    Отмена
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </>
      ),
    },
  ];
};
