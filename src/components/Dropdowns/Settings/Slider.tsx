import { useState } from 'react';

export type SliderProps = {
  label: string;
  parameter: number;
  minValue: number;
  maxValue: number;
  stepValue: number;
  onParameterChange: (value: number) => void;
  explanatoryTextForMinValue: string;
  explanatoryTextForMaxValue: string;
  fixed?: boolean;
  disabled?: boolean;
};

export default function Slider({
  label,
  parameter,
  minValue,
  maxValue,
  stepValue,
  onParameterChange,
  explanatoryTextForMinValue,
  explanatoryTextForMaxValue,
  fixed = true,
  disabled = false,
}: SliderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const displayValue = fixed ? parameter.toFixed(2) : String(parameter);

  function commitValue() {
    setIsEditing(false);
    const val = parseFloat(inputValue);
    if (!isNaN(val)) {
      onParameterChange(Math.min(maxValue, Math.max(minValue, val)));
    }
  }

  return (
    <div className={disabled ? 'opacity-40' : ''}>
      <div className="flex items-center justify-between">
        <label className="text-primary text-xs font-medium">{label}</label>
        <input
          type="number"
          min={minValue}
          max={maxValue}
          step={stepValue}
          disabled={disabled}
          value={isEditing ? inputValue : displayValue}
          onFocus={(e) => {
            setIsEditing(true);
            setInputValue(displayValue);
            e.target.select();
          }}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={commitValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.currentTarget.blur();
          }}
          className="bg-surface-alt text-primary focus:ring-accent w-16 [appearance:textfield] rounded-md border-0 px-2 py-0.5 text-right font-mono text-xs tabular-nums outline-none focus:ring-1 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
      </div>
      <input
        type="range"
        min={minValue}
        max={maxValue}
        step={stepValue}
        disabled={disabled}
        value={parameter}
        onChange={(e) => onParameterChange(parseFloat(e.target.value))}
        className="slider mt-2 w-full"
      />
      <div className="text-muted mt-1 flex justify-between text-[10px]">
        <span>{explanatoryTextForMinValue}</span>
        <span>{explanatoryTextForMaxValue}</span>
      </div>
    </div>
  );
}
