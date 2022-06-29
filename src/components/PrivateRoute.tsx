import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from 'store/profile/selectors';

interface PrivateRouteProps {
  component?: JSX.Element;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({ component }) => {
  const isAuth = useSelector(selectIsAuth);

  if (!isAuth) {
    return <Navigate to={'/signin'} replace />;
  }

  return component ? component : <Outlet />;
};
