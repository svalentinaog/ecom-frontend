import React from "react";

interface PriceRangeProps {
  value: [number, number];
  onChange: (val: [number, number]) => void;
  min: number;
  max: number;
}

export default function PriceRange({
  value,
  onChange,
  min,
  max,
}: PriceRangeProps) {
  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = Number(e.target.value);
    onChange([value[0], newVal]);
  };

  const progress = max > 0 ? ((value[1] - min) / (max - min)) * 100 : 0;

  return (
    <div className="price-range">
      <div className="price-range__slider-container">
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={handleMaxChange}
          className="price-range__slider"
          style={{ '--progress': `${progress}%` } as React.CSSProperties}
        />
      </div>
      <div className="price-range__label">
        <span>
          ${value[0]} - ${value[1]}
        </span>
      </div>
    </div>
  );
}
