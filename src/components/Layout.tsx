import { ReactNode } from 'react';
import WaterIcon from '@mui/icons-material/Water';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';

const MENU = [
  { label: 'Журнал', href: '/log' },
  { label: 'Новый бонитет', href: '/new-bonitet' },
  { label: 'Родословные', href: '/lineage' },
];

export const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <header className="flex gap-2 justify-between p-2 bg-white sticky top-0 z-10">
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
    <main className="px-7 py-2">{children}</main>
  </>
);
