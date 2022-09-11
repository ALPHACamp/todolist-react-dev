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

const SignUpPage = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isAuthenticated, register } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/todo" replace />;
  }

  const handleClick = () => {
    register({ username, email, password });
  };

  return (
    <AuthContainer>
      <div>
        <ACLogoIcon />
      </div>
      <h1>建立您的帳號</h1>

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
          label="Email"
          value={email}
          placeholder={'請輸入 email'}
          onChange={(emailInput) => {
            setEmail(emailInput);
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
      <AuthButton onClick={handleClick}>註冊</AuthButton>
      <Link to="/login">
        <AuthLinkText>取消</AuthLinkText>
      </Link>
    </AuthContainer>
  );
};

export default SignUpPage;
