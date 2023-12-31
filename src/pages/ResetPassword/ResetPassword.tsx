/* eslint-disable no-console */
import { FC, useState } from 'react';
import styles from './ResetPassword.module.scss';
import LogoWhite from '@/assets/logo/LogoWhite';
import TextInput from '@/components/TextInput/TextInput';
import { ConfirmResetPasswordInput, confirmResetPassword, resetPassword } from 'aws-amplify/auth';
import VerificationInput from 'react-verification-input';
import Paths from '@/config/paths';
import { Link } from 'react-router-dom';
import FormButton from '../../components/FormButton/FormButton';

const ResetPassword: FC = () => {
  const [username, setUsername] = useState('');

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');

  const [verificationCode, setVerificationCode] = useState('');
  const [stepNumber, setStepNumber] = useState(0);

  const [firstErrorText, setFirstErrorText] = useState('');
  const [secondErrorText, setSecondErrorText] = useState('');

  function handleResetPassword(username: string): void {
    resetPassword({ username: username })
      .then(() => {
        setStepNumber(1);
      })
      .catch((error) => {
        console.log(error);
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
      .catch((error) => {
        console.log(error);
        setSecondErrorText('Error resetting the password for this user. ');
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        {stepNumber === 0 ? (
          <>
            <div className={styles.loginBanner}>
              <LogoWhite />
            </div>
            <h2>Reset Password</h2>
            <TextInput
              header="Your Email"
              onChange={(value): void => {
                setUsername(value);

                if (!(firstErrorText === '')) {
                  setFirstErrorText('');
                }
              }}
            />
            <p className={styles.errorText}>{firstErrorText}</p>
            <FormButton
              text={'Submit'}
              theme={'formButtonDarkBlue'}
              onClick={(): void => handleResetPassword(username)}
              useArrow={true}
            />
          </>
        ) : stepNumber === 1 ? (
          <>
            <div className={styles.loginBanner}>
              <LogoWhite />
            </div>
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
              />
            </div>
          </>
        ) : stepNumber === 2 ? (
          <>
            <TextInput
              header="New Password"
              password
              onChange={(value): void => {
                setNewPassword(value);

                if (!(secondErrorText === '')) {
                  setSecondErrorText('');
                }
              }}
            />
            <TextInput
              header="Repeat Password"
              password
              onChange={(value): void => {
                setNewPasswordRepeat(value);
                if (!(secondErrorText === '')) {
                  setSecondErrorText('');
                }
              }}
            />
            <p className={styles.errorText}>{secondErrorText}</p>
            <FormButton
              text={'Change Password'}
              theme={'formButtonDarkBlue'}
              useArrow={true}
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
                  username: username,
                  confirmationCode: verificationCode,
                  newPassword: newPassword,
                });
              }}
            />
          </>
        ) : (
          <>
            <div className={styles.loginBanner}>
              <LogoWhite />
            </div>
            <p>Password changed successfully.</p>
            <Link className={styles.login} to={Paths.LOGIN}>
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
