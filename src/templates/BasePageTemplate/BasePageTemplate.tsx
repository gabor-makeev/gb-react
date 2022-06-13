import { Header } from 'components/Header/Header';
import { NAVIGATION } from 'src/constants';
import { Outlet } from 'react-router-dom';

export const BasePageTemplate = () => {
  return (
    <>
      <Header navigations={NAVIGATION} />
      <main>
        <Outlet />
      </main>
    </>
  );
};
