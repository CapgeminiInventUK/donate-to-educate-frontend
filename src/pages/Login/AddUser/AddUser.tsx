import { FC, useEffect, useState } from 'react';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import FormButton from '@/components/FormButton/FormButton';
import TextInput from '@/components/TextInput/TextInput';
import VerificationInput from 'react-verification-input';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import Paths from '@/config/paths';
import styles from './AddUser.module.scss';
import Spinner from '@/components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from '@aws-amplify/api-graphql';
import { GetSignUpDataQuery } from '@/types/api';
import { getSignUpData } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import LogoIconBlue from '@/assets/logo/LogoIconBlue';
import { useStore } from '@/stores/useStore';

interface SignUpParameters {
  password: string;
  email: string;
  type: string;
  name: string;
  id: string;
}

interface ConfirmSignUpParameters {
  email: string;
  code: string;
}

async function handleConfirmSignUp({ email, code }: ConfirmSignUpParameters): Promise<string> {
  const { nextStep } = await confirmSignUp({
    username: email,
    confirmationCode: code,
  });

  return nextStep.signUpStep;
}

async function handleSignUp({
  email,
  password,
  type,
  name,
  id,
}: SignUpParameters): Promise<string> {
  const lowercaseEmail = email.toLowerCase();
  const { nextStep } = await signUp({
    username: lowercaseEmail,
    password,
    options: {
      userAttributes: {
        email: lowercaseEmail,
        'custom:type': type,
        'custom:institution': name,
        'custom:institutionId': id,
      },
    },
  });

  return nextStep.signUpStep;
}

const NewUser: FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('SIGN_UP');
  const [verificationCode, setVerificationCode] = useState('');
  const [submitCode, setSubmitCode] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();

  const { isLoading, data, isError } = useQuery({
    queryKey: [`sign-up-${id}`],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSignUpDataQuery>>({
        query: getSignUpData,
        variables: {
          id,
        },
      });

      return data;
    },
  });

  useEffect(() => {
    if (submitted && !isLoading) {
      const { email, type, name, nameId } = data?.getSignUpData ?? {};
      if (email && type) {
        handleSignUp({ email, password, type, name: name ?? '', id: nameId ?? '' })
          .then((step) => setStep(step))
          .catch((error: Error) => {
            setError(error.message.replace('Password did not conform with policy: ', ''));
          });
        setSubmitted(false);
      }
    }
  }, [submitted, data?.getSignUpData, password, isLoading]);

  useEffect(() => {
    if (submitCode && !isLoading) {
      const email = String(data?.getSignUpData?.email);
      if (email) {
        handleConfirmSignUp({ email, code: verificationCode })
          .then((step) => setStep(step))
          .catch((error: Error) => {
            setError(error.message);
          });
        setSubmitCode(false);
      }
    }
  }, [submitCode, data?.getSignUpData?.email, verificationCode, isLoading]);

  if (step === 'DONE') {
    // TODO when done need to delete the entry from the sign up table.
    // TODO auto sign in?

    void useStore
      .getState()
      .logout()
      .then(() => navigate(Paths.SIGN_IN));
    return <Spinner />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorBanner />;
  }

  const email = data?.getSignUpData?.email;

  if (email === undefined) {
    return <Navigate to={Paths.HOME} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {step === 'SIGN_UP' && (
          <>
            <LogoIconBlue className={styles.logo} />
            <h2>Create user</h2>
            <TextInput header="Email" value={email} disabled ariaLabel="email" />
            <TextInput
              header="Password"
              password
              onChange={(value): void => {
                setPassword(value);
              }}
              errorMessage={error}
              ariaLabel="password"
            />
            <FormButton
              theme={'formButtonDarkBlue'}
              onClick={(): void => setSubmitted(true)}
              text={'Create user'}
              ariaLabel="createUser"
            />
          </>
        )}
        {step === 'CONFIRM_SIGN_UP' && (
          <div className={styles.verificationCode}>
            <LogoIconBlue className={styles.logo} />
            <h2>Verification code</h2>
            <p>Enter your verification code that we sent to your email address</p>
            <VerificationInput
              classNames={{
                container: styles.codeContainer,
                character: styles.character,
              }}
              value={verificationCode}
              onChange={(input: string) => {
                if (input.match(/^[0-9]*$/)) {
                  setVerificationCode(input);
                }
              }}
            />
            <FormButton
              text={'Next'}
              className={styles.button}
              theme={'formButtonDarkBlue'}
              useArrow={true}
              onClick={(): void => {
                if (verificationCode.length === 6) {
                  setSubmitCode(true);
                }
              }}
              ariaLabel="next"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewUser;
