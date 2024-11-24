import { MeasurementInputs } from '../MeasurementForm/helpers';

export type ReportItem = MeasurementInputs & {
  type: string;
  color?: 'yellow' | 'red';
};
