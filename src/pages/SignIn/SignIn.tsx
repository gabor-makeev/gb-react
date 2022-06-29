import { FC, useState } from 'react';

export const SignIn: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <h2>Sign in</h2>
      <form>
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
    </>
  );
};
