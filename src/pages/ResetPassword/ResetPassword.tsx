/* eslint-disable no-console */
import { FC, useState } from 'react';
import styles from './ResetPassword.module.scss';
import LogoWhite from '@/assets/logo/LogoWhite';
import TextInput from '@/components/TextInput/TextInput';
import Button from '@/components/Button/Button';
import { ConfirmResetPasswordInput, confirmResetPassword, resetPassword } from 'aws-amplify/auth';
import VerificationInput from 'react-verification-input';
import Paths from '@/config/paths';
import { Link } from 'react-router-dom';

const ResetPassword: FC = () => {
  const [username, setUsername] = useState('');

  const [newPassword, setNewPassord] = useState('');
  const [newPasswordRepeat, setNewPassordRepeat] = useState('');

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
        setStepNumber(4);
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
              header="Your username"
              onChange={(event): void => {
                setUsername(event.target.value);

                if (!(firstErrorText === '')) {
                  setFirstErrorText('');
                }
              }}
            />
            <p className={styles.errorText}>{firstErrorText}</p>
            <Button
              theme="darkBlue"
              text="Submit"
              onClick={() => {
                handleResetPassword(username);
              }}
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
                onChange={(input) => {
                  if (input.match(/^[0-9]*$/)) {
                    setVerificationCode(input);
                  }
                }}
              />
              <br />
              <Button
                theme="darkBlue"
                text="Submit"
                onClick={() => {
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
              onChange={(event): void => {
                setNewPassord(event.target.value);

                if (!(secondErrorText === '')) {
                  setSecondErrorText('');
                }
              }}
            />
            <TextInput
              header="Repeat Password"
              password
              onChange={(event): void => {
                setNewPassordRepeat(event.target.value);
                if (!(secondErrorText === '')) {
                  setSecondErrorText('');
                }
              }}
            />
            <p className={styles.errorText}>{secondErrorText}</p>
            <Button
              theme="darkBlue"
              text="Submit"
              onClick={() => {
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
            {' '}
            <div className={styles.loginBanner}>
              <LogoWhite />
            </div>
            <p>Password changed successfully.</p>
            <Link className={styles.home} to={Paths.HOME}>
              Return to homepage
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
