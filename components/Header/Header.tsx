import Link from 'next/link';
import { AuthNavigation } from '../AuthNavigation/AuthNavigation'; 
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" className={css.logo} aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/" className={css.link}>Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all" className={css.link}>Notes</Link> 
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}