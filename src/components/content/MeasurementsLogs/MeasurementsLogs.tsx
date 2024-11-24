import { useQuery } from '@tanstack/react-query';
import { ApiMeasurementItem, DiapasonItem, getDateLabel } from './helpers';
import { labelsByNamePathDict } from '@/constants';
import { round } from '@/components/utils/round';
import { MOCKED_GRADES } from './mocked-grades';

export const MeasurementsLogs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['log'],
    queryFn: async () => {
      try {
        // throw new Error();
        const response = await fetch('http://194.87.131.215:8080/trout/rest/selects_grading?size=1000&genderIn=female');
        return await response.json();
      } catch (error) {
        console.error(error);
        return MOCKED_GRADES;
      }
    },
  });

  const isDataEmpty = !data || data.content.length === 0;
  const shouldRenderIsLoading = isLoading && isDataEmpty;
  const shouldRenderDataEmpty = !isLoading && isDataEmpty;
  const shouldRenderData = (!isLoading && !isDataEmpty) || (isLoading && !isDataEmpty);

  const getTdBg = (pathName: string, value?: string) => {
    const initialD = (data.diapasons as DiapasonItem[]).find((d) => d.fieldName === pathName);
    if (initialD && Number(value) > initialD.redBound) {
      return 'bg-red-200';
    }
    if (initialD && Number(value) > initialD.yellowBound) {
      return 'bg-yellow-200';
    }
  };

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
                <th className="pr-0 pl-[28px]">#</th>
                <th className="whitespace-pre-wrap">Метка (идентификатор)</th>
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
              {data.content.content.map((measureItem: ApiMeasurementItem, i: number) => (
                <tr key={measureItem.id} className="hover">
                  <th className="pl-[28px]">{i + 1}</th>
                  <th>{measureItem.tag}</th>
                  <td>{getDateLabel(measureItem.created)}</td>
                  <td className={`text-right ${getTdBg('weight', measureItem.weight)}`}>
                    {round(Number(measureItem.weight))}
                  </td>
                  <td className={`text-right ${getTdBg('lengthBody', measureItem.lengthBody)}`}>
                    {round(Number(measureItem.lengthBody))}
                  </td>
                  <td className={`text-right ${getTdBg('heightBody', measureItem.heightBody)}`}>
                    {round(Number(measureItem.heightBody))}
                  </td>
                  <td className={`text-right ${getTdBg('thicknessOfBack', measureItem.thicknessOfBack)}`}>
                    {round(Number(measureItem.thicknessOfBack))}
                  </td>
                  <td className={`text-right ${getTdBg('weightOfEggs', measureItem.weightOfEggs)}`}>
                    {round(Number(measureItem.weightOfEggs))}
                  </td>
                  <td className={`text-right ${getTdBg('weightOfSingleEgg', measureItem.weightOfSingleEgg)}`}>
                    {round(Number(measureItem.weightOfSingleEgg))}
                  </td>
                  <td className={`text-right ${getTdBg('fatnessFactor', measureItem.fatnessFactor)}`}>
                    {round(Number(measureItem.fatnessFactor))}
                  </td>
                  <td className={`text-right ${getTdBg('thickFactor', measureItem.thickFactor)}`}>
                    {round(Number(measureItem.thickFactor))}
                  </td>
                  <td className={`text-right ${getTdBg('runnabilityIndex', measureItem.runnabilityIndex)}`}>
                    {round(Number(measureItem.runnabilityIndex))}
                  </td>
                  <td className={`text-right ${getTdBg('headFactor', measureItem.headFactor)}`}>
                    {round(Number(measureItem.headFactor))}
                  </td>
                  <td className={`text-right ${getTdBg('caviarProportion', measureItem.caviarProportion)}`}>
                    {round(Number(measureItem.caviarProportion))}
                  </td>
                  <td className={`text-right ${getTdBg('workingFertility', measureItem.workingFertility)}`}>
                    {round(Number(measureItem.workingFertility)) || 0}
                  </td>
                  <td className={`text-right ${getTdBg('relativeFecundity', measureItem.relativeFecundity)}`}>
                    {round(Number(measureItem.relativeFecundity)) || 0}
                  </td>
                  <td className={`text-right ${getTdBg('reproductiveIndex', measureItem.reproductiveIndex)}`}>
                    {round(Number(measureItem.reproductiveIndex)) || 0}
                  </td>
                  <td
                    className={`text-right ${getTdBg(
                      'percentOfDeathToThePeephole',
                      measureItem.percentOfDeathToThePeephole
                    )}`}
                  >
                    {round(Number(measureItem.percentOfDeathToThePeephole))}
                  </td>
                  <td
                    className={`text-right ${getTdBg(
                      'percentOfDeathAfterThePeephole',
                      measureItem.percentOfDeathAfterThePeephole
                    )}`}
                  >
                    {round(Number(measureItem.percentOfDeathAfterThePeephole))}
                  </td>
                  <td
                    className={`text-right ${getTdBg(
                      'percentOfEggFertilization',
                      measureItem.percentOfEggFertilization
                    )}`}
                  >
                    {round(Number(measureItem.percentOfEggFertilization))}
                  </td>
                  <td
                    className={`text-right ${getTdBg('percentOfEmbryoSurvival', measureItem.percentOfEmbryoSurvival)}`}
                  >
                    {round(Number(measureItem.percentOfEmbryoSurvival))}
                  </td>
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
