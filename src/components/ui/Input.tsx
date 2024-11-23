import { useFormContext } from 'react-hook-form';

type Props = {
  label: string;
  name: string;
  max?: number;
  step?: number;
  type?: 'text' | 'date' | 'number' | 'number-percent';
  topRightLabel?: string;
};

export const Input = ({ label, name, type = 'text', max, step, topRightLabel }: Props) => {
  let inputType = type;
  let placeholder = 'Текст';
  let inputMin;
  let inputMax;
  let inputStep;
  let inputmode;
  if (type === 'number') {
    placeholder = 'Число';
    inputMin = 0;
    inputMax = 10000;
  }
  if (type === 'number-percent') {
    placeholder = 'Процент';
    inputMin = 0;
    inputMax = 100;
    inputType = 'number';
  }
  if (max) {
    inputMax = max;
  }
  if (step) {
    inputStep = step;
  }
  if (inputType === 'number') {
    inputmode = 'decimal' as const;
  }

  const { register } = useFormContext();

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label items-end">
        <span className="label-text">{label}</span>
        {topRightLabel && <span className="label-text">{topRightLabel}</span>}
      </div>
      <input
        type={inputType}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        min={inputMin}
        max={inputMax}
        step={inputStep}
        inputMode={inputmode}
        required
        {...register(name)}
      />
    </label>
  );
};
