import React, { createContext } from 'react';
import { useProvideAuth, authContext } from '../hooks';

export default function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}
