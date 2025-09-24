import React from 'react';

export interface CheckboxOption<T extends string = string> {
  label: string;
  value: T;
}

interface CheckboxGroupProps<T extends string = string> {
  options: CheckboxOption<T>[];
  values: T[];
  onChange: (vals: T[]) => void;
  name: string;
  multiple?: boolean; // if false, behaves like single-select (but with checkbox UI)
}

const CheckboxGroup = <T extends string = string>({ options, values, onChange, name, multiple = true }: CheckboxGroupProps<T>) => {
  const toggle = (val: T) => {
    if (multiple) {
      if (values.includes(val)) onChange(values.filter((v) => v !== val));
      else onChange([...values, val]);
    } else {
      // single select behavior
      if (values.includes(val)) onChange([]);
      else onChange([val]);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const checked = values.includes(opt.value);
        return (
          <label key={opt.value} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer">
            <input
              type="checkbox"
              name={name}
              className="h-4 w-4 text-blue-600"
              checked={checked}
              onChange={() => toggle(opt.value)}
            />
            <span className="text-slate-700">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
};

export default CheckboxGroup;
