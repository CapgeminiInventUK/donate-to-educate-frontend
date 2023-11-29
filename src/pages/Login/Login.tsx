import { FC } from 'react';
import { SignIn } from '../../components/SignIn/SignIn';
import styles from './Login.module.scss';

const Login: FC = () => {
  return (
    <div className={styles.container}>
      <SignIn />
    </div>
  );
};

export default Login;
