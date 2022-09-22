import axios from 'axios';

const authURL = 'https://webdev.alphacamp.io/api/auth';

export const register = async ({ username, email, password }) => {
  const { data } = await axios.post(`${authURL}/register`, {
    username,
    email,
    password,
  });

  return data;
};

export const login = async (data) => {
  const res = await axios.post(`${authURL}/login`, {
    username: data.username,
    password: data.password,
  });

  return res.data;
};

export const logout = () => {
  localStorage.removeItem('authToken');
};
