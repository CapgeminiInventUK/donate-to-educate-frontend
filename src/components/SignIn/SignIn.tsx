/* eslint-disable no-console */
import { SignInOutput, signIn } from 'aws-amplify/auth';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import { FC, useEffect, useState } from 'react';
import LogoWhite from '@assets/logo/LogoWhite';
import styles from './SignIn.module.scss';
import { useNavigate } from 'react-router';
import { useCheckCurrentUser } from '@/hooks/useCheckCurrentUser';

export const SignIn: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const checkIsLoggedIn = useCheckCurrentUser();

  useEffect(() => {
    if (submitted) {
      userLogin(username, password)
        .then(() => navigate('/admin-dashboard'))
        .catch(console.error);
      setSubmitted(false);
    }
  }, [submitted, password, username, navigate]);

  // TODO display loader
  if (checkIsLoggedIn) {
    navigate('/admin-dashboard');
    return <></>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBanner}>
        <LogoWhite />
      </div>
      <h2>Sign in</h2>
      <TextInput header="Username" onChange={(event): void => setUsername(event.target.value)} />
      <TextInput
        header="Password"
        password
        onChange={(event): void => setPassword(event.target.value)}
      />
      <Button theme="darkBlue" text="Login" onClick={(): void => setSubmitted(true)} />
    </div>
  );
};

const userLogin = async (username: string, password: string): Promise<SignInOutput> => {
  return await signIn({ username, password });
};
