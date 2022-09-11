import axios from 'axios';

const authUrl = 'https://webdev.alphacamp.io/api/auth';

export const register = async ({ username, email, password }) => {
  const { data } = await axios.post(`${authUrl}/register`, {
    username,
    email,
    password,
  });

  return data;
};

export const login = async ({ username, password }) => {
  const res = await axios.post(`${authUrl}/login`, {
    username,
    password,
  });

  return res.data;
};

export const logout = () => {
  localStorage.removeItem('authToken');
};

export const checkPermission = async (authToken) => {
  try {
    const res = await axios.get(`${authUrl}/test-token`, {
      headers: {
        Authorization: 'Bearer ' + authToken,
      },
    });

    return res.data.success;
  } catch (error) {
    console.error(error);
  }
};
