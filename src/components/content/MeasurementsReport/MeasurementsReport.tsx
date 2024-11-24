import { useQuery } from '@tanstack/react-query';
import { labelsByNamePathDict } from '@/constants';
import { round } from '@/components/utils/round';
import { MOCKED_GRADE } from './mocks';
import { FishItem, ReportItem } from './helpers';
import { spellPlurals } from '@/components/utils/spellPlurals';
import Link from 'next/link';

export const MeasurementsReports = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['grade'],
    queryFn: async () => {
      try {
        const response = await fetch('http://194.87.131.215:8080/report/grade');
        return await response.json();
      } catch (error) {
        console.error(error);
        return MOCKED_GRADE;
      }
    },
  });

  const isDataEmpty = !data;
  const shouldRenderIsLoading = isLoading && isDataEmpty;
  const shouldRenderDataEmpty = !isLoading && isDataEmpty;
  const shouldRenderData = (!isLoading && !isDataEmpty) || (isLoading && !isDataEmpty);

  const rows: ReportItem[] = [];
  if (shouldRenderData) {
    rows.push({
      type: 'Средние показатели',
      ...data.averageReport,
    });
    rows.push({
      type: 'Максимальные показатели',
      ...data.maximumReport,
    });
    rows.push({
      type: 'Минимальные показатели',
      ...data.minimumReport,
    });
    rows.push({
      type: 'Сигма показатели',
      ...data.sigmaReport,
    });
    rows.push({
      type: 'Количество ошибок',
      ...data.errorReport,
    });
    rows.push({
      type: 'CV показатели',
      ...data.cvReport,
    });
    rows.push({
      type: '1 класс от',
      color: 'yellow',
      ...data.yellowBoundValues.minimumBounds,
    });
    rows.push({
      type: 'Элита от',
      color: 'red',
      ...data.redBoundValues.minimumBounds,
    });
  }

  return (
    <>
      <h2 className="text-3xl">Отчет по выклеву самок 4-9 апреля 2024</h2>
      {shouldRenderIsLoading && <span className="loading loading-spinner" />}
      {shouldRenderDataEmpty && <span>Ничего не найдено</span>}
      {shouldRenderData && (
        <>
          <div className="flex gap-1 mt-8 flex-col items-start">
            <div className="flex bg-yellow-200 p-1 items-center gap-2">
              <div className="flex text-l">
                1 класс – всего
                <span className="ml-2">
                  {data.yellowBoundValues.fishCharacteristics.length}{' '}
                  {spellPlurals(data.yellowBoundValues.fishCharacteristics.length, 'самка', 'самки', 'самок')}, в том
                  числе
                </span>
              </div>
              {data.yellowBoundValues.fishCharacteristics.slice(500, 503).map((fishItem: FishItem) => (
                <span className="badge">{`id: ${fishItem.id}, ${labelsByNamePathDict
                  .get(fishItem.fieldName)
                  ?.toLowerCase()}: ${round(fishItem.value)}`}</span>
              ))}
              <span className="text-sm">
                <Link href="/log" className="btn btn-link btn-xs">
                  Подробнее
                </Link>
              </span>
            </div>
            <div className="flex bg-red-200 p-1 items-center gap-2">
              <div className="flex text-l">
                Элита – всего
                <span className="ml-2">
                  {data.redBoundValues.fishCharacteristics.length}{' '}
                  {spellPlurals(data.redBoundValues.fishCharacteristics.length, 'самка', 'самки', 'самок')}, в том числе
                </span>
              </div>
              {data.redBoundValues.fishCharacteristics.slice(10, 13).map((fishItem: FishItem) => (
                <span className="badge">{`id: ${fishItem.id}, ${labelsByNamePathDict
                  .get(fishItem.fieldName)
                  ?.toLowerCase()}: ${round(fishItem.value)}`}</span>
              ))}
              <span className="text-sm">
                <Link href="/log" className="btn btn-link btn-xs">
                  Подробнее
                </Link>
              </span>
            </div>
          </div>
          <div
            className="overflow-x-auto mt-4"
            // style={{ maxHeight: 'calc(100vh - 164px)', width: '100vw', margin: '0 -28px' }}
            style={{ maxHeight: 'calc(100vh - 164px)', width: '100vw', margin: '0 -56px' }}
          >
            <table className="table table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th className="whitespace-pre-wrap pr-0 pl-[28px]">Тип</th>
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
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.type}
                    className={`${row.color === 'yellow' ? 'bg-yellow-200' : 'hover'} ${
                      row.color === 'red' ? 'bg-red-200' : 'hover'
                    }`}
                  >
                    <th className="pl-[28px]">{row.type}</th>
                    <td className="text-right">{round(Number(row.weight))}</td>
                    <td className="text-right">{round(Number(row.lengthBody))}</td>
                    <td className="text-right">{round(Number(row.heightBody))}</td>
                    <td className="text-right">{round(Number(row.thicknessOfBack))}</td>
                    <td className="text-right">{round(Number(row.weightOfEggs))}</td>
                    <td className="text-right">{round(Number(row.weightOfSingleEgg))}</td>
                    <td className="text-right">{round(Number(row.fatnessFactor))}</td>
                    <td className="text-right">{round(Number(row.thickFactor))}</td>
                    <td className="text-right">{round(Number(row.runnabilityIndex))}</td>
                    <td className="text-right">{round(Number(row.headFactor))}</td>
                    <td className="text-right">{round(Number(row.caviarProportion))}</td>
                    <td className="text-right">{round(Number(row.workingFertility))}</td>
                    <td className="text-right">{round(Number(row.relativeFecundity))}</td>
                    <td className="text-right">{round(Number(row.reproductiveIndex))}</td>
                    <td className="text-right">{round(Number(row.percentOfDeathToThePeephole))}</td>
                    <td className="text-right">{round(Number(row.percentOfDeathAfterThePeephole))}</td>
                    <td className="text-right">{round(Number(row.percentOfEggFertilization))}</td>
                    <td className="text-right pr-[28px]">{round(Number(row.percentOfEmbryoSurvival))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};
