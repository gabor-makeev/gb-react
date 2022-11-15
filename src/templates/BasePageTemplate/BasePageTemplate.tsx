import { Header } from 'components/Header/Header';
import { NAVIGATION } from 'src/constants';
import { Outlet } from 'react-router-dom';
import { ProfileWindow } from 'components/ProfileWindow/ProfileWindow';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthLoading } from 'store/profile/selectors';
import { Loader } from 'components/global/Loader/Loader';

export const BasePageTemplate = () => {
  const [profileWindowState, setProfileWindowState] = useState(false);
  const isAuthLoading = useSelector(selectIsAuthLoading);

  const toggleProfileWindowState = () => {
    setProfileWindowState(!profileWindowState);
  };

  return (
    <>
      <Header
        navigations={NAVIGATION}
        toggleProfileWindowState={toggleProfileWindowState}
      />
      {profileWindowState && (
        <ProfileWindow toggleProfileWindowState={toggleProfileWindowState} />
      )}
      <main style={{ paddingTop: '116px' }}>
        {isAuthLoading && <Loader />}
        <Outlet />
      </main>
    </>
  );
};
