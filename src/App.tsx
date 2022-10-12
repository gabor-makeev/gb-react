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
import { setAuth } from 'store/profile/slice';
import { AuthService } from 'src/services/firebase/Service/AuthService/AuthService';

export const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = AuthService.firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setAuth(true));
      } else {
        dispatch(setAuth(false));
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasePageTemplate />}>
          <Route index element={<Main />} />
          <Route
            path="signin"
            element={<PublicRoute component={<SignIn />} />}
          />
          <Route
            path="signup"
            element={<PublicRoute component={<SignUp />} />}
          />
          <Route path="messenger" element={<PrivateRoute />}>
            <Route index element={<Messenger />} />
            <Route path=":chatId" element={<Messenger />} />
          </Route>
        </Route>
        <Route path="*" element={<h2>404</h2>} />
      </Routes>
    </BrowserRouter>
  );
};
