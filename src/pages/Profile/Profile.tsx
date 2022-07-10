import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeUserNameWithFirebase,
  setIsPublicWithFirebase,
} from 'store/profile/slice';
import { selectIsPublic, selectUserName } from 'store/profile/selectors';

export const Profile: FC = () => {
  const [newNameInputValue, setNewNameInputValue] = useState<string>('');
  const isPublic = useSelector(selectIsPublic);
  const userName = useSelector(selectUserName);

  const dispatch = useDispatch() as any;

  const changeName = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (newNameInputValue) {
      dispatch(changeUserNameWithFirebase(newNameInputValue));
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
