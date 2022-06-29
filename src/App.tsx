import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BasePageTemplate } from 'src/templates/BasePageTemplate/BasePageTemplate';
import { Main } from 'src/pages/Main/Main';
import { Profile } from 'src/pages/Profile/Profile';
import { Messenger } from 'src/pages/Messenger/Messenger';
import { FC } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from 'src/store';
import { AboutWithConnect } from 'src/pages/About/About';
import { PersistGate } from 'redux-persist/integration/react';
import { Articles } from 'src/pages/Articles/Articles';
import { SignIn } from 'src/pages/SignIn/SignIn';

export const App: FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BasePageTemplate />}>
              <Route index element={<Main />} />
              <Route path="profile" element={<Profile />} />
              <Route path="about" element={<AboutWithConnect />} />
              <Route path="articles" element={<Articles />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="messenger">
                <Route index element={<Messenger />} />
                <Route path=":chatId" element={<Messenger />} />
              </Route>
            </Route>
            <Route path="*" element={<h2>404</h2>} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};
