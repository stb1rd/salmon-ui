import Link from 'next/link';

export default function Home() {
  return (
    <div className="hero py-10">
      <div className="hero-content text-center flex flex-col">
        <p className="mt-3 max-w-xl">
          <h1 className="font-serif text-2xl inline-block">форель для всех</h1> - это сервис для оценки племенной
          ценности радужной форели. Большинство систем находится в активной разработке
        </p>
        <p className="mt-6">Доступный функционал</p>
        <div className="flex gap-2">
          <Link href="/log" className="btn btn-primary">
            Просмотреть журнал оценок
          </Link>
          <Link href="/report" className="btn btn-primary">
            Просмотреть отчет по оценкам
          </Link>
          <Link href="/new-bonitet" className="btn btn-primary">
            Начать оценку
          </Link>
        </div>
      </div>
    </div>
  );
}
