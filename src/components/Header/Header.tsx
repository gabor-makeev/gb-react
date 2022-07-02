import { FC } from 'react';
import { NavigationItem } from 'src/default-types';
import { NavLink, useNavigate } from 'react-router-dom';
import style from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from 'store/profile/selectors';
import { setAuth } from 'store/profile/slice';

interface HeaderProps {
  navigations: NavigationItem[];
}

export const Header: FC<HeaderProps> = ({ navigations }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const handleLogin = () => {
    navigate('/signin', { replace: true });
  };

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
      {isAuth && (
        <button onClick={() => dispatch(setAuth(false))}>Log out</button>
      )}
      {!isAuth && <button onClick={handleLogin}>Log in</button>}
    </header>
  );
};
