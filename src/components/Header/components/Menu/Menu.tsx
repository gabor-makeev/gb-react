import { FC, useEffect, useRef, useState, useCallback } from 'react';
import style from './Menu.module.scss';
import { NavLink } from 'react-router-dom';
import { NavigationItem } from 'src/default-types';
import classNames from 'classnames';

interface MenuProps {
  navigations: NavigationItem[];
}

export const Menu: FC<MenuProps> = ({ navigations }) => {
  const [mobileMenuState, setMobileMenuState] = useState(false);
  const navMenuRef = useRef<HTMLUListElement>(null);

  const mobileMenuButtonClasslist = classNames(style['nav__menu-button'], {
    [style['nav__menu-button__mobile-active']]: mobileMenuState,
  });

  const getNavLinkClasslist = (linkName: string, isActive = false) => {
    return classNames(
      style['nav__menu__item__navlink'],
      style[`nav__menu__item__navlink-${linkName.toLowerCase()}`],
      {
        [style['nav__menu__item__navlink-active']]: isActive,
      }
    );
  };

  const toggleMobileMenu = useCallback(() => {
    const navMenuClasslist = navMenuRef.current?.classList;

    if (mobileMenuState) {
      navMenuClasslist?.remove(style['nav__menu__mobile-active']);

      setTimeout(() => {
        navMenuClasslist?.remove(style['nav__menu__mobile-before-active']);
      }, 100);
    } else if (!mobileMenuState) {
      navMenuClasslist?.add(style['nav__menu__mobile-before-active']);

      setTimeout(() => {
        navMenuClasslist?.add(style['nav__menu__mobile-active']);
      }, 0);
    }

    setMobileMenuState(!mobileMenuState);
  }, [mobileMenuState]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && mobileMenuState) {
        toggleMobileMenu();
      }
    });
  }, [mobileMenuState, toggleMobileMenu]);

  return (
    <nav className={style['nav']}>
      <button
        className={mobileMenuButtonClasslist}
        onClick={() => toggleMobileMenu()}
      >
        Menu
      </button>
      <ul className={style['nav__menu']} ref={navMenuRef}>
        {navigations.map((navigation) => (
          <li key={navigation.id} className={style['nav__menu__item']}>
            <NavLink
              to={navigation.path}
              onClick={() => toggleMobileMenu()}
              className={({ isActive }) =>
                getNavLinkClasslist(navigation.name, isActive)
              }
            >
              {navigation.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};