import { Calendar } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { ProductCharacteristic } from "../type";
import { useUpdateCharacteristic } from "./queries";

interface EditCharacteristicModalProps {
  isOpen: boolean;
  onClose: () => void;
  characteristic: ProductCharacteristic | null;
}

export default function EditCharacteristicModal({
  isOpen,
  onClose,
  characteristic,
}: EditCharacteristicModalProps) {
  const { mutate: updateCharacteristic } = useUpdateCharacteristic();

  // Form state
  const [formData, setFormData] = useState({
    bonusName: "",
    period: "",
    characteristics: "",
    paymentDeliveryInfo: "",
    initialPayment: "Без оплаты",
    periodValue: "",
    periodUnit: "шт",
    bonusValue: "",
    bonusUnit: "%",
    endDate: "",
    isActive: false,
  });

  // Update form data when characteristic changes
  useEffect(() => {
    if (characteristic) {
      setFormData({
        bonusName: characteristic.collection || "fghsjakd",
        period: "",
        characteristics: characteristic.characteristics1 || "",
        paymentDeliveryInfo: characteristic.characteristics2 || "",
        initialPayment: "Без оплаты",
        periodValue: "",
        periodUnit: "шт",
        bonusValue: "",
        bonusUnit: "%",
        endDate: "12 янв 2025",
        isActive: false,
      });
    }
  }, [characteristic]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!characteristic) return;

    // Convert form data to API format
    const updatedData = {
      collection: formData.bonusName,
      characteristics1: formData.characteristics,
      characteristics2: formData.paymentDeliveryInfo,
      installmentParams: formData.periodValue
        ? `${formData.periodValue} ${formData.periodUnit === "шт" ? "месяц" : formData.periodUnit}`
        : "6 месяц",
    };

    updateCharacteristic({
      id: characteristic.id,
      data: updatedData,
    });

    onClose();
  };

  if (!isOpen || !characteristic) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 min-w-[796px]">
        <DialogHeader className="bg-[#E6E6D9] p-3 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-medium">
              Характеристика и параметры продуктов
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6">
          {/* Characteristics Section */}
          <div className="mb-8">
            <h3 className="text-base font-medium mb-4">Характеристика</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Название бонуса
                </label>
                <Input
                  type="text"
                  className="w-full border"
                  value={formData.bonusName}
                  onChange={(e) =>
                    handleInputChange("bonusName", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Период
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Характеистика
                </label>
                <Textarea
                  className="w-full border rounded-md p-2 bg-[#E6E6D9] h-24"
                  value={formData.characteristics}
                  onChange={(e) =>
                    handleInputChange("characteristics", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Об оплате и доставка
                </label>
                <Textarea
                  className="w-full border rounded-md p-2 bg-[#E6E6D9] h-24"
                  value={formData.characteristics}
                  onChange={(e) =>
                    handleInputChange("characteristics", e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Installment Parameters Section */}
          <div>
            <h3 className="text-base font-medium mb-4">Параметры рассрочки</h3>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Начальный оплата
                </label>
                <div className="relative">
                  <select
                    className="w-full p-2 pr-8 appearance-none bg-[#E6E6D9]"
                    value={formData.initialPayment}
                    onChange={(e) =>
                      handleInputChange("initialPayment", e.target.value)
                    }
                  >
                    <option value="Без оплаты">Без оплаты</option>
                    <option value="10%">10%</option>
                    <option value="20%">20%</option>
                    <option value="30%">30%</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Период
                </label>
                <div className="flex">
                  <Input
                    type="text"
                    className="flex-1 bg-[#E6E6D9] p-2"
                    placeholder="Введите число"
                    value={formData.periodValue}
                    onChange={(e) =>
                      handleInputChange("periodValue", e.target.value)
                    }
                  />
                  <div className="relative">
                    <select
                      className="border border-l-0 rounded-r-md p-2 pr-8 appearance-none bg-white"
                      value={formData.periodUnit}
                      onChange={(e) =>
                        handleInputChange("periodUnit", e.target.value)
                      }
                    >
                      <option value="шт">шт</option>
                      <option value="мес">мес</option>
                      <option value="год">год</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Условия
                </label>
                <div className="flex">
                  <Input
                    type="text"
                    className="flex-1 border rounded-l-md p-2"
                    placeholder="Число бонуса"
                    value={formData.bonusValue}
                    onChange={(e) =>
                      handleInputChange("bonusValue", e.target.value)
                    }
                  />
                  <div className="relative">
                    <select
                      className="border border-l-0 rounded-r-md p-2 pr-8 appearance-none bg-[#E6E6D9]"
                      value={formData.bonusUnit}
                      onChange={(e) =>
                        handleInputChange("bonusUnit", e.target.value)
                      }
                    >
                      <option value="%">%</option>
                      <option value="₽">₽</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg
                        className="h-4 w-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Дата окончание бонуса
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full border rounded-md p-2 pl-9"
                    value={formData.endDate}
                    onChange={(e) =>
                      handleInputChange("endDate", e.target.value)
                    }
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500 block mb-1">
                  Статус рассрочки
                </label>
                <div className="flex items-center pt-2">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      handleInputChange("isActive", checked)
                    }
                  />
                  <span className="ml-2 text-sm">
                    {formData.isActive ? "Включён" : "Отключён"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with buttons */}
        <div className="flex border-t">
          <button
            className="flex-1 bg-gray-700 text-white py-3 px-4 text-center"
            onClick={handleSubmit}
          >
            Сохранить
          </button>
          <button
            className="flex-1 bg-white py-3 px-4 text-center border-l"
            onClick={onClose}
          >
            Отменить
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
