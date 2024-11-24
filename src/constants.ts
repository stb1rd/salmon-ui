export const BASE_PATH = process.env.NODE_ENV === 'development' ? '' : '/salmon-ui';

export const POST_PARAMS = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
};
export const URL_GRADING_POST = 'http://194.87.131.215:8080/trout/rest/selects_grading';

const MAP_LABEL_TO_FIELD_NAME = [
  ['Метка (Идентификатор)', 'tag'],
  ['Дата рождения', 'dateOfBirth'],
  ['Дата вылупления', 'dateOfHatch'],
  ['Дата начала питания', 'dateOfFirstFeed'],
  ['Расчетный возраст (дни)', 'ageInDays'],
  ['Расчетный возраст (градусодни)', 'ageInDayDegrees'],
  ['Длина абсолютная', 'lengthAbsolute'],
  ['Длина тела (до окончания чешуйного покрова)', 'lengthBeforeScales'],
  ['Длина туловища', 'lengthBody'],
  ['Длина головы', 'lengthHead'],
  ['Высота тела', 'heightBody'],
  ['Толщина тела', 'thicknessBody'],
  ['Толщина спинки', 'thicknessOfBack'],
  ['Вес тела', 'weight'],
  ['Коэффициент упитанности', 'fatnessFactor'],
  ['Индекс головы', 'headFactor'],
  ['Индекс толщины', 'thickFactor'],
  ['Индекс прогонистости', 'runnabilityIndex'],
  ['Объем эякулята в день оплодотворения', 'ejaculateVolume'],
  ['Концентрация сперматозоидов/сперматокрит', 'spermConcentration'],
  ['Время подвижности сперматозоидов на оплодотворяющем растворе/воде', 'spermMotilityTime'],
  // Репродуктивные показатели
  ['Масса икры', 'weightOfEggs'],
  ['Масса икринки', 'weightOfSingleEgg'],
  ['Доля икры', 'caviarProportion'],
  ['Рабочая плодовитость', 'workingFertility'],
  ['Относительная плодовитость', 'relativeFecundity'],
  ['Индекс репродуктивности', 'reproductiveIndex'],
  // Оценка по качеству потомства
  ['% оплодотворения икры', 'percentOfEggFertilization'],
  ['% выживания эмбрионов', 'percentOfEmbryoSurvival'],
  ['% выхода эмбрионов', 'percentOfEmbryoYield'],
  ['% гибели до глазка', 'percentOfDeathToThePeephole'],
  ['% гибели после глазка', 'percentOfDeathAfterThePeephole'],
  ['% патологий развития после глазка', 'postOcularDevelopmentalAbnormalities'],
  ['% вылупления за 2 дня', 'percentOfHatchingInTwoDays'],
  ['% поднявшихся на плав через 210 градусо-дней после вылупления', 'percentOfWentUpOnTheFloat'],
  // Оценка конверсии корма
  ['Кормовой коэффициент', 'feedFactor'],
  ['Пигментация филе', 'filletPigmentation'],
  ['Выживаемость при переходе на активное питание, %', 'activeFeedingSurvivalRate'],
  ['Устойчивость к болезням (% выживаемости при контакте с патогеном через 14 дней)', 'diseaseResistance'],
  ['Дневник самки (возможен текстовый формат блокнота/заметок)', 'journal'],
];
export const labelsByNamePathDict = new Map(MAP_LABEL_TO_FIELD_NAME.map(([label, name]) => [name, label]));
