import { Input } from '@/components/ui/Input';
import { useFormContext } from 'react-hook-form';
import { MeasurementInputs } from './helpers';

export const SectionFemale = () => {
  const { register } = useFormContext<MeasurementInputs>();

  return (
    <>
      <div className="divider" />
      <div className="mt-4 flex gap-4 flex-wrap items-end">
        <h2 className="text-xl w-full">Репродуктивные показатели</h2>
        <Input type="number" name="weightOfEggs" label="Масса икры" />
        <Input type="number" name="weightOfSingleEgg" label="Масса икринки" />
        <Input type="number" name="caviarProportion" label="Доля икры" />
        <Input type="number" name="workingFertility" label="Рабочая плодовитость" />
      </div>
      <div className="divider" />
      <div className="mt-4 flex gap-4 flex-wrap items-end">
        <h2 className="text-xl w-full">Оценка по качеству потомства</h2>
        <Input type="number-percent" name="percentOfEggFertilization" label="% оплодотворения икры" />
        <Input type="number-percent" name="percentOfEmbryoSurvival" label="% выживания эмбрионов" />
        <Input type="number-percent" name="percentOfEmbryoYield" label="% выхода эмбрионов" />
        <Input type="number-percent" name="percentOfDeathToThePeephole" label="% гибели до глазка" />
        <Input type="number-percent" name="percentOfDeathAfterThePeephole" label="% гибели после глазка" />
        <Input
          type="number-percent"
          name="postOcularDevelopmentalAbnormalities"
          label="% патологий развития после глазка"
        />
        <Input type="number-percent" name="percentOfHatchingInTwoDays" label="% вылупления за 2 дня" />
        <Input
          type="number-percent"
          name="percentOfWentUpOnTheFloat"
          label="% поднявшихся на плав через 210 градусодней после вылупления"
        />
      </div>
      <div className="divider" />
      <div className="mt-4 flex gap-4 flex-wrap items-end">
        <h2 className="text-xl w-full">Оценка конверсии корма</h2>
        <Input type="number" name="feedFactor" label="Кормовой коэффициент" />
        <Input type="number" name="filletPigmentation" label="Пигментация филе" />
        <Input
          type="number-percent"
          name="activeFeedingSurvivalRate"
          label="Выживаемость при переходе на активное питание, %"
        />
        <Input
          type="number-percent"
          name="diseaseResistance"
          label="Устойчивость к болезням (% выживаемости при контакте с патогеном через 14 дней)"
        />
      </div>
      <div className="divider" />
      <div className="mt-4 flex gap-4 flex-wrap">
        <h2 className="text-xl w-full">Дневник самки</h2>
        <textarea className="textarea textarea-bordered w-full" placeholder="Текст" {...register('journal')} />
      </div>
    </>
  );
};
