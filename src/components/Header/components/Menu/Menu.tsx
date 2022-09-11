import { FC, useEffect, useRef, useState, useCallback } from 'react';
import style from './Menu.module.scss';
import { NavigationItem } from 'src/default-types';
import classNames from 'classnames';
import { NavMenuItem } from 'components/Header/components/Menu/components/NavMenuItem/NavMenuItem';

interface MenuProps {
  navigations: NavigationItem[];
}

export const Menu: FC<MenuProps> = ({ navigations }) => {
  const [mobileMenuState, setMobileMenuState] = useState(false);
  const navMenuRef = useRef<HTMLUListElement>(null);

  const mobileMenuButtonClasslist = classNames(style['nav__menu-button'], {
    [style['nav__menu-button__mobile-active']]: mobileMenuState,
  });

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
          <NavMenuItem
            navigation={navigation}
            handleClick={toggleMobileMenu}
            key={navigation.id}
          />
        ))}
      </ul>
    </nav>
  );
};
