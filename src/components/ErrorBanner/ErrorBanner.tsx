import Paths from '@/config/paths';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorBanner.module.scss';

const ErrorBanner: FC = () => {
  return (
    <div className={styles.container}>
      <h3>Something went wrong</h3>
      <p>
        Refresh the page and try again. If problems persist{' '}
        <Link to={Paths.CONTACT}>contact us.</Link>
      </p>
    </div>
  );
};
export default ErrorBanner;
