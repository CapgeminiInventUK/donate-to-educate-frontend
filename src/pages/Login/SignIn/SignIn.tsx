import BackButton from '@/components/BackButton/BackButton';
import Card from '@/components/Card/Card';
import LoginBanner from '@/components/LoginBanner/LoginBanner';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';
import { useStore } from '@/stores/useStore';
import type { AccountType } from '@/types/data';
import { getRedirectUrl } from '@/utils/account';
import FormButton from '@components/FormButton/FormButton';
import TextInput from '@components/TextInput/TextInput';
import { breakpoints } from '@utils/globals';
import { type FC, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link, Navigate } from 'react-router-dom';
import styles from '../Login.module.scss';

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
          errorMessage={error?.message}
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
