import { useFormContext } from 'react-hook-form';

export const Input = ({
  label,
  name,
  type = 'text',
}: {
  label: string;
  name: string;
  type?: 'text' | 'date' | 'number' | 'number-percent';
}) => {
  let inputType = type;
  let placeholder = 'Текст';
  let min;
  let max;
  let step;
  if (type === 'number') {
    placeholder = 'Число';
    min = 0;
    max = 10000;
  }
  if (type === 'number-percent') {
    placeholder = 'Процент';
    min = 0;
    max = 100;
    inputType = 'number';
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
        min={min}
        max={max}
        step={step}
        {...register(name)}
      />
    </label>
  );
};
