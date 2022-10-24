import { FC } from 'react';
import style from './Logo.module.scss';
import { NavLink } from 'react-router-dom';
import { BASE_URL } from 'src/constants';

export const Logo: FC = () => {
  return (
    <NavLink to={BASE_URL}>
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={style.logo}
      >
        <path d="M20 2H4c-1.103 0-2 .894-2 1.992v12.016C2 17.106 2.897 18 4 18h3v4l6.351-4H20c1.103 0 2-.894 2-1.992V3.992A1.998 1.998 0 0 0 20 2zm-6 11H7v-2h7v2zm3-4H7V7h10v2z" />
      </svg>
    </NavLink>
  );
};
