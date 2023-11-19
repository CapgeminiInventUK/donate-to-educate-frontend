import { FC } from 'react';
import styles from './SomethingWentWrong.module.scss';
import ErrorPage from '@/components/ErrorPage/ErrorPage';
import AlertCircle from '@/assets/error/AlertCircle';
import Paths from '@/config/paths';

const SomethingWentWrong: FC = () => {
  return (
    <div className={styles.container}>
      <ErrorPage
        icon={<AlertCircle />}
        title="Something went wrong"
        message={
          <>
            <p>There was a problem loading this content.</p>
            <p>
              Try again or <a href={Paths.CONTACT}>contact us.</a>
            </p>
          </>
        }
      />
    </div>
  );
};

export default SomethingWentWrong;
