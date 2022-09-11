import { FC } from 'react';
import { NavigationItem } from 'src/default-types';
import style from './Header.module.scss';
import { Menu } from 'components/Header/components/Menu/Menu';
import { Logo } from 'components/Header/components/Logo/Logo';
import { LinkWithSvg } from 'components/Header/components/LinkWithSvg/LinkWithSvg';
import { profileSvg } from 'svg/profileSvg';
import { signInSvg } from 'svg/signInSvg';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'store/profile/selectors';

interface HeaderProps {
  navigations: NavigationItem[];
}

export const Header: FC<HeaderProps> = ({ navigations }) => {
  const isLoggedIn = useSelector(selectIsAuth);

  return (
    <header className={style.header}>
      <div className={style['header__container']}>
        <Logo />
        <Menu navigations={navigations} />
        {isLoggedIn ? (
          <LinkWithSvg to={'/profile'} svg={profileSvg}>
            Profile
          </LinkWithSvg>
        ) : (
          <LinkWithSvg to={'/signin'} svg={signInSvg}>
            Log in
          </LinkWithSvg>
        )}
      </div>
    </header>
  );
};
