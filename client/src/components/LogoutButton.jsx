import React from 'react';
import { useAuth } from '../hooks';

export default function LogoutButton() {
  const auth = useAuth();
  return (
    <>
      <button type="button" onClick={auth.signout}>Logout</button>
    </>
  );
}
