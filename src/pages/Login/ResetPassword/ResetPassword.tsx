import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import VerificationInput from 'react-verification-input';
import { ConfirmResetPasswordInput, confirmResetPassword, resetPassword } from 'aws-amplify/auth';
import Paths from '@/config/paths';
import TextInput from '@/components/TextInput/TextInput';
import FormButton from '@/components/FormButton/FormButton';
import LoginBanner from '@/components/LoginBanner/LoginBanner';
import { breakpoints } from '@/utils/globals';
import styles from './ResetPassword.module.scss';
import BackButton from '@/components/BackButton/BackButton';

const ResetPassword: FC = () => {
  const [email, setEmail] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');

  const [verificationCode, setVerificationCode] = useState('');
  const [stepNumber, setStepNumber] = useState(0);

  const [firstErrorText, setFirstErrorText] = useState('');
  const [secondErrorText, setSecondErrorText] = useState('');

  const isNotMobile = useMediaQuery({ query: `(min-width: ${breakpoints.screenMedium})` });
  const isSmallMobile = useMediaQuery({ query: `(max-width: ${breakpoints.screenSmall})` });

  const isPasswordFieldsFilled = newPassword !== '' && newPasswordRepeat !== '';

  function handleResetPassword(username: string): void {
    resetPassword({ username: username })
      .then(() => {
        setStepNumber(1);
      })
      .catch(() => {
        setFirstErrorText('Error resetting the password for this user. ');
      });
  }

  function handleConfirmResetPassword({
    username,
    confirmationCode,
    newPassword,
  }: ConfirmResetPasswordInput): void {
    confirmResetPassword({ username, confirmationCode, newPassword })
      .then(() => {
        setStepNumber(3);
      })
      .catch(() => {
        setSecondErrorText('Error resetting the password for this user. ');
      });
  }

  return (
    <div className={styles.container}>
      <BackButton theme={'blue'} />
      <div className={styles.containerInner}>
        <LoginBanner />
        {stepNumber === 0 ? (
          <>
            <h2>Reset password</h2>
            <TextInput
              header="Email"
              onChange={(value): void => {
                setEmail(value);

                if (!(firstErrorText === '')) {
                  setFirstErrorText('');
                }
              }}
              ariaLabel="email"
              isLarge={isNotMobile}
              isSmall={isSmallMobile}
            />
            <p className={styles.errorText}>{firstErrorText}</p>
            <FormButton
              text="Submit"
              theme={email.length ? 'formButtonDarkBlue' : 'formButtonDisabled'}
              onClick={(): void => handleResetPassword(email)}
              useArrow={true}
              ariaLabel="submit"
            />
          </>
        ) : stepNumber === 1 ? (
          <div className={styles.verificationCodeInputContainer}>
            <p>Please enter the verification code sent to your email address.</p>
            <VerificationInput
              value={verificationCode}
              onChange={(input: string) => {
                if (input.match(/^[0-9]*$/)) {
                  setVerificationCode(input);
                }
              }}
            />
            <br />
            <FormButton
              text={'Next'}
              theme={'formButtonDarkBlue'}
              useArrow={true}
              onClick={(): void => {
                if (verificationCode.length === 6) {
                  setStepNumber(2);
                }
              }}
              ariaLabel="next"
            />
          </div>
        ) : stepNumber === 2 ? (
          <div className={styles.newPasswordSection}>
            <TextInput
              header="New password"
              password
              onChange={(value): void => {
                setNewPassword(value);

                if (!(secondErrorText === '')) {
                  setSecondErrorText('');
                }
              }}
              isSmall={isSmallMobile}
              ariaLabel="new password"
            />
            <TextInput
              header="Repeat password"
              password
              onChange={(value): void => {
                setNewPasswordRepeat(value);
                if (!(secondErrorText === '')) {
                  setSecondErrorText('');
                }
              }}
              isSmall={isSmallMobile}
              ariaLabel="repeat password"
            />
            <p className={styles.errorText}>{secondErrorText}</p>
            <FormButton
              text={'Change password'}
              theme={isPasswordFieldsFilled ? 'formButtonDarkBlue' : 'formButtonDisabled'}
              ariaLabel="change password"
              useArrow={true}
              disabled={!isPasswordFieldsFilled}
              onClick={(): void => {
                if (newPassword === '' || newPasswordRepeat === '') {
                  setSecondErrorText('Please do not leave field blank');
                  return;
                }

                if (!(newPassword === newPasswordRepeat)) {
                  setSecondErrorText("Passwords don't match.");
                  return;
                }

                handleConfirmResetPassword({
                  username: email,
                  confirmationCode: verificationCode,
                  newPassword: newPassword,
                });
              }}
            />
          </div>
        ) : (
          <div className={styles.passwordChangedSuccessfully}>
            <h2>You have changed your password</h2>
            <Link className={styles.login} to={Paths.SIGN_IN}>
              Return to sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
