import React, { useEffect } from 'react';
import {
  BrowserRouter, Link, Route, Switch,
} from 'react-router-dom';
import Public from './Public';
import Protected from './Protected';
import Signup from './Signup';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import AuthRoute from './AuthRoute';
import LogoutButton from './LogoutButton';
import { useAuth } from '../hooks';

export default function App() {
  const auth = useAuth();
  useEffect(auth.checkLogin, []);
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/public">public</Link>
        </li>
        <li>
          <Link to="/protected">protected</Link>
        </li>
        <li>
          <Link to="/signup">signup</Link>
        </li>
        <li>
          <Link to="/login">login</Link>
        </li>
      </ul>
      <LogoutButton />
      <Switch>
        <Route path="/public">
          <Public />
        </Route>
        <PrivateRoute path="/protected">
          <Protected />
        </PrivateRoute>
        <AuthRoute path="/signup">
          <Signup />
        </AuthRoute>
        <AuthRoute path="/login">
          <Login />
        </AuthRoute>
      </Switch>
    </BrowserRouter>
  );
}
