import { useState } from "react";

export interface CategoryGroup {
  name: string;
  subcategories: string[];
}

interface Props {
  groups?: CategoryGroup[];
  selected?: string;
  onSelect?: (cat: string) => void;
}

export default function AccordionMenu({
  groups = [],
  selected = "",
  onSelect = () => {},
}: Props) {
  const [openGroup, setOpenGroup] = useState<string | null>(
    groups[0]?.name || null
  );

  return (
    <div className="accordion">
      {groups.map((group) => (
        <div key={group.name} className="accordion__group">
          <button
            className={`accordion__header ${
              openGroup === group.name || selected === group.name
                ? "active"
                : ""
            }`}
            onClick={() => {
              setOpenGroup(openGroup === group.name ? null : group.name);
              onSelect(group.name);
            }}
          >
            {group.name}
            <span className="accordion__icon"></span>
          </button>

          <div
            className={`accordion__content ${
              openGroup === group.name ? "open" : ""
            }`}
          >
            {(group.subcategories || []).map((sub) => (
              <button
                key={sub}
                className={`accordion__item ${
                  selected === sub ? "selected" : ""
                }`}
                onClick={() => onSelect(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
