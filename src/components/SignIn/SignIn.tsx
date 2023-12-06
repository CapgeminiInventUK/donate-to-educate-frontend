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

export const SignIn: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const checkIsLoggedIn = useCheckCurrentUser();

  useEffect(() => {
    if (submitted) {
      userLogin(username, password)
        .then(() => {
          setSubmitted(false);
        })
        .catch(handleError);
    }
  }, [submitted, password, username, navigate]);

  if (checkIsLoggedIn && !submitted) {
    navigate(Paths.ADMIN_DASHBOARD);
    return <Spinner />;
  }

  const handleError = (): void => {
    setValidationMessage('Incorrect username or password');
  };

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
      <div className={styles.validationContainer}>
        <span>{validationMessage}</span>
      </div>
      <Button theme="darkBlue" text="Login" onClick={(): void => setSubmitted(true)} />
    </div>
  );
};

const userLogin = async (username: string, password: string): Promise<SignInOutput> => {
  return await signIn({ username, password });
};
