export interface RadioOption<T extends string = string> {
  label: string;
  value: T;
}

interface RadioGroupProps<T extends string = string> {
  options: RadioOption<T>[];
  value?: T;
  onChange: (val: T) => void;
  name: string;
}

function RadioGroup<T extends string = string>({ options, value, onChange, name }: RadioGroupProps<T>) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer">
          <input
            type="radio"
            name={name}
            className="h-4 w-4 text-blue-600"
            checked={opt.value === value}
            onChange={() => onChange(opt.value)}
          />
          <span className="text-slate-700">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}

export default RadioGroup;
