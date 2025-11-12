import React from 'react';

interface RangeInputProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  displayPrecision?: number;
  labelWidth?: string;
  displayValueFormatter?: (value: number) => string;
  onMouseUp?: (value: number) => void;
  onTouchEnd?: (value: number) => void;
}

const RangeInput: React.FC<RangeInputProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  unit = '',
  displayPrecision = 0,
  labelWidth = 'w-10',
  displayValueFormatter,
  onMouseUp, 
  onTouchEnd,
}) => {
  const displayValue = displayValueFormatter
    ? displayValueFormatter(value)
    : `${value.toFixed(displayPrecision)}${unit}`;
  
  const label = displayValueFormatter ? displayValueFormatter(value) : `${value.toFixed(displayPrecision)}${unit || ''}`;

  return (
    <div className="flex items-center space-x-2 w-full sm:w-48">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        onMouseUp={onMouseUp ? (e) => onMouseUp(parseFloat(e.currentTarget.value)) : undefined}
        onTouchEnd={onTouchEnd ? (e) => onTouchEnd(parseFloat(e.currentTarget.value)) : undefined}
        className="w-full h-4 bg-transparent appearance-none cursor-pointer focus:outline-none"
        aria-label={label}
      />
      <span className={`font-mono text-sm text-slate-400 text-right ${labelWidth}`} aria-hidden="true">
        {displayValue}
      </span>
    </div>
  );
};

export default RangeInput;