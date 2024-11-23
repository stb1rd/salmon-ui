import { MeasurementInputs } from '../MeasurementForm/helpers';

export type ApiMeasurementItem = MeasurementInputs & {
  id: number;
  created: string;
};
