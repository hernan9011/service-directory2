import { useRef, useState } from 'react';
import { useAuth } from '../contexts/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/services');
    } catch {
      setError('Failed to log in');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} required placeholder="Email" />
        <input type="password" ref={passwordRef} required placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}