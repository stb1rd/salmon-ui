import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { Input } from '../ui/Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export type MeasurementInputs = {
  tag?: string;
  dateOfBirth?: string;
  dateOfHatch?: string;
  dateOfFirstFeed?: string;
  ageInDays?: string;
  ageInDayDegrees?: string;
  lengthAbsolute?: string;
  lengthBeforeScales?: string;
  lengthBody?: string;
  lengthHead?: string;
  heightBody?: string;
  thicknessOfBack?: string;
  fatnessFactor?: string;
  headFactor?: string;
  thickFactor?: string;
  runnabilityIndex?: string;
  gender?: 'unknown' | 'male' | 'female';
  ejaculateVolume?: string;
  spermConcentration?: string;
  spermMotilityTime?: string;
  journal?: string;
};

export const MeasurementForm = () => {
  const methods = useForm<MeasurementInputs>({
    defaultValues: {
      gender: 'unknown',
    },
  });
  const { handleSubmit, register, watch } = methods;

  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (values: MeasurementInputs) =>
      await fetch('http://194.87.131.215:8080/trout/rest/selects_grading?size=1000', {
        method: 'POST',
        body: JSON.stringify({
          marker: values.tag,
          dateOfBirth: values.dateOfBirth,
          dateOfHatching: values.dateOfHatch,
          dateOfStartFeeding: values.dateOfFirstFeed,
          estimatedAgeDays: Number(values.ageInDays),
          estimatedAgeDegreeDays: Number(values.ageInDayDegrees),

          absoluteLength: Number(values.lengthAbsolute),
          bodyLengthBeforeEndScaleCover: Number(values.lengthBeforeScales),
          bodyLength: Number(values.lengthBody),
          headLength: Number(values.lengthHead),
          bodyHeight: Number(values.heightBody),
          backThickness: Number(values.thicknessOfBack),
          fatnessIndex: Number(values.fatnessFactor),
          headIndex: Number(values.headFactor),
          thicknessIndex: Number(values.thickFactor),
          indexRunnability: Number(values.runnabilityIndex),
          ejaculateVolume: Number(values.ejaculateVolume),
          spermatocritValue: Number(values.spermConcentration),
          spermMotilityTime: Number(values.spermMotilityTime),
          diary: values.journal,
        }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['log'] });
      router.push('/log');
    },
  });

  const onSubmit: SubmitHandler<MeasurementInputs> = (values) => mutate(values);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl">Оценка показателей</h2>
        <div className="mt-4 flex gap-4 flex-wrap">
          <Input name="tag" label="Метка (Идентификатор)" />
          <Input type="date" name="dateOfBirth" label="Дата рождения" />
          <Input type="date" name="dateOfHatch" label="Дата вылупления" />
          <Input type="date" name="dateOfFirstFeed" label="Дата начала питания" />
        </div>
        <div className="divider" />
        <div className="mt-4 flex gap-4 flex-wrap">
          <Input type="number" name="ageInDays" label="Расчетный возраст (дни)" />
          <Input type="number" name="ageInDayDegrees" label="Расчетный возраст (градусодни)" />
        </div>
        <div className="divider" />
        <div className="mt-4 flex gap-4 flex-wrap">
          <h2 className="text-xl w-full">Абсолютные показатели телосложения</h2>
          <Input type="number" name="lengthAbsolute" label="Длина абсолютная" />
          <Input type="number" name="lengthBeforeScales" label="Длина тела (до окончания чешуйного покрова)" />
          <Input type="number" name="lengthBody" label="Длина туловища" />
          <Input type="number" name="lengthHead" label="Длина головы" />
          <Input type="number" name="heightBody" label="Высота тела" />
          <Input type="number" name="thicknessOfBack" label="Толщина спинки" />
        </div>
        <div className="divider" />
        <div className="mt-4 flex gap-4 flex-wrap">
          <h2 className="text-xl w-full">Удельные показатели телосложения</h2>
          <Input type="number" name="fatnessFactor" label="Коэффициент упитанности" />
          <Input type="number" name="headFactor" label="Индекс головы" />
          <Input type="number" name="thickFactor" label="Индекс толщины" />
          <Input type="number" name="runnabilityIndex" label="Индекс прогонистости" />
        </div>
        <div className="divider" />
        <div className="mt-4 flex gap-4 flex-wrap items-end">
          <h2 className="text-xl w-full">Пол</h2>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-2">Не определен</span>
              <input type="radio" className="radio checked:bg-blue-500" value="unknown" {...register('gender')} />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-2">Самец</span>
              <input type="radio" className="radio checked:bg-blue-500" value="male" {...register('gender')} />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-2">Самка</span>
              <input type="radio" className="radio checked:bg-blue-500" value="female" {...register('gender')} />
            </label>
          </div>
        </div>
        {watch('gender') === 'male' && (
          <>
            <div className="divider" />
            <div className="mt-4 flex gap-4 flex-wrap items-end">
              <h2 className="text-xl w-full">Репродуктивные показатели</h2>
              <Input type="number" name="ejaculateVolume" label="Объем эякулята в день оплодотворения" />
              <Input type="number" name="spermConcentration" label="Концентрация сперматозоидов/сперматокрит" />
              <Input
                type="number"
                name="spermMotilityTime"
                label="Время подвижности сперматозоидов на оплодотворяющем растворе/воде"
              />
            </div>
            <div className="divider" />
            <div className="mt-4 flex gap-4 flex-wrap">
              <h2 className="text-xl w-full">Дневник самца</h2>
              <textarea className="textarea textarea-bordered w-full" placeholder="Текст" {...register('journal')} />
            </div>
          </>
        )}
        {watch('gender') === 'female' && (
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
              <Input type="number-percent" name="percentOfOfDeathToThePeephole" label="% гибели до глазка" />
              <Input type="number-percent" name="percentOfOfDeathAfterThePeephole" label="% гибели после глазка" />
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
        )}
        <div className="mt-4 flex gap-4 flex-wrap">
          <div className="flex gap-2">
            <input type="checkbox" className="checkbox" />
            <h2 className="text-l">Отбор в племенное ядро</h2>
          </div>
        </div>
        <div className="mt-12 flex gap-4 flex-wrap">
          <button className="btn btn-primary w-40" disabled={isPending}>
            {isPending && <span className="loading loading-spinner" />}
            {!isPending && 'Сохранить'}
          </button>
          {isSuccess && (
            <div className="alert alert-success">
              <span>Сохранение успешно</span>
            </div>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
