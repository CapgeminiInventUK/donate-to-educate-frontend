/* eslint-disable no-console */
import { Auth } from 'aws-amplify';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import { FC, useEffect, useState } from 'react';
import LogoWhite from '@assets/logo/LogoWhite';
import styles from './SignIn.module.scss';

interface CognitoUser {
  username: string;
  attributes: {
    sub: string;
  };
}

export const SignIn: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      userLogin(username, password).then(console.info).catch(console.error);
      setSubmitted(false);
    }
  }, [submitted, password, username]);

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

const userLogin = async (username: string, password: string): Promise<CognitoUser> => {
  return (await Auth.signIn(username, password)) as CognitoUser;
};
