import type { ChangeEvent } from "react";
import { search } from "@/assets";
import { useTranslation } from "react-i18next";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
};

export default function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  const { t } = useTranslation("common");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="searchbar">
      <img src={search} alt="Buscar" className="searchbar__icon" />
      <input
        type="text"
        placeholder={t("header.search")}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
