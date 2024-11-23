import { useFormContext } from 'react-hook-form';

type Props = {
  label: string;
  name: string;
  max?: number;
  step?: number;
  type?: 'text' | 'date' | 'number' | 'number-percent';
};

export const Input = ({ label, name, type = 'text', max, step }: Props) => {
  let inputType = type;
  let placeholder = 'Текст';
  let inputMin;
  let inputMax;
  let inputStep;
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

  const { register } = useFormContext();

  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={inputType}
        placeholder={placeholder}
        className="input input-bordered w-full max-w-xs"
        min={inputMin}
        max={inputMax}
        step={inputStep}
        required
        {...register(name)}
      />
    </label>
  );
};
