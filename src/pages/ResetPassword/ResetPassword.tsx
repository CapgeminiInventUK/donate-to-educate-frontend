/* eslint-disable no-console */
import { FC, useState } from 'react';
import styles from './ResetPassword.module.scss';
import LogoWhite from '@/assets/logo/LogoWhite';
import TextInput from '@/components/TextInput/TextInput';
import Button from '@/components/Button/Button';
import { ResetPasswordOutput, resetPassword } from 'aws-amplify/auth';
import Paths from '@/config/paths';
import { Link } from 'react-router-dom';

function handleResetPassword(username: string): void {
  resetPassword({ username: username })
    .then((output) => {
      handleResetPasswordNextSteps(output);
    })
    .catch(console.error);
}

function handleResetPasswordNextSteps(output: ResetPasswordOutput): void {
  const { nextStep } = output;
  switch (nextStep.resetPasswordStep) {
    case 'CONFIRM_RESET_PASSWORD_WITH_CODE':
      //const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      //console.log(`Confirmation code was sent to ${codeDeliveryDetails.deliveryMedium}`);
      // Collect the confirmation code from the user and pass to confirmResetPassword.
      break;
    case 'DONE':
      break;
  }
}

const ResetPassword: FC = () => {
  const [username, setUsername] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        {!submitted ? (
          <>
            <div className={styles.loginBanner}>
              <LogoWhite />
            </div>
            <h2>Reset Password</h2>
            <TextInput
              header="Your username"
              onChange={(event): void => {
                setUsername(event.target.value);
              }}
            />
            <Button
              theme="darkBlue"
              text="Submit"
              onClick={() => {
                handleResetPassword(username);
                setSubmitted(true);
              }}
            />
          </>
        ) : (
          <>
            <div className={styles.loginBanner}>
              <LogoWhite />
            </div>
            <p>
              If this user exists, an email has been sent with instructions on how to reset the
              password.
            </p>
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
