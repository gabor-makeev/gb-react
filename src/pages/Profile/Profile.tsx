import React, { FC, useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { onSnapshot, setDoc } from 'firebase/firestore';
import { getUserDocRef } from 'src/services/firebase/refs';
import { UserProperties } from 'src/default-types';

export const Profile: FC = () => {
  const [newNameInputValue, setNewNameInputValue] = useState<string>('');
  const [userProperties, setUserProperties] = useState<UserProperties>({
    createdAt: Date.now(),
    isPublic: false,
  });

  const user = getAuth().currentUser;
  const userName = user?.displayName;

  useEffect(() => {
    if (user?.email) {
      const unsubscribe = onSnapshot(getUserDocRef(user.email), async (doc) => {
        const dataSnapshot = await doc.data();
        if (dataSnapshot) {
          setUserProperties(dataSnapshot as UserProperties);
        }
      });

      return unsubscribe;
    }
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
    if (user?.email) {
      setDoc(
        getUserDocRef(user.email),
        {
          isPublic: !userProperties.isPublic,
        },
        { merge: true }
      );
    }
  };

  return (
    <>
      <h2>Profile page</h2>
      <label htmlFor={'isPublic'}>
        Is profile public? — {userProperties.isPublic ? 'Yes' : 'No'}
      </label>
      <p>
        <input
          id={'isPublic'}
          type="checkbox"
          checked={userProperties.isPublic}
          onChange={toggleIsPublic}
        />
      </p>
      <h3>
        The user&apos;s name:{' '}
        {userName ? (
          userName
        ) : (
          <span style={{ color: 'red' }}>No name provided</span>
        )}
      </h3>
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
