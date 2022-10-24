import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'store/profile/selectors';
import { Navigate, Outlet } from 'react-router-dom';
import { BASE_URL } from 'src/constants';

interface PublicRouteProps {
  component?: JSX.Element;
}

export const PublicRoute: FC<PublicRouteProps> = ({ component }) => {
  const isAuth = useSelector(selectIsAuth);

  if (isAuth) {
    return <Navigate to={BASE_URL} replace />;
  }

  return component ? component : <Outlet />;
};
