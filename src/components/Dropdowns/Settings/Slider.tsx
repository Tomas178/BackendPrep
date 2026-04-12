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
}: SliderProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-primary text-xs font-medium">{label}</label>
        <span className="bg-surface-alt text-primary rounded-md px-2 py-0.5 font-mono text-xs tabular-nums">
          {fixed ? parameter.toFixed(2) : parameter}
        </span>
      </div>
      <input
        type="range"
        min={minValue}
        max={maxValue}
        step={stepValue}
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
