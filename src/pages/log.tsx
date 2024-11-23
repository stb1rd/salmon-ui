import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ['log'],
    queryFn: async () => {
      const response = await fetch('http://194.87.131.215:8080/trout/rest/selects_grading');
      return await response.json();
    },
  });

  console.log('data', data);

  if (isLoading) {
    <span className="loading loading-spinner"></span>;
  }

  if (!data || data.content.length === 0) {
    return <p>Ничего не найдено</p>;
  }

  return (
    <>
      <h2 className="text-3xl">Оценка показателей</h2>
      {data.content.map((x, i) => (
        <pre key={i}>{JSON.stringify(x, null, ' ')}</pre>
      ))}
    </>
  );
}
