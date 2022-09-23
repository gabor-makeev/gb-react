import { FC } from 'react';
import { NavigationItem } from 'src/default-types';
import style from './Header.module.scss';
import { Menu } from 'components/Header/components/Menu/Menu';
import { Logo } from 'components/Header/components/Logo/Logo';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'store/profile/selectors';
import { ProfileButton } from 'components/Header/components/ProfileButton/ProfileButton';
import { LogInLink } from 'components/Header/components/LogInLink/LogInLink';

interface HeaderProps {
  navigations: NavigationItem[];
  toggleProfileWindowState: () => void;
}

export const Header: FC<HeaderProps> = ({
  navigations,
  toggleProfileWindowState,
}) => {
  const isLoggedIn = useSelector(selectIsAuth);

  return (
    <header className={style.header}>
      <div className={style['header__container']}>
        <Logo />
        <Menu navigations={navigations} />
        {isLoggedIn ? (
          <ProfileButton toggleProfileWindowState={toggleProfileWindowState} />
        ) : (
          <LogInLink />
        )}
      </div>
    </header>
  );
};
