import { MeasurementInputs } from '../MeasurementForm/helpers';

export type ReportItem = MeasurementInputs & {
  type: string;
  color?: 'yellow' | 'red';
};

export type FishItem = {
  id: string;
  fieldName: string;
  value: number;
};
