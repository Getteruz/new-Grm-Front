import { Plus,Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";

import { STATUS_OPTIONS } from "./constants";

interface SortOption {
  value: string;
  label: string;
}

interface FiltersProps {
  selectedItems: string[];
  clearSelection: () => void;
  sortOptions: SortOption[];
  onCreateClient: () => void;
}

export default function Filters({ 
  sortOptions,
  onCreateClient
}: FiltersProps) {
  const [search, setSearch] = useQueryState("search");
  const [sortBy, setSortBy] = useQueryState("sortBy", { defaultValue: "lastActivity" });
  const [status, setStatus] = useQueryState("status", { defaultValue: "all" });
  const [filial, setFilial] = useQueryState("filial", { defaultValue: "all" });
  const [searchInput, setSearchInput] = useState(search || "");

  // Filial options
  const filialOptions = [
    { value: "all", label: "Все филиалы" },
    { value: "central", label: "Центральный" },
    { value: "east", label: "Восточный" },
    { value: "west", label: "Западный" },
    { value: "north", label: "Северный" },
    { value: "south", label: "Южный" }
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const getSelectedStatusLabel = () => {
    const option = STATUS_OPTIONS.find(opt => opt.value === status);
    return option ? option.label : "Все";
  };

  // Get the currently selected filial label
  const getSelectedFilialLabel = () => {
    const option = filialOptions.find(opt => opt.value === filial);
    return option ? option.label : "Все филиалы";
  };

  // Count active filters
  const activeFiltersCount = 
    (status && status !== 'all' ? 1 : 0) + 
    (filial && filial !== 'all' ? 1 : 0);

  return (
    <div className="bg-[#E6E6D9] border-b px-4 py-3 flex items-center flex-wrap gap-3">
      {/* Search */}
      <form onSubmit={handleSearchSubmit} className="relative w-64">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Поиск по имени, телефону"
          value={searchInput}
          onChange={handleSearchChange}
          className="w-full pl-8 h-9"
        />
      </form>
      
      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">Фильтры:</span>
          {status && status !== 'all' && (
            <Badge variant="outline" className="gap-1 pl-1.5">
              Статус: {getSelectedStatusLabel()}
              <button 
                className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                onClick={() => setStatus("all")}
              >
                ×
              </button>
            </Badge>
          )}
          
          {filial && filial !== 'all' && (
            <Badge variant="outline" className="gap-1 pl-1.5">
              Филиал: {getSelectedFilialLabel()}
              <button 
                className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                onClick={() => setFilial("all")}
              >
                ×
              </button>
            </Badge>
          )}
          
          {activeFiltersCount > 1 && (
            <button 
              className="text-xs text-blue-600 hover:underline"
              onClick={() => {
                setStatus("all");
                setFilial("all");
              }}
            >
              Сбросить все
            </button>
          )}
        </div>
      )}
      
      {/* Sort */}
      <div className="flex items-center ml-auto">
        <span className="mr-2 text-sm">Сортировка:</span>
        <Select
          value={sortBy || "lastActivity"}
          onValueChange={handleSortChange}
        >
          <SelectTrigger className="w-48 h-9">
            <SelectValue placeholder="Последняя активность" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Create Client Button */}
      <Button
        className="h-9 ml-2"
        onClick={onCreateClient}
      >
        <Plus className="mr-1 h-4 w-4" />
        Новый клиент
      </Button>
    </div>
  );
}