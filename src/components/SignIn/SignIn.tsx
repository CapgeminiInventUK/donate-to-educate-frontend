import { SignInOutput, signIn } from 'aws-amplify/auth';
import TextInput from '../TextInput/TextInput';
import { FC, useEffect, useState } from 'react';
import LogoWhite from '@assets/logo/LogoWhite';
import styles from './SignIn.module.scss';
import { useNavigate } from 'react-router';
import { AccountType, useCheckCurrentUser } from '@/hooks/useCheckCurrentUser';
import Paths from '@/config/paths';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';
import FormButton from '../FormButton/FormButton';

export const SignIn: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const { isLoggedIn, type } = useCheckCurrentUser();

  useEffect(() => {
    if (submitted) {
      userLogin(username, password)
        .then(() => {
          setSubmitted(false);
        })
        .catch(handleError);
    }
  }, [submitted, password, username]);

  if (isLoggedIn && !submitted && type) {
    navigate(getRedirectUrl(type));
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
        onChange={(value): void => {
          if (username !== value) {
            setUsername(value);
          }
        }}
      />
      <TextInput
        header="Password"
        password
        onChange={(value): void => {
          if (password !== value) {
            setPassword(value);
          }
        }}
      />
      <Link to={Paths.RESET_PASSWORD} className={styles.forgotPassword}>
        I have forgotten my password
      </Link>
      <div className={styles.validationContainer}>
        <span>{validationMessage}</span>
      </div>
      <FormButton
        text={'Login'}
        theme={'formButtonDarkBlue'}
        onClick={(): void => setSubmitted(true)}
        useArrow={true}
      />
    </div>
  );
};

const userLogin = async (username: string, password: string): Promise<SignInOutput> => {
  return await signIn({ username, password });
};

const getRedirectUrl = (type: AccountType): string => {
  switch (type) {
    case 'admin':
      return Paths.ADMIN_DASHBOARD;
    case 'localAuthority':
      return Paths.LOCAL_AUTHORITY_DASHBOARD;
    default:
      throw new Error(`Unknown account type ${type}`);
  }
};
