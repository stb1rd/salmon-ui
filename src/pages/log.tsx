import { useQuery } from '@tanstack/react-query';

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

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['log'],
    queryFn: async () => {
      // return MOCKED_GRADES;
      const response = await fetch('http://194.87.131.215:8080/trout/rest/selects_grading');
      return await response.json();
    },
  });

  if (isLoading) {
    <span className="loading loading-spinner"></span>;
  }

  if (!data || data.content.length === 0) {
    return <p>Ничего не найдено</p>;
  }

  return (
    <>
      <h2 className="text-3xl">Оценка показателей</h2>
      {data.content.map((x: string, i: number) => (
        <pre className="text-xs" key={i}>
          {JSON.stringify(x, null, ' ')}
        </pre>
      ))}
    </>
  );
}
