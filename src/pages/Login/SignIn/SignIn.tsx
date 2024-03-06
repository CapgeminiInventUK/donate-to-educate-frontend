import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { SignInOutput, signIn } from 'aws-amplify/auth';
import FormButton from '@components/FormButton/FormButton';
import TextInput from '@components/TextInput/TextInput';
import LoginBanner from '@/components/LoginBanner/LoginBanner';
import {
  AccountType,
  checkAuthState,
  getUserType,
  useCheckCurrentUser,
} from '@/hooks/useCheckCurrentUser';
import Paths from '@/config/paths';
import { breakpoints } from '@utils/globals';
import styles from '../Login.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import Spinner from '@/components/Spinner/Spinner';
import { getRedirectUrl } from '@/utils/account';

const SignIn: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const { isLoading, user } = useCheckCurrentUser();
  const isNotMobile = useMediaQuery({ query: `(min-width: ${breakpoints.screenMedium})` });
  const isSmallMobile = useMediaQuery({ query: `(max-width: ${breakpoints.screenSmall})` });

  useEffect(() => {
    if (submitted) {
      userLogin(email, password)
        .then(() => {
          checkAuthState()
            .then(() => {
              getUserType()
                .then((attributes) => {
                  navigate(getRedirectUrl(attributes['custom:type'] as AccountType));
                })
                .catch(handleError);
            })
            .catch(handleError);
        })
        .catch(handleError)
        .finally(() => {
          setSubmitted(false);
        });
    }
  }, [submitted, password, email, navigate, user]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleError = (): void => {
    setValidationMessage('Incorrect email or password');
  };

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
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
          ariaLabel="sign in"
        />
      </div>{' '}
    </div>
  );
};

const userLogin = async (username: string, password: string): Promise<SignInOutput> => {
  return await signIn({ username, password });
};

export default SignIn;
