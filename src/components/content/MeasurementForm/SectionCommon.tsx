import { useFormContext } from 'react-hook-form';
import { getAgeInDayDegrees, MeasurementInputs } from './helpers';
import { Input } from '@/components/ui/Input';
import { spellPlurals } from '@/components/utils/spellPlurals';
import { round } from '@/components/utils/round';

const FATNESS_FACTOR_AVG = 1.342;
const THICK_FACTOR_AVG = 11.224;

export const SectionCommon = () => {
  const { register, watch } = useFormContext<MeasurementInputs>();

  const ageInDayDegrees = getAgeInDayDegrees(Number(watch('ageInDays')) || 0);
  const weight = Number(watch('weight')) || 0;
  const lengthHead = Number(watch('lengthHead')) || 0;
  const lengthAbsolute = Number(watch('lengthAbsolute')) || 0;
  const thicknessBody = Number(watch('thicknessBody')) || 0;
  const heightBody = Number(watch('heightBody')) || 0;

  const fatnessFactor = !weight || !lengthAbsolute ? 0 : round((weight / Math.pow(lengthAbsolute, 3)) * 100);
  const isFatnessFactorValid = fatnessFactor && Math.abs(FATNESS_FACTOR_AVG - fatnessFactor) > 0.1;

  const thickFactor = !lengthAbsolute || !thicknessBody ? 0 : round((thicknessBody / lengthAbsolute) * 100);
  const isThickFactorValid = thickFactor && Math.abs(THICK_FACTOR_AVG - thickFactor) > 1;

  const headFactor = !lengthHead || !lengthAbsolute ? 0 : round((lengthHead / lengthAbsolute) * 100);
  const runnabilityIndex = !heightBody || !lengthAbsolute ? 0 : round(lengthAbsolute / heightBody);

  return (
    <>
      <div className="mt-4 flex gap-4 flex-wrap">
        <Input name="tag" label="Метка (Идентификатор)" />
        <Input type="date" name="dateOfBirth" label="Дата рождения" />
        <Input type="date" name="dateOfHatch" label="Дата вылупления" />
        <Input type="date" name="dateOfFirstFeed" label="Дата начала питания" />
        <Input type="number" name="ageInDays" label="Расчетный возраст" topRightLabel="(дни)" max={365_100} />
      </div>
      <div className="stats shadow mt-4 w-full md:w-auto">
        <div className="stat place-items-center">
          <div className="stat-title">Расчетный возраст</div>
          <div className="stat-value">{ageInDayDegrees}</div>
          <div className="stat-desc">{spellPlurals(ageInDayDegrees, 'градусодень', 'градусодня', 'градусодней')}</div>
        </div>
      </div>
      <div className="divider" />
      <div className="mt-4 flex gap-4 flex-wrap items-end">
        <h2 className="text-xl w-full">Абсолютные показатели телосложения</h2>
        <Input type="number" name="lengthAbsolute" label="Длина абсолютная" topRightLabel="см" />
        <Input
          type="number"
          name="lengthBeforeScales"
          label="Длина тела (до окончания чешуйного покрова)"
          topRightLabel="см"
        />
        <Input type="number" name="lengthBody" label="Длина туловища" topRightLabel="см" />
        <Input type="number" name="lengthHead" label="Длина головы" topRightLabel="см" />
        <Input type="number" name="heightBody" label="Высота тела" topRightLabel="см" />
        <Input type="number" name="thicknessBody" label="Толщина тела" step={0.01} topRightLabel="см" />
        <Input type="number" name="thicknessOfBack" label="Толщина спинки" topRightLabel="см" />
        <Input type="number" name="weight" label="Вес тела" topRightLabel="г" />
      </div>
      <div className="divider" />
      <div className="mt-4 flex gap-4 flex-wrap">
        <h2 className="text-xl w-full">Удельные показатели телосложения</h2>
        <div className="stats shadow w-full md:w-auto stats-vertical md:stats-horizontal">
          <div className="stat place-items-center">
            <div className="stat-title">Упитанность</div>
            <div className={`stat-value ${isFatnessFactorValid ? 'text-red-600' : ''}`}>{fatnessFactor}</div>
            {!!fatnessFactor && <div className="stat-desc">Среднее: {FATNESS_FACTOR_AVG}</div>}
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Индекс толщины</div>
            <div className={`stat-value ${isThickFactorValid ? 'text-red-600' : ''}`}>{thickFactor}</div>
            {!!thickFactor && <div className="stat-desc">Среднее: {THICK_FACTOR_AVG}</div>}
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Индекс головы</div>
            <div className="stat-value">{headFactor}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Прогонистость</div>
            <div className="stat-value">{runnabilityIndex}</div>
          </div>
        </div>
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
    </>
  );
};
