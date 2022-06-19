import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, togglePublic } from '../../store/profile/actions';
import { selectIsPublic, selectUserName } from '../../store/profile/selectors';

export const Profile: FC = () => {
  const [newNameInputValue, setNewNameInputValue] = useState<string>('');

  const name = useSelector(selectUserName);
  const isPublic = useSelector(selectIsPublic);

  const dispatch = useDispatch();

  const handleChangeName = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (newNameInputValue) {
      dispatch(changeName(newNameInputValue));
      setNewNameInputValue('');
    }
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
          onChange={() => dispatch(togglePublic())}
        />
      </p>
      <h3>The user&apos;s name: {name}</h3>
      <form onSubmit={handleChangeName}>
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
