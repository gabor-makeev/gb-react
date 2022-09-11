import React, { FC, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { logIn } from 'src/services/firebase/auth';

export const SignIn: FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      await logIn(email, password);
      navigate('/messenger', { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Sign in</h2>
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email:</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <p>Password:</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Log in</button>
      </form>
      <span>
        Do not have an account? —{' '}
        <NavLink to="/signup">Create an account</NavLink>
      </span>
    </>
  );
};
