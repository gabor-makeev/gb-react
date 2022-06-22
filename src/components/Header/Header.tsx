import { FC } from 'react';
import { NavigationItem } from '../../default-types';
import { NavLink } from 'react-router-dom';
import style from './Header.module.scss';

interface HeaderProps {
  navigations: NavigationItem[];
}

export const Header: FC<HeaderProps> = ({ navigations }) => {
  return (
    <header className={style.header}>
      <ul className={style['header__ul']}>
        {navigations.map((navigation) => (
          <li key={navigation.id} className={style['header__li']}>
            <NavLink
              to={navigation.path}
              style={({ isActive }) => ({
                color: isActive ? 'white' : 'grey',
              })}
            >
              {navigation.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
};
