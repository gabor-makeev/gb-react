import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from 'store/profile/slice';

export const SignIn: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    if (login === 'gb' && password === 'gb') {
      dispatch(setAuth(true));
      navigate('/', { replace: true });
    } else {
      setError(true);
    }
  };

  return (
    <>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Login:</p>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </label>
        <label>
          <p>Password:</p>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Log in</button>
      </form>
      {error && <p>Invalid credentials</p>}
    </>
  );
};
