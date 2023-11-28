import { FC } from 'react';
import styles from './ErrorPage.module.scss';
import LogoWhite from '@/assets/logo/LogoWhite';
import Paths from '@/config/paths';

interface ErrorPageProps {
  icon: JSX.Element;
  title: string;
  message: JSX.Element;
}

const ErrorPage: FC<ErrorPageProps> = ({ icon, title, message }) => {
  return (
    <div className={styles.errorPage}>
      {icon}
      <h2>{title}</h2>
      {message}
      <LogoWhite className={styles.logo} />
      <a href={Paths.HOME}>Return home</a>
    </div>
  );
};

export default ErrorPage;
