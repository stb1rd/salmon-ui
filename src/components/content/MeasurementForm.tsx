import { useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';

import { Input } from '../ui/Input';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Link from 'next/link';
import { spellPlurals } from '../utils/spellPlurals';

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

const mapFormValuesToApi = (values: MeasurementInputs) => ({
  tag: values.tag,
  dateOfBirth: values.dateOfBirth,
  dateOfHatch: values.dateOfHatch,
  dateOfFirstFeed: values.dateOfFirstFeed,
  ageInDays: Number(values.ageInDays),
  ageInDayDegrees: Number(values.ageInDayDegrees),
  lengthAbsolute: Number(values.lengthAbsolute),
  lengthBeforeScales: Number(values.lengthBeforeScales),
  lengthBody: Number(values.lengthBody),
  lengthHead: Number(values.lengthHead),
  heightBody: Number(values.heightBody),
  thicknessOfBack: Number(values.thicknessOfBack),
  fatnessFactor: Number(values.fatnessFactor),
  headFactor: Number(values.headFactor),
  thickFactor: Number(values.thickFactor),
  runnabilityIndex: Number(values.runnabilityIndex),
  // ejaculateVolume: Number(values.ejaculateVolume),
  // spermConcentration: Number(values.spermConcentration),
  // spermMotilityTime: Number(values.spermMotilityTime),
  journal: values.journal,
});

export const MeasurementForm = () => {
  const methods = useForm<MeasurementInputs>({ defaultValues: { gender: 'unknown' } });
  const { handleSubmit, register, watch, reset } = methods;
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [isSuccessMsgVisible, setIsSuccessMsgVisible] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending, isSuccess } = useMutation({
    retry: 0,
    mutationFn: async (values: MeasurementInputs) => {
      setIsErrorVisible(false);
      setIsSuccessMsgVisible(false);
      const response = await fetch('http://194.87.131.215:8080/trout/rest/selects_grading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mapFormValuesToApi(values)),
      });
      if (response.status !== 200) {
        const json = await response.json();
        throw new Error(json.error);
      }
    },
    onError: (error) => {
      console.error(error);
      setIsErrorVisible(true);
    },
    onSuccess: () => {
      setIsErrorVisible(false);
      setIsSuccessMsgVisible(true);
      queryClient.invalidateQueries({ queryKey: ['log'] });
    },
  });

  const onSubmit: SubmitHandler<MeasurementInputs> = (values) => mutate(values);

  let ageInDays = Number(watch('ageInDays')) || 0;
  if (ageInDays > 365_100) {
    ageInDays = 365_100;
  }
  const ageInDayDegrees = ageInDays * (18 - (new Date(1, 1, ageInDays).getDate() % 4));

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-3xl">Оценка показателей</h2>
        <div className="mt-4 flex gap-4 flex-wrap">
          <Input name="tag" label="Метка (Идентификатор)" />
          <Input type="date" name="dateOfBirth" label="Дата рождения" />
          <Input type="date" name="dateOfHatch" label="Дата вылупления" />
          <Input type="date" name="dateOfFirstFeed" label="Дата начала питания" />
          <Input type="number" name="ageInDays" label="Расчетный возраст (дни)" max={365_100} />
        </div>
        <div className="stats shadow mt-4">
          <div className="stat place-items-center">
            <div className="stat-title">Расчетный возраст</div>
            <div className="stat-value">{ageInDayDegrees}</div>
            <div className="stat-desc">{spellPlurals(ageInDayDegrees, 'градусодень', 'градусодня', 'градусодней')}</div>
          </div>
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
        <div className="mt-12 flex gap-4 flex-col items-start">
          {isErrorVisible && (
            <div className="toast">
              <div role="alert" className="alert alert-error bg-red-600 text-white">
                <ErrorOutlineIcon fontSize="small" />
                <span>
                  <strong>Ошибка</strong> при сохранении данных, попробуйте еще раз
                </span>
                <button
                  type="button"
                  className="btn btn-sm btn-warning btn-outline btn-square"
                  onClick={() => setIsErrorVisible(false)}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
          )}
          {isSuccessMsgVisible && (
            <div className="toast">
              <div className="flex flex-col gap-1 items-start">
                <div className="alert bg-green-600 text-white w-auto pr-8">
                  <DoneIcon />
                  <strong>Оценка сохранена</strong>
                  <button
                    type="button"
                    className="btn btn-sm btn-ghost btn-square"
                    onClick={() => setIsSuccessMsgVisible(false)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            </div>
          )}
          <p>
            После сохранения можно отредактировать и отправить ее повторно, либо{' '}
            <button
              type="button"
              className="btn-link"
              onClick={() => {
                reset();
                setIsSuccessMsgVisible(false);
              }}
            >
              сбросить все поля
            </button>
            , либо открыть{' '}
            <Link className="btn-link" href="/log">
              таблицу с оценками
            </Link>
          </p>
          <div className="flex gap-12 items-center">
            <button type="submit" className="btn btn-primary btn-lg btn-wide" disabled={isPending}>
              {isPending && <span className="loading loading-spinner" />}
              {!isPending && 'Сохранить'}
            </button>
            {isSuccess && (
              <Link className="btn-link" href="/log">
                Открыть таблицу с оценками
              </Link>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
