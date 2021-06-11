import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks';

export default function Login() {
  const auth = useAuth();
  const history = useHistory();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { from } = location.state || { from: { pathname: '/' } };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.signin(username, password, () => {
      history.replace(from);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username
        <input name="username" value={username} onChange={handleChange} />
      </label>
      <label>
        Password
        <input name="password" type="password" value={password} onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
