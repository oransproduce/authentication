import axios from 'axios';

const signin = (username, password) => axios.post('/auth/login', { username, password })
  .then(({ data }) => data)
  .catch((err) => {
    console.log(err);
  });
const signout = () => axios.delete('/auth/logout');

export default {
  signin,
  signout,
};
