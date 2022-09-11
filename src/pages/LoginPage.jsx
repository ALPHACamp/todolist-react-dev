import {
  AuthContainer,
  AuthInputContainer,
  AuthButton,
  AuthLinkText,
} from 'components/common/auth.styled';
import { ACLogoIcon } from 'assets/images';
import { AuthInput } from 'components';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

const LoginPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/todo" replace />;
  }

  const handleClick = () => {
    login({ username, password });
  };

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>登入 Todo</h1>

      <AuthInputContainer>
        <AuthInput
          label="帳號"
          value={username}
          placeholder={'請輸入帳號'}
          onChange={(nameInput) => {
            setUserName(nameInput);
          }}
        />
      </AuthInputContainer>

      <AuthInputContainer>
        <AuthInput
          type="password"
          label="密碼"
          value={password}
          placeholder={'請輸入密碼'}
          onChange={(passwordInput) => {
            setPassword(passwordInput);
          }}
        />
      </AuthInputContainer>
      <AuthButton onClick={handleClick}>登入</AuthButton>
      <Link to="/signup">
        <AuthLinkText>註冊</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default LoginPage;
