type Props = {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
  allLabel?: string;
};

export default function ProductFilter({
  categories,
  selected,
  onSelect,
  allLabel = "Todas",
}: Props) {
  return (
    <div className="filter">
      <h4
        className={selected === "all" ? "tab-active" : ""}
        onClick={() => onSelect("all")}
      >
        {allLabel}
      </h4>

      {categories.map((cat) => (
        <h4
          key={cat}
          className={selected === cat ? "tab-active" : ""}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </h4>
      ))}
    </div>
  );
}
