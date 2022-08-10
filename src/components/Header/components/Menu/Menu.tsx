import { FC, useState } from 'react';
import style from './Menu.module.scss';
import { NavLink } from 'react-router-dom';
import { NavigationItem } from 'src/default-types';
import classNames from 'classnames';

interface MenuProps {
  navigations: NavigationItem[];
}

export const Menu: FC<MenuProps> = ({ navigations }) => {
  const [mobileMenuState, setMobileMenuState] = useState(false);

  const mobileMenuClasslist = classNames(style['nav__menu'], {
    [style['nav__menu__mobile-active']]: mobileMenuState,
  });

  const mobileMenuButtonClasslist = classNames(style['nav__menu-button'], {
    [style['nav__menu-button__mobile-active']]: mobileMenuState,
  });

  const getNavLinkClasslist = (isActive = false) => {
    return classNames(style['nav__menu__item__navlink'], {
      [style['nav__menu__item__navlink-active']]: isActive,
    });
  };

  return (
    <nav className={style['nav']}>
      <button
        className={mobileMenuButtonClasslist}
        onClick={() => setMobileMenuState(!mobileMenuState)}
      >
        Menu
      </button>
      <ul className={mobileMenuClasslist}>
        {navigations.map((navigation) => (
          <li key={navigation.id} className={style['nav__menu__item']}>
            <NavLink
              to={navigation.path}
              onClick={() => setMobileMenuState(false)}
              className={({ isActive }) => getNavLinkClasslist(isActive)}
            >
              {navigation.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
