import { FC, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import FormButton from '@components/FormButton/FormButton';
import TextInput from '@components/TextInput/TextInput';
import LoginBanner from '@/components/LoginBanner/LoginBanner';
import Paths from '@/config/paths';
import { breakpoints } from '@utils/globals';
import styles from '../Login.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import Spinner from '@/components/Spinner/Spinner';
import { getRedirectUrl } from '@/utils/account';
import { useStore } from '@/stores/useStore';
import { AccountType } from '@/types/data';
import Card from '@/components/Card/Card';

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const userActions = useStore((state) => state);
  const { user, isLoading, error, hasProfile } = userActions;

  const isNotMobile = useMediaQuery({ query: `(min-width: ${breakpoints.screenLarge})` });
  const isSmallMobile = useMediaQuery({ query: `(max-width: ${breakpoints.screenSmall})` });

  if (isLoading) {
    return <Spinner />;
  }

  if (user) {
    return <Navigate to={getRedirectUrl(user.type as AccountType, hasProfile)} />;
  }

  return (
    <div
      className={styles.container}
      onKeyDown={(event): void =>
        event.key === 'Enter' && email.length && password.length
          ? void userActions.login(email, password)
          : undefined
      }
    >
      <BackButton theme="blue" />
      <Card className={styles.subContainer}>
        <LoginBanner />
        <h2>Sign in</h2>
        <TextInput
          header="Email"
          onChange={(value): void => {
            if (email !== value) {
              setEmail(value);
            }
          }}
          ariaLabel="email"
          isLarge={isNotMobile}
          isSmall={isSmallMobile}
        />
        <TextInput
          header="Password"
          password
          onChange={(value): void => {
            if (password !== value) {
              setPassword(value);
            }
          }}
          ariaLabel="password"
          isSmall={isSmallMobile}
          errorMessage={
            !error?.message?.includes('UserUnAuthenticatedException') ? error?.message : undefined
          }
        />
        <Link to={Paths.RESET_PASSWORD} className={styles.altLink}>
          I have forgotten my password
        </Link>
        <FormButton
          text={'Sign in'}
          theme={email.length && password.length ? 'formButtonDarkBlue' : 'formButtonDisabled'}
          onClick={(): void => void userActions.login(email, password)}
          useArrow={true}
          className={styles.formButton}
          ariaLabel="sign in"
        />
        <Link to={Paths.JOIN}>Join Donate to Educate if you don&apos;t have an account</Link>
      </Card>{' '}
    </div>
  );
};

export default SignIn;
