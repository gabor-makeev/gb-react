import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BasePageTemplate } from 'src/templates/BasePageTemplate/BasePageTemplate';
import { Main } from 'src/pages/Main/Main';
import { Messenger } from 'src/pages/Messenger/Messenger';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SignIn } from 'src/pages/SignIn/SignIn';
import { PrivateRoute } from 'components/PrivateRoute';
import { PublicRoute } from 'components/PublicRoute';
import { SignUp } from 'src/pages/SignUp/SignUp';
import { setAuth, setIsAuthLoading } from 'store/profile/slice';
import { AuthService } from 'src/services/firebase/Service/AuthService';
import { BASE_URL } from 'src/constants';

export const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = AuthService.firebaseAuth.onAuthStateChanged((user) => {
      dispatch(setIsAuthLoading(true));

      if (user) {
        dispatch(setAuth(true));
      } else {
        dispatch(setAuth(false));
      }
      dispatch(setIsAuthLoading(false));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={BASE_URL} element={<BasePageTemplate />}>
          <Route index element={<Main />} />
          <Route
            path={`${BASE_URL}signin`}
            element={<PublicRoute component={<SignIn />} />}
          />
          <Route
            path={`${BASE_URL}signup`}
            element={<PublicRoute component={<SignUp />} />}
          />
          <Route path={`${BASE_URL}messenger`} element={<PrivateRoute />}>
            <Route index element={<Messenger />} />
            <Route path=":chatId" element={<Messenger />} />
          </Route>
        </Route>
        <Route path="*" element={<h2>404</h2>} />
      </Routes>
    </BrowserRouter>
  );
};
