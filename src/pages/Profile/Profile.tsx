import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  initProfileTracking,
  setIsPublicWithFirebase,
} from 'store/profile/slice';
import { selectIsPublic } from 'store/profile/selectors';
import { getAuth, updateProfile } from 'firebase/auth';

export const Profile: FC = () => {
  const [newNameInputValue, setNewNameInputValue] = useState<string>('');

  const user = getAuth().currentUser;
  const isPublic = useSelector(selectIsPublic);
  const userName = user?.displayName;

  const dispatch = useDispatch() as any;

  useEffect(() => {
    dispatch(initProfileTracking());
  }, []);

  const changeName = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (newNameInputValue && user) {
      await updateProfile(user, {
        displayName: newNameInputValue,
      });

      setNewNameInputValue('');
    }
  };

  const toggleIsPublic = () => {
    dispatch(setIsPublicWithFirebase(!isPublic));
  };

  return (
    <>
      <h2>Profile page</h2>
      <label htmlFor={'isPublic'}>
        Is profile public? — {isPublic ? 'Yes' : 'No'}
      </label>
      <p>
        <input
          id={'isPublic'}
          type="checkbox"
          checked={isPublic}
          onChange={toggleIsPublic}
        />
      </p>
      <h3>The user&apos;s name: {userName}</h3>
      <form onSubmit={changeName}>
        <label>
          Enter new name:
          <input
            type="text"
            onChange={(e) => setNewNameInputValue(e.target.value)}
            value={newNameInputValue}
          />
        </label>
        <button>Change name</button>
      </form>
    </>
  );
};
