/* eslint-disable no-console */
import { SignInOutput, signIn } from 'aws-amplify/auth';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import { FC, useEffect, useState } from 'react';
import LogoWhite from '@assets/logo/LogoWhite';
import styles from './SignIn.module.scss';
import { useNavigate } from 'react-router';
import { useCheckCurrentUser } from '@/hooks/useCheckCurrentUser';
import Paths from '@/config/paths';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';

export const SignIn: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const checkIsLoggedIn = useCheckCurrentUser();

  useEffect(() => {
    if (submitted) {
      userLogin(username, password)
        .then(() => {
          setSubmitted(false);
        })
        .catch(console.error);
    }
  }, [submitted, password, username, navigate]);

  if (checkIsLoggedIn && !submitted) {
    navigate(Paths.ADMIN_DASHBOARD);
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginBanner}>
        <LogoWhite />
      </div>
      <h2>Sign in</h2>
      <TextInput
        header="Username"
        onChange={(event): void => {
          if (username !== event.target.value) {
            setUsername(event.target.value);
          }
        }}
      />
      <TextInput
        header="Password"
        password
        onChange={(event): void => {
          if (password !== event.target.value) {
            setPassword(event.target.value);
          }
        }}
      />
      <Link to={Paths.RESET_PASSWORD} className={styles.forgotPassword}>
        I have forgotten my password
      </Link>
      <Button theme="darkBlue" text="Login" onClick={(): void => setSubmitted(true)} />
    </div>
  );
};

const userLogin = async (username: string, password: string): Promise<SignInOutput> => {
  return await signIn({ username, password });
};
