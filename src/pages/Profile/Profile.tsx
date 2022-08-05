import React, { FC, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { setDoc, Timestamp } from 'firebase/firestore';
import { getUserDocRef } from 'src/services/firebase/refs';
import { UserProperties } from 'src/default-types';
import { subscribeToUserProperties } from 'src/services/firebase/users';

export const Profile: FC = () => {
  const [newNameInputValue, setNewNameInputValue] = useState<string>('');
  const [userProperties, setUserProperties] = useState<UserProperties>({
    chats: [],
    createdAt: Timestamp.now(),
    isPublic: false,
    name: '',
    email: '',
  });

  const userEmail = getAuth().currentUser?.email as string;

  useEffect(() => {
    return subscribeToUserProperties(setUserProperties);
  }, []);

  const changeName = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (newNameInputValue) {
      setDoc(
        getUserDocRef(userEmail),
        {
          name: newNameInputValue,
        },
        { merge: true }
      );

      setNewNameInputValue('');
    }
  };

  const toggleIsPublic = () => {
    setDoc(
      getUserDocRef(userEmail),
      {
        isPublic: !userProperties.isPublic,
      },
      { merge: true }
    );
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
        {userProperties.name ? (
          userProperties.name
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
