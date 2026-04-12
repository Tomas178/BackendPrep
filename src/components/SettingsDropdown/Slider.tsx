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
        <label className="text-secondary text-xs font-medium">{label}</label>
        <span className="text-muted text-xs">
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
        className="accent-accent mt-1 w-full"
      />
      <div className="text-muted flex justify-between text-[10px]">
        <span>{explanatoryTextForMinValue}</span>
        <span>{explanatoryTextForMaxValue}</span>
      </div>
    </div>
  );
}
