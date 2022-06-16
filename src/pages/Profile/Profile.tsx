import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from 'store/profile/reducer';
import { changeName, togglePublic } from 'store/profile/actions';

export const Profile: FC = () => {
  const name = useSelector((state: ProfileState) => state.user.name);
  const isPublic = useSelector((state: ProfileState) => state.isPublic);

  const dispatch = useDispatch();

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
    </>
  );
};
