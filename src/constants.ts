export const BASE_PATH = process.env.NODE_ENV === 'development' ? '' : '/salmon-ui';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  ['Толщина спинки', 'thicknessOfBack'],
  ['Коэффициент упитанности', 'fatnessFactor'],
  ['Индекс головы', 'headFactor'],
  ['Индекс толщины', 'thickFactor'],
  ['Индекс прогонистости', 'runnabilityIndex'],
  ['Объем эякулята в день оплодотворения', 'ejaculateVolume'],
  ['Концентрация сперматозоидов/сперматокрит', 'spermConcentration'],
  ['Время подвижности сперматозоидов на оплодотворяющем растворе/воде  ', 'spermMotilityTime'],
  // Репродуктивные показатели
  ['Масса икры', 'weightOfEggs'],
  ['Масса икринки', 'weightOfSingleEgg'],
  ['Доля икры', 'caviarProportion'],
  ['Рабочая плодовитость', 'workingFertility'],
  // Оценка по качеству потомства
  ['% оплодотворения икры', 'percentOfEggFertilization'],
  ['% выживания эмбрионов', 'percentOfEmbryoSurvival'],
  ['% выхода эмбрионов', 'percentOfEmbryoYield'],
  ['% гибели до глазка', 'percentOfOfDeathToThePeephole'],
  ['% гибели после глазка', 'percentOfOfDeathAfterThePeephole'],
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
