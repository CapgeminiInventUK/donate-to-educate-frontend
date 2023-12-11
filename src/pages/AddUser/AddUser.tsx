/* eslint-disable no-console */
import { FC, useEffect, useState } from 'react';
import { signUp, confirmSignUp } from 'aws-amplify/auth';
import FormButton from '@/components/FormButton/FormButton';
import TextInput from '@/components/TextInput/TextInput';
import VerificationInput from 'react-verification-input';
import { Navigate } from 'react-router-dom';
import Paths from '@/config/paths';
import styles from './AddUser.module.scss';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState('SIGN_UP');
  const [verificationCode, setVerificationCode] = useState('');
  const [submitCode, setSubmitCode] = useState(false);

  useEffect(() => {
    if (submitted) {
      handleSignUp({ email, password })
        .then((step) => setStep(step))
        .catch(console.error);
      setSubmitted(false);
    }
  }, [submitted, email, password]);

  useEffect(() => {
    if (submitCode) {
      handleConfirmSignUp({ email, code: verificationCode })
        .then((step) => setStep(step))
        .catch(console.error);
      setSubmitCode(false);
    }
  }, [submitCode, email, verificationCode]);

  if (step === 'DONE') {
    return <Navigate to={Paths.LOGIN} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {step === 'SIGN_UP' && (
          <>
            <h2>Create user</h2>
            <TextInput
              header="Email"
              onChange={(event): void => {
                setEmail(event.target.value);
              }}
            />
            <TextInput
              header="Password"
              password
              onChange={(event): void => {
                setPassword(event.target.value);
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
              onChange={(input) => {
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
