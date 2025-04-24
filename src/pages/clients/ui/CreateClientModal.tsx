import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CreateClientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateClientModal({
  isOpen,
  onClose,
}: CreateClientModalProps) {
  const queryClient = useQueryClient();
  
  // Form state based on the provided JSON schema
  const [formData, setFormData] = useState({
    name: "",
    secondName: "",
    comment: "",
    filial: "",
    phone: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Create new client with the form data
    const newClient = {
      ...formData
    };
    
    // For now, log it (mock implementation)
    console.log("Creating new client:", newClient);
    
    // Here you would normally call an API to create the client
    // When ready, implement this with your API service
    
    // Invalidate queries to refresh data
    queryClient.invalidateQueries({ queryKey: ["clients"] });
    
    // Reset form and close modal
    setFormData({
      name: "",
      secondName: "",
      comment: "",
      filial: "",
      phone: ""
    });
    
    onClose();
  };

  // Mock filial options
  const filialOptions = [
    { value: "central", label: "Центральный" },
    { value: "east", label: "Восточный" },
    { value: "west", label: "Западный" },
    { value: "north", label: "Северный" },
    { value: "south", label: "Южный" }
  ];

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 bg-white">
        <DialogHeader className="p-4 border-b">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-medium">
              Создать нового клиента
            </DialogTitle>
            <DialogClose className="h-6 w-6 rounded-full hover:bg-gray-100">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>
        
        <div className="p-6">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                className="mt-1"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            
            {/* Second Name */}
            <div>
              <Label htmlFor="secondName">Фамилия</Label>
              <Input
                id="secondName"
                className="mt-1"
                value={formData.secondName}
                onChange={(e) => handleInputChange("secondName", e.target.value)}
              />
            </div>
            
            {/* Phone */}
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                className="mt-1"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+998901234567"
              />
            </div>
            
            {/* Filial */}
            <div>
              <Label htmlFor="filial">Филиал</Label>
              <Select
                value={formData.filial}
                onValueChange={(value) => handleInputChange("filial", value)}
              >
                <SelectTrigger id="filial" className="mt-1">
                  <SelectValue placeholder="Выберите филиал" />
                </SelectTrigger>
                <SelectContent>
                  {filialOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Comment */}
            <div>
              <Label htmlFor="comment">Комментарий</Label>
              <Textarea
                id="comment"
                className="mt-1"
                value={formData.comment}
                onChange={(e) => handleInputChange("comment", e.target.value)}
                placeholder="Дополнительная информация о клиенте..."
                rows={4}
              />
            </div>
          </div>
        </div>
        
        {/* Footer with buttons */}
        <div className="flex border-t">
          <Button
            className="flex-1 rounded-none h-12 bg-gray-700 hover:bg-gray-800"
            onClick={handleSubmit}
          >
            Создать
          </Button>
          <Button
            className="flex-1 rounded-none h-12 bg-white text-black hover:bg-gray-100 border-l"
            variant="outline"
            onClick={onClose}
          >
            Отменить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}