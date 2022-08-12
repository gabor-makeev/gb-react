import { FC } from 'react';
import { NavigationItem } from 'src/default-types';
import style from './Header.module.scss';
import { Menu } from 'components/Header/components/Menu/Menu';
import { ProfileLink } from 'components/Header/components/ProfileLink/ProfileLink';
import { Logo } from 'components/Header/components/Logo/Logo';

interface HeaderProps {
  navigations: NavigationItem[];
}

export const Header: FC<HeaderProps> = ({ navigations }) => {
  return (
    <header className={style.header}>
      <div className={style['header__container']}>
        <Logo />
        <Menu navigations={navigations} />
        <ProfileLink />
      </div>
    </header>
  );
};
