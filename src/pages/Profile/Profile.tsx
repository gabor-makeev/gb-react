import React, { FC, useState } from 'react';

interface ProfileProps {
  userProfile: {
    name: string;
    isPublic: boolean;
  };
  toggleUserIsPublic: () => void;
  changeUserName: (newUserName: string) => void;
}

export const Profile: FC<ProfileProps> = ({
  userProfile,
  toggleUserIsPublic,
  changeUserName,
}) => {
  const [newNameInputValue, setNewNameInputValue] = useState<string>('');

  const handleChangeName = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (newNameInputValue) {
      changeUserName(newNameInputValue);
      setNewNameInputValue('');
    }
  };

  return (
    <>
      <h2>Profile page</h2>
      <label htmlFor={'isPublic'}>
        Is profile public? — {userProfile.isPublic ? 'Yes' : 'No'}
      </label>
      <p>
        <input
          id={'isPublic'}
          type="checkbox"
          checked={userProfile.isPublic}
          onChange={toggleUserIsPublic}
        />
      </p>
      <h3>The user&apos;s name: {userProfile.name}</h3>
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
