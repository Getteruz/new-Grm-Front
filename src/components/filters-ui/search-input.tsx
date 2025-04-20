import { Loader, Search } from "lucide-react";
import { Input } from "../ui/input";
import debounce from "@/utils/debounce";
import { useQueryState } from "nuqs";
import { useTranslation } from "react-i18next";

export default function SearchInput({ className }: { className?: string }) {
  const [search, setSearch] = useQueryState("search");
  const { t } = useTranslation();
  return (
    <div
      className={`${className && className} flex items-center px-2.5 gap-[15px]`}
    >
      <Search size={20} />
      <Input
        onChange={debounce((e) => {
          setSearch(e.target.value);
        }, 500)}
        value={search || ""}
        className="bg-transparent p-0  border-none"
        placeholder={t("search")}
      />
      <Loader size={16} />
    </div>
  );
}
