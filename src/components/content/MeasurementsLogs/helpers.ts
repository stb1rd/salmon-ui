import { MeasurementInputs } from '../MeasurementForm/helpers';

export type ApiMeasurementItem = MeasurementInputs & {
  id: number;
  created: string;
  relativeFecundity: string;
  reproductiveIndex: string;
};

export const getDateLabel = (dateRaw?: string) => {
  if (!dateRaw) {
    return null;
  }

  const date = new Date(dateRaw);
  return `${date.toLocaleDateString()} в ${date.toLocaleTimeString()}`;
};
