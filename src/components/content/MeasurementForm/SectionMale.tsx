import { Input } from '@/components/ui/Input';
import { useFormContext } from 'react-hook-form';
import { MeasurementInputs } from './helpers';

export const SectionMale = () => {
  const { register } = useFormContext<MeasurementInputs>();

  return (
    <>
      <div className="divider" />
      <div className="mt-4 flex gap-4 flex-wrap items-end">
        <h2 className="text-xl w-full">Репродуктивные показатели</h2>
        <Input type="number" name="ejaculateVolume" label="Объем эякулята в день оплодотворения" topRightLabel="мл" />
        <Input type="number-percent" name="spermConcentration" label="Концентрация сперматозоидов/сперматокрит" />
        <Input
          type="number"
          name="spermMotilityTime"
          label="Время подвижности сперматозоидов на оплодотворяющем растворе/воде"
          topRightLabel="сек"
        />
      </div>
      <div className="divider" />
      <div className="mt-4 flex gap-4 flex-wrap">
        <h2 className="text-xl w-full">Дневник самца</h2>
        <textarea className="textarea textarea-bordered w-full" placeholder="Текст" {...register('journal')} />
      </div>
    </>
  );
};
