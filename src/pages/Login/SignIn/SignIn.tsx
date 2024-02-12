import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { SignInOutput, signIn } from 'aws-amplify/auth';
import FormButton from '@components/FormButton/FormButton';
import Spinner from '@components/Spinner/Spinner';
import TextInput from '@components/TextInput/TextInput';
import LoginBanner from '@/components/LoginBanner/LoginBanner';
import { AccountType, useCheckCurrentUser } from '@/hooks/useCheckCurrentUser';
import Paths from '@/config/paths';
import { breakpoints } from '@utils/globals';
import styles from '../Login.module.scss';
import BackButton from '@/components/BackButton/BackButton';

export const SignIn: FC<{ backButtonPressed: () => void }> = ({ backButtonPressed }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, type } = useCheckCurrentUser();
  const isNotMobile = useMediaQuery({ query: `(min-width: ${breakpoints.screenMedium})` });
  const isSmallMobile = useMediaQuery({ query: `(max-width: ${breakpoints.screenSmall})` });

  useEffect(() => {
    if (submitted) {
      userLogin(email, password)
        .catch(handleError)
        .finally(() => {
          setSubmitted(false);
        });
    }
  }, [submitted, password, email]);

  if (isLoggedIn && !submitted && type) {
    navigate(getRedirectUrl(type));
    return <Spinner />;
  }

  const handleError = (): void => {
    setValidationMessage('Incorrect email or password');
  };

  return (
    <div className={styles.container}>
      <BackButton onClick={backButtonPressed} theme="blue" />
      <div className={styles.subContainer}>
        <LoginBanner />
        <h2>Sign in</h2>
        <TextInput
          header="Email"
          onChange={(value): void => {
            if (email !== value) {
              setEmail(value);
            }
          }}
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
          isSmall={isSmallMobile}
        />
        <Link to={Paths.RESET_PASSWORD} className={styles.altLink}>
          I have forgotten my password
        </Link>
        <div className={styles.validationContainer}>
          <span>{validationMessage}</span>
        </div>
        <FormButton
          text={'Sign in'}
          theme={
            !submitted && email.length && password.length
              ? 'formButtonDarkBlue'
              : 'formButtonDisabled'
          }
          onClick={(): void => setSubmitted(true)}
          useArrow={true}
          className={styles.formButton}
        />
      </div>{' '}
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
