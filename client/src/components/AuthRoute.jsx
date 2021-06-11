import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks';

export default function AuthRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
    // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      render={({ location }) => (!auth.user ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: 'protected',
            state: {
              from: location,
            },
          }}
        />
      ))}
    />
  );
}
