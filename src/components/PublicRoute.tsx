import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectIsAuthLoading } from 'store/profile/selectors';
import { Navigate, Outlet } from 'react-router-dom';
import { BASE_URL } from 'src/constants';

interface PublicRouteProps {
  component?: JSX.Element;
}

export const PublicRoute: FC<PublicRouteProps> = ({ component }) => {
  const isAuth = useSelector(selectIsAuth);
  const isAuthLoading = useSelector(selectIsAuthLoading);

  if (!isAuthLoading && isAuth) {
    return <Navigate to={BASE_URL} replace />;
  }

  return !isAuthLoading && !isAuth && component ? component : <Outlet />;
};
