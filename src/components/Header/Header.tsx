import { FC } from 'react';
import { NavigationItem } from 'src/default-types';
import { NavLink } from 'react-router-dom';
import style from './styles/Header.module.scss';
import { Menu } from 'components/Header/components/Menu/Menu';

interface HeaderProps {
  navigations: NavigationItem[];
}

export const Header: FC<HeaderProps> = ({ navigations }) => {
  return (
    <header className={style.header}>
      <div className={style['header__container']}>
        <NavLink to={'/'}>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className={style['header__logo']}
          >
            <path d="M20 2H4c-1.103 0-2 .894-2 1.992v12.016C2 17.106 2.897 18 4 18h3v4l6.351-4H20c1.103 0 2-.894 2-1.992V3.992A1.998 1.998 0 0 0 20 2zm-6 11H7v-2h7v2zm3-4H7V7h10v2z" />
          </svg>
        </NavLink>
        <Menu navigations={navigations} />
        <NavLink to={'/profile'} className={style['header__profile-link']}>
          <svg
            width="28"
            height="34"
            viewBox="0 0 28 34"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.8233 9.15167C22.8233 14.0467 18.8985 17.9718 14 17.9718C9.10312 17.9718 5.17665 14.0467 5.17665 9.15167C5.17665 4.25662 9.10312 0.333252 14 0.333252C18.8985 0.333252 22.8233 4.25662 22.8233 9.15167ZM14 33.6666C6.77058 33.6666 0.666626 32.4916 0.666626 27.9582C0.666626 23.4231 6.80893 22.2898 14 22.2898C21.231 22.2898 27.3333 23.4648 27.3333 27.9982C27.3333 32.5332 21.191 33.6666 14 33.6666Z"
            />
          </svg>
          <span>Profile</span>
        </NavLink>
      </div>
    </header>
  );
};
