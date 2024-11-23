import Link from 'next/link';

export default function Home() {
  return (
    <div className="hero py-10">
      <div className="hero-content text-center flex flex-col">
        <h1 className="text-3xl font-bold">Раздел в разработке</h1>
        <p className="py-3">Скоро желаемый функционал будет реализован</p>
        <Link href="/" className="btn btn-primary">
          На главную
        </Link>
      </div>
    </div>
  );
}
