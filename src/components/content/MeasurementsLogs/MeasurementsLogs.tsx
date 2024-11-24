import { useQuery } from '@tanstack/react-query';
import { ApiMeasurementItem, getDateLabel } from './helpers';
import { labelsByNamePathDict } from '@/constants';
import { round } from '@/components/utils/round';
import { MOCKED_GRADES } from './mocked-grades';

export const MeasurementsLogs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['log'],
    queryFn: async () => {
      try {
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
              {data.content.map((measureItem: ApiMeasurementItem, i: number) => (
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
                  <td className="text-right">{round(Number(measureItem.runnabilityIndex))}</td>
                  <td className="text-right">{round(Number(measureItem.headFactor))}</td>
                  <td className="text-right">{round(Number(measureItem.caviarProportion))}</td>
                  <td className="text-right">{measureItem.workingFertility || 0}</td>
                  <td className="text-right">{measureItem.relativeFecundity || 0}</td>
                  <td className="text-right">{measureItem.reproductiveIndex || 0}</td>
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
