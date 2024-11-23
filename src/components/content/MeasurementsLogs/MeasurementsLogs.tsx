import { useQuery } from '@tanstack/react-query';
import { ApiMeasurementItem } from './helpers';

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

export const MeasurementsLogs = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['log'],
    queryFn: async () => {
      // return MOCKED_GRADES;
      const response = await fetch('http://194.87.131.215:8080/trout/rest/selects_grading?size=1000');
      return await response.json();
    },
  });

  const isDataEmpty = !data || data.content.length === 0;
  const shouldRenderIsLoading = isLoading && isDataEmpty;
  const shouldRenderDataEmpty = !isLoading && isDataEmpty;
  const shouldRenderData = (!isLoading && !isDataEmpty) || (isLoading && !isDataEmpty);

  return (
    <>
      <h2 className="text-3xl mb-4">Журнал оценок</h2>
      {shouldRenderIsLoading && <span className="loading loading-spinner" />}
      {shouldRenderDataEmpty && <span>Ничего не найдено</span>}
      {shouldRenderData && (
        <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 164px)' }}>
          <table className="table table-pin-rows">
            <thead>
              <tr>
                <th className="px-0" colSpan={2}>
                  Метка
                  <br />
                  (идентификатор)
                </th>
                <th>
                  Дата
                  <br />
                  оценки
                </th>
                <th>Вес</th>
                <th>Пол</th>
              </tr>
            </thead>
            <tbody>
              {data?.content.map((measureItem: ApiMeasurementItem, i: number) => (
                <tr key={measureItem.id}>
                  <td className="px-0">{i + 1}</td>
                  <td>{measureItem.tag}</td>
                  <td>{getDateLabel(measureItem.created)}</td>
                  <td>{measureItem.weight}</td>
                  <td>{measureItem.gender === 'male' ? 'Самец' : measureItem.gender === 'female' ? 'Самка' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
