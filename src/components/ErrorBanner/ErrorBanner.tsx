import { FC } from 'react';
import styles from './ErrorBanner.module.scss';
import { Link } from 'react-router-dom';
import Paths from '@/config/paths';

const ErrorBanner: FC = () => {
  return (
    <div className={styles.container}>
      <h3>Something went wrong</h3>
      <p>
        Please refresh the page and try again. If problems persist{' '}
        <Link to={Paths.CONTACT}>contact us</Link>
      </p>
    </div>
  );
};
export default ErrorBanner;
