import { useQuery } from '@tanstack/react-query';
import { ApiMeasurementItem } from './helpers';
import { labelsByNamePathDict } from '@/constants';
import { round } from '@/components/utils/round';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MOCKED_GRADES = {
  content: [
    {
      id: 1,
      tag: 'Marker_Value',
      created: null,
      dateOfBirth: '2023-10-26',
      dateOfHatch: '2023-11-15',
      dateOfFirstFeed: '2023-12-01',
      ageInDays: 30,
      ageInDayDegrees: 1500,
      lengthAbsolute: 120,
      lengthBeforeScales: 110,
      lengthBody: 105,
      lengthHead: 20,
      heightBody: 15,
      thicknessOfBack: 10,
      fatnessFactor: 12.5,
      headFactor: 18.0,
      thickFactor: 10.2,
      runnabilityIndex: 95.7,
      ejaculateVolume: 150,
      spermConcentration: 55.0,
      spermMotilityTime: 60,
      diary: 'Some diary notes here...',
    },
    {
      id: 2,
      tag: 'Marker_Value',
      created: null,
      dateOfBirth: '2023-10-26',
      dateOfHatch: '2023-11-15',
      dateOfFirstFeed: '2023-12-01',
      ageInDays: 30,
      ageInDayDegrees: 1500,
      lengthAbsolute: 120,
      lengthBeforeScales: 110,
      lengthBody: 105,
      lengthHead: 20,
      heightBody: 15,
      thicknessOfBack: 10,
      fatnessFactor: 12.5,
      headFactor: 18.0,
      thickFactor: 10.2,
      runnabilityIndex: 95.7,
      ejaculateVolume: 150,
      spermConcentration: 55.0,
      spermMotilityTime: 60,
      diary: 'Some diary notes here...',
    },
  ],
  page: {
    size: 20,
    number: 0,
    totalElements: 9,
    totalPages: 1,
  },
};

const getDateLabel = (dateRaw?: string) => {
  if (!dateRaw) {
    return null;
  }

  const date = new Date(dateRaw);
  return `${date.toLocaleDateString()} в ${date.toLocaleTimeString()}`;
};

// "weight": 3120.9220779220777,
// "lengthBody": 99.50993377483444,
// "heightBody": 14.059602649006623,
// "thicknessOfBack": 10.092715231788079,
// "weightOfEggs": 232.0,
// "weightOfSingleEgg": 62.0,
// "fatnessFactor": 11.904137931034475,
// "thickFactor": 9.903448275862068,
// "runnabilityIndex": 86.4448275862069,
// "headFactor": 17.366896551724135,
// "caviarProportion": 0.18477611940298483,
// "workingFertility": 2520.283582089552,
// "relativeFecundity": 2866.6119402985073,
// "reproductiveIndex": 258.44776119402985,
// "percentOfDeathToThePeephole": 4.0,
// "percentOfDeathAfterThePeephole": 1.0,
// "percentOfEggFertilization": 77.0,
// "percentOfEmbryoSurvival": 88.0

export const MeasurementsLogs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['log'],
    queryFn: async () => {
      // return MOCKED_GRADES;
      const response = await fetch('http://194.87.131.215:8080/trout/rest/selects_grading?size=1000&genderIn=female');
      return await response.json();
    },
  });

  const isDataEmpty = !data || data.content.length === 0;
  const shouldRenderIsLoading = isLoading && isDataEmpty;
  const shouldRenderDataEmpty = !isLoading && isDataEmpty;
  const shouldRenderData = (!isLoading && !isDataEmpty) || (isLoading && !isDataEmpty);

  return (
    <>
      <h2 className="text-3xl mb-4">Журнал оценок самок</h2>
      {shouldRenderIsLoading && <span className="loading loading-spinner" />}
      {shouldRenderDataEmpty && <span>Ничего не найдено</span>}
      {shouldRenderData && (
        <div
          className="overflow-x-auto"
          // style={{ maxHeight: 'calc(100vh - 164px)', width: '100vw', margin: '0 -28px' }}
          style={{ maxHeight: 'calc(100vh - 164px)', width: '100vw', margin: '0 -56px' }}
        >
          <table className="table table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th>#</th>
                <th className="whitespace-pre-wrap pr-0 pl-[28px]">Метка (идентификатор)</th>
                <td className="whitespace-pre-wrap">Дата оценки</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('weight')} г</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('lengthBody')} см</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('heightBody')} см</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('thicknessOfBack')} см</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('weightOfEggs')} г</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('weightOfSingleEgg')} мг</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('fatnessFactor')}</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('thickFactor')}</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('runnabilityIndex')}</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('headFactor')}</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('caviarProportion')}</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('workingFertility')}</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('relativeFecundity')}</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('reproductiveIndex')}</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('percentOfDeathToThePeephole')}</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('percentOfDeathAfterThePeephole')}</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('percentOfEggFertilization')}</td>
                <td className="whitespace-pre-wrap">{labelsByNamePathDict.get('percentOfEmbryoSurvival')}</td>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {data?.content.map((measureItem: ApiMeasurementItem, i: number) => (
                <tr key={measureItem.id} className="hover">
                  <th className="pl-[28px]">{i + 1}</th>
                  <th>{measureItem.tag}</th>
                  <td>{getDateLabel(measureItem.created)}</td>
                  <td className="text-right">{measureItem.weight}</td>
                  <td className="text-right">{measureItem.lengthBody}</td>
                  <td className="text-right">{measureItem.heightBody}</td>
                  <td className="text-right">{measureItem.thicknessOfBack}</td>
                  <td className="text-right">{measureItem.weightOfEggs}</td>
                  <td className="text-right">{measureItem.weightOfSingleEgg}</td>
                  <td className="text-right">{round(Number(measureItem.fatnessFactor))}</td>
                  <td className="text-right">{round(Number(measureItem.thickFactor))}</td>
                  <td className="text-right">{measureItem.runnabilityIndex}</td>
                  <td className="text-right">{round(Number(measureItem.headFactor))}</td>
                  <td className="text-right">{round(Number(measureItem.caviarProportion))}</td>
                  <td className="text-right">{measureItem.workingFertility}</td>
                  <td className="text-right">{measureItem.relativeFecundity}</td>
                  <td className="text-right">{measureItem.reproductiveIndex}</td>
                  <td className="text-right">{measureItem.percentOfDeathToThePeephole}</td>
                  <td className="text-right">{measureItem.percentOfDeathAfterThePeephole}</td>
                  <td className="text-right">{measureItem.percentOfEggFertilization}</td>
                  <td className="text-right">{measureItem.percentOfEmbryoSurvival}</td>
                  <th className="pr-[28px]">{i + 1}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
