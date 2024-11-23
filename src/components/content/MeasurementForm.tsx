import { Input } from '@/components/ui/Input';
import { InputDate } from '@/components/ui/InputDate';
import { InputNumber } from '@/components/ui/InputNumber';

export const MeasurementForm = () => {
  return (
    <>
      <h2 className="text-3xl">Новый бонитет</h2>
      <div className="mt-4 flex gap-4 flex-wrap">
        <Input label="Метка (Идентификатор)" />
        <InputDate label="Дата рождения" />
        <InputDate label="Дата вылупления" />
        <InputDate label="Дата начала питания" />
      </div>
      <div className="divider" />
      <div className="mt-4 flex gap-4 flex-wrap">
        <InputNumber label="Расчетный возраст (дни)" />
        <InputNumber label="Расчетный возраст (градусодни)" />
      </div>
      <div className="divider" />
      <div className="mt-4 flex gap-4 flex-wrap">
        <h2 className="text-xl w-full">Абсолютные показатели телосложения</h2>
        <InputNumber label="Длина абсолютная" />
        <InputNumber label="Длина тела (до окончания чешуйного покрова)" />
        <InputNumber label="Длина туловища" />
        <InputNumber label="Длина головы" />
        <InputNumber label="Высота тела" />
        <InputNumber label="Толщина спинки" />
      </div>
      <div className="divider" />
      <div className="mt-4 flex gap-4 flex-wrap">
        <h2 className="text-xl w-full">Удельные показатели телосложения</h2>
        <InputNumber label="Коэффициент упитанности" />
        <InputNumber label="Индекс головы" />
        <InputNumber label="Индекс толщины" />
        <InputNumber label="Индекс прогонистости" />
      </div>
      <div className="divider" />
      <div className="mt-4 flex gap-4 flex-wrap items-end">
        <h2 className="text-xl w-full">Репродуктивные показатели</h2>
        <InputNumber label="Объем эякулята в день оплодотворения" />
        <InputNumber label="Концентрация сперматозоидов/сперматокрит" />
        <InputNumber label="Время подвижности сперматозоидов на оплодотворяющем растворе/воде" />
      </div>
      <div className="divider" />
      <div className="mt-4 flex gap-4 flex-wrap">
        <h2 className="text-xl w-full">Дневник самца</h2>
        <textarea className="textarea textarea-bordered w-full" placeholder="Текст" />
      </div>
      <div className="mt-4 flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <input type="checkbox" className="checkbox" />
          <h2 className="text-l">Отбор в племенное ядро</h2>
        </div>
      </div>
      <div className="mt-12 flex gap-4 flex-wrap">
        <button className="btn btn-primary w-40">Сохранить</button>
      </div>
    </>
  );
};
