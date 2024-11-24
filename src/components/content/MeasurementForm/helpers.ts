import { set } from 'react-hook-form';

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
  thicknessBody?: string;
  thicknessOfBack?: string;
  weight?: string;
  fatnessFactor?: string;
  headFactor?: string;
  thickFactor?: string;
  runnabilityIndex?: string;
  gender?: 'unknown' | 'male' | 'female';
  ejaculateVolume?: string;
  spermConcentration?: string;
  spermMotilityTime?: string;
  weightOfEggs?: string;
  weightOfSingleEgg?: string;
  caviarProportion?: string;
  workingFertility?: string;
  percentOfEggFertilization?: string;
  percentOfEmbryoSurvival?: string;
  percentOfEmbryoYield?: string;
  percentOfDeathToThePeephole?: string;
  percentOfDeathAfterThePeephole?: string;
  postOcularDevelopmentalAbnormalities?: string;
  percentOfHatchingInTwoDays?: string;
  percentOfWentUpOnTheFloat?: string;
  feedFactor?: string;
  filletPigmentation?: string;
  activeFeedingSurvivalRate?: string;
  diseaseResistance?: string;
  journal?: string;
  relativeFecundity?: string;
  reproductiveIndex?: string;
};

export const getAgeInDayDegrees = (ageInDays: number) => {
  if (ageInDays > 365_100) {
    ageInDays = 365_100;
  }
  const ageInDayDegrees = ageInDays * (18 - (new Date(1, 1, ageInDays).getDate() % 4));
  return ageInDayDegrees;
};

export const mapFormValuesToApi = (values: MeasurementInputs) => {
  const ageInDayDegrees = getAgeInDayDegrees(Number(values.ageInDays) || 0);
  const apiValues = {
    tag: values.tag,
    dateOfBirth: values.dateOfBirth,
    dateOfHatch: values.dateOfHatch,
    dateOfFirstFeed: values.dateOfFirstFeed,
    ageInDays: Number(values.ageInDays),
    ageInDayDegrees: ageInDayDegrees,
    lengthAbsolute: Number(values.lengthAbsolute),
    lengthBeforeScales: Number(values.lengthBeforeScales),
    lengthBody: Number(values.lengthBody),
    lengthHead: Number(values.lengthHead),
    heightBody: Number(values.heightBody),
    thicknessBody: Number(values.thicknessBody),
    thicknessOfBack: Number(values.thicknessOfBack),
    weight: Number(values.weight),
  };
  if (values.gender === 'male') {
    set(apiValues, 'ejaculateVolume', Number(values.ejaculateVolume));
    set(apiValues, 'spermConcentration', Number(values.spermConcentration));
    set(apiValues, 'spermMotilityTime', Number(values.spermMotilityTime));
    set(apiValues, 'journal', values.journal);
  }
  if (values.gender === 'female') {
    set(apiValues, 'weightOfEggs', Number(values.weightOfEggs));
    set(apiValues, 'weightOfSingleEgg', Number(values.weightOfSingleEgg));
    set(apiValues, 'caviarProportion', Number(values.caviarProportion));
    set(apiValues, 'workingFertility', Number(values.workingFertility));
    set(apiValues, 'percentOfEggFertilization', Number(values.percentOfEggFertilization));
    set(apiValues, 'percentOfEmbryoSurvival', Number(values.percentOfEmbryoSurvival));
    set(apiValues, 'percentOfEmbryoYield', Number(values.percentOfEmbryoYield));
    set(apiValues, 'percentOfDeathToThePeephole', Number(values.percentOfDeathToThePeephole));
    set(apiValues, 'percentOfDeathAfterThePeephole', Number(values.percentOfDeathAfterThePeephole));
    set(apiValues, 'postOcularDevelopmentalAbnormalities', Number(values.postOcularDevelopmentalAbnormalities));
    set(apiValues, 'percentOfHatchingInTwoDays', Number(values.percentOfHatchingInTwoDays));
    set(apiValues, 'percentOfWentUpOnTheFloat', Number(values.percentOfWentUpOnTheFloat));
    set(apiValues, 'feedFactor', Number(values.feedFactor));
    set(apiValues, 'filletPigmentation', Number(values.filletPigmentation));
    set(apiValues, 'activeFeedingSurvivalRate', Number(values.activeFeedingSurvivalRate));
    set(apiValues, 'diseaseResistance', Number(values.diseaseResistance));

    set(apiValues, 'journal', values.journal);
  }

  return JSON.stringify(apiValues);
};
