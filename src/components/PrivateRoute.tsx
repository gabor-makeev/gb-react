import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth, selectIsAuthLoading } from 'store/profile/selectors';
import { BASE_URL } from 'src/constants';

interface PrivateRouteProps {
  component?: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ component }) => {
  const isAuth = useSelector(selectIsAuth);
  const isAuthLoading = useSelector(selectIsAuthLoading);

  if (!isAuthLoading && !isAuth) {
    return <Navigate to={`${BASE_URL}signin`} replace />;
  }

  return !isAuthLoading && isAuth && component ? component : <Outlet />;
};
