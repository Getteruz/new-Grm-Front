import { useState } from "react";
import { Shield } from "lucide-react";
import { Store } from "lucide-react";
import { Receipt } from "lucide-react";
import { BriefcaseBusiness } from "lucide-react";
import { JSX } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface CategoryProps {
  title: string;
  icons?: () => JSX.Element;
  isSelected: boolean;
  onClick: () => void;
  type: string;
}

// Clickable category component
const CardSelect = ({ title, icons, isSelected, onClick, type }: CategoryProps) => {
  return (
    <div 
      className={`w-[calc(50%-2px)] bg-input flex items-center justify-center flex-col rounded-[7px] text-center cursor-pointer ${isSelected && type === "parish" ? 'ring-2 ring-[#89A143]' : isSelected && type === "flow" ? "ring-2 ring-[#E38157]" : ''}`}
      onClick={onClick}
    >
      {icons ? icons() : ""}
      <p className="text-primary text-[13px] font-medium mt-2.5">{title}</p>
    </div>
  );
};

export default function AddingParishOrFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<string>("parish");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const openDialog = (flowType: string) => {
    setType(flowType);
    setIsOpen(true);
    // Reset form
    setSelectedCategory("");
    setAmount("");
    setComment("");
  };

  // Categories data
  const categories = [
    { id: "inkasatsiya", title: "Инкасатсия", icon: () => <Shield /> },
    { id: "arenda", title: "Аренда", icon: () => <Store /> },
    { id: "debt", title: "Долг/Аванс", icon: () => <Receipt /> },
    { id: "boss", title: "Бос", icon: () => <BriefcaseBusiness /> }
  ];

  const handleSubmit = () => {
    console.log({
      type,
      selectedCategory,
      amount,
      comment
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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


      <DialogContent className="min-w-[494px] p-1">
        
        <div className={`p-2 rounded-[7px] text-center ${type == "parish" ? "bg-[#89A143]" : "bg-[#E38157]"} text-white`}>
          {type === "parish" ? "Добавление прихода" : "Добавление расхода"}
        </div>

        
        <div className="flex gap-1">
          <div className="flex w-full max-w-[210px] flex-wrap gap-0.5">
            {categories.map((category) => (
              <CardSelect 
                key={category.id}
                title={category.title} 
                icons={category.icon} 
                isSelected={selectedCategory === category.id}
                type={type}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
          
          <div className="w-full">
            <div className="flex pl-2 items-center bg-input rounded-[7px] h-[90px]">
              <Input
                placeholder="0.00"
                value={amount}
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border-none h-[90px]  placeholder:text-[32px] !text-[32px] font-semibold rounded-[7px] bg-transparent px-0"
              />
              <div className="text-4xl text-gray-400 mx-4">$</div>
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
          className={`p-5 rounded-[7px] ${type == "parish" ? "bg-[#89A143]" : "bg-[#E38157]"} text-white`}
        >
          Добавить в {type == "parish" ? "приход" : "расход"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}