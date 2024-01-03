/* eslint-disable no-console */
import { FC, useEffect, useState } from 'react';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import FormButton from '@/components/FormButton/FormButton';
import TextInput from '@/components/TextInput/TextInput';
import VerificationInput from 'react-verification-input';
import { Navigate, useSearchParams } from 'react-router-dom';
import Paths from '@/config/paths';
import styles from './AddUser.module.scss';
import Spinner from '@/components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from '@aws-amplify/api-graphql';
import { GetSignUpDataQuery } from '@/types/api';
import { getSignUpData } from '@/graphql/queries';

interface SignUpParameters {
  password: string;
  email: string;
}

interface ConfirmSignUpParameters {
  email: string;
  code: string;
}

async function handleConfirmSignUp({ email, code }: ConfirmSignUpParameters): Promise<string> {
  try {
    const { isSignUpComplete, userId, nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    console.log(userId, nextStep, isSignUpComplete);
    return nextStep.signUpStep;
  } catch (error) {
    console.log('error signing up:', error);
  }

  return 'FAILED';
}

async function handleSignUp({ email, password }: SignUpParameters): Promise<string> {
  try {
    const lowercaseEmail = email.toLowerCase();
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username: lowercaseEmail,
      password,
      options: {
        userAttributes: {
          email: lowercaseEmail,
          'custom:type': 'localAuthority',
        },
      },
    });

    console.log(userId, nextStep, isSignUpComplete);
    return nextStep.signUpStep;

    // confirmSignUp(email)
  } catch (error) {
    console.log('error signing up:', error);
  }

  return 'FAILED';
}

const NewUser: FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('SIGN_UP');
  const [verificationCode, setVerificationCode] = useState('');
  const [submitCode, setSubmitCode] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const { isLoading, data } = useQuery({
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
      const email = String(data?.getSignUpData?.email);
      handleSignUp({ email, password })
        .then((step) => setStep(step))
        .catch(console.error);
      setSubmitted(false);
    }
  }, [submitted, data?.getSignUpData?.email, password, isLoading]);

  useEffect(() => {
    if (submitCode && !isLoading) {
      const email = String(data?.getSignUpData?.email);
      handleConfirmSignUp({ email, code: verificationCode })
        .then((step) => setStep(step))
        .catch(console.error);
      setSubmitCode(false);
    }
  }, [submitCode, data?.getSignUpData?.email, verificationCode, isLoading]);

  if (step === 'DONE') {
    // TODO when done need to delete the entry from the sign up table.
    return <Navigate to={Paths.LOGIN} />;
  }

  if (isLoading) {
    return <Spinner />;
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
            <h2>Create user</h2>
            <TextInput header="Email" value={email} disabled />
            <TextInput
              header="Password"
              password
              onChange={(value): void => {
                setPassword(value);
              }}
            />
            <FormButton
              theme={'formButtonDarkBlue'}
              onClick={(): void => setSubmitted(true)}
              text={'Create user'}
            />
          </>
        )}
        {step === 'CONFIRM_SIGN_UP' && (
          <>
            <p>Please enter the verification code sent to your email address.</p>
            <VerificationInput
              value={verificationCode}
              onChange={(input: string) => {
                if (input.match(/^[0-9]*$/)) {
                  setVerificationCode(input);
                }
              }}
            />
            <FormButton
              text={'Next'}
              theme={'formButtonDarkBlue'}
              useArrow={true}
              onClick={(): void => {
                if (verificationCode.length === 6) {
                  setSubmitCode(true);
                }
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NewUser;
