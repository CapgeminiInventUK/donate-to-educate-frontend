import LogoWhite from '@/assets/logo/LogoWhite';
import Paths from '@/config/paths';
import type { ErrorPageProps } from '@/types/props';
import type { FC } from 'react';
import styles from './ErrorPage.module.scss';

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
