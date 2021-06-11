import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks';

export default function Signup() {
  const auth = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleChange = (e) => {
    const { name } = e.target;
    if (name === 'username') {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    auth.signup(username, password, () => {
      setUsername('');
      setPassword('');
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
