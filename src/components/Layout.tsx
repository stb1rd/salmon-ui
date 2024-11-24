import { ReactNode } from 'react';
import WaterIcon from '@mui/icons-material/Water';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import Head from 'next/head';

const MENU = [
  { label: 'Журнал', href: '/log' },
  { label: 'Отчет', href: '/report' },
  { label: 'Новая оценка', href: '/new-bonitet' },
];

export const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Head>
      <title>{process.env.NODE_ENV === 'development' ? '⚙️ ' : ''}Форель для всех</title>
    </Head>
    <header className="flex gap-2 justify-between p-2 bg-white dark:bg-black sticky top-0 z-10 max-w-[1384px] mx-auto">
      <Link href="/" className="flex gap-2 items-center btn btn-link no-underline hover:no-underline">
        <WaterIcon style={{ color: '#444', fontSize: 32 }} />
        <span className="text-xl text-foreground font-serif">форель для всех</span>
        <WaterIcon style={{ color: '#444', fontSize: 32 }} />
      </Link>
      <nav className="gap-1 hidden md:flex">
        {MENU.map((x) => (
          <Link key={x.href} className="btn btn-link" href={x.href}>
            {x.label}
          </Link>
        ))}
      </nav>
      <div className="dropdown dropdown-end md:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
          <MenuIcon />
        </div>
        <nav tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box mt-4 w-52 p-2 shadow gap-1">
          {MENU.map((x) => (
            <li key={x.href}>
              <Link className="btn" href={x.href}>
                {x.label}
              </Link>
            </li>
          ))}
        </nav>
      </div>
    </header>
    <main className="px-7 py-2 mt-8 max-w-[1384px] mx-auto">{children}</main>
  </>
);
