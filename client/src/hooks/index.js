import { useState, useContext, createContext } from 'react';
import authentication from '../helpers/authentication.js';
import axios from 'axios';

export const authContext = createContext();
export const useAuth = () => useContext(authContext);

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const signin = (username, password, cb) => {
    authentication.signin(username, password).then((user) => {
      setUser(user);
      cb();
    }).catch((err) => {
      console.log(err);
    });
  };
  const signout = (cb) => {
    authentication.signout().then(() => {
      setUser(null);
      cb();
    }).catch((err) => {
      console.log(err);
    });
  };
  const checkLogin = (cb) => {
    axios.get('/auth/loggedin').then(({ data }) => {
      setUser(data);
      cb();
    }).catch((err) => {
      console.log(err);
    });
  };
  const signup = (username, password, cb) => {
    axios.post('/auth/signup', {
      username, password,
    }).then(({ data }) => {
      setUser(data);
      cb();
    }).catch((err) => {
      console.log(err);
    });
  };
  return {
    user,
    signin,
    signout,
    checkLogin,
    signup,
  };
};
