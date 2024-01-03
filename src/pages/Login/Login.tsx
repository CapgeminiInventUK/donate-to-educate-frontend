import { FC } from 'react';
import { SignIn } from './SignIn/SignIn';
import styles from './Login.module.scss';
import BackButton from '@/components/BackButton/BackButton';

const Login: FC = () => {
  return (
    <div className={styles.container}>
      <BackButton
        onClick={() => {
          return;
        }}
        theme="blue"
      />
      <SignIn />
    </div>
  );
};

export default Login;
