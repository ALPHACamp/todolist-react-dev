import jwt from 'jsonwebtoken';
import { register, login, logout, checkPermission } from 'api/auth';
import { createContext, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

const defaultAuthContext = {
  isAuthenticated: false,
  authToken: null,
  currentMember: null,
  register: null,
  login: null,
  logout: null,
};

const AuthContext = createContext(defaultAuthContext);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(() => {
    const token = localStorage.getItem('authToken');
    return token ?? null;
  });
  const [payload, setPayload] = useState(null);

  const { pathname } = useLocation();
  useEffect(() => {
    if (!authToken) {
      setPayload(null);
      setIsAuthenticated(false);
    }
    const tempPayload = jwt.decode(authToken);
    if (tempPayload) {
      setPayload(tempPayload);
      setIsAuthenticated(true);
    } else {
      setPayload(null);
      setIsAuthenticated(false);
    }
  }, [authToken]);

  useEffect(() => {
    const currentToken = localStorage.getItem('authToken');
    checkPermission(currentToken)
      .then((isSuccess) => {
        setIsAuthenticated(isSuccess);
      })
      .catch((error) => {
        setIsAuthenticated(false);
        localStorage.removeItem('authToken');
        setAuthToken(null);
        console.error(error);
      });
  }, [pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        currentMember: payload && {
          id: payload.sub,
          name: payload.name,
        },
        register: (data) => {
          register({
            username: data.username,
            email: data.email,
            password: data.password,
          })
            .then(({ authToken }) => {
              localStorage.setItem('authToken', authToken);
              setAuthToken(authToken);
            })
            .catch((error) => console.error(error));
        },
        login: (data) => {
          login({
            username: data.username,
            password: data.password,
          })
            .then((data) => {
              localStorage.setItem('authToken', data.authToken);
              setAuthToken(authToken);
            })
            .catch((error) => console.error(error));
        },
        logout: () => {
          logout();
          setAuthToken(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
