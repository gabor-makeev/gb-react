import React, { FC, useState } from 'react';
import { signUp } from 'src/services/firebase/auth';
import { useNavigate } from 'react-router-dom';

export const SignUp: FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      await signUp(name, email, password);
      navigate('/signin', { replace: true });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <h2>Sign Up</h2>
      {loading && <p>Loading</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>Name:</p>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
        <button>Sign up</button>
      </form>
    </>
  );
};
