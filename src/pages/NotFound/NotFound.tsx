import LinkBroken from '@/assets/error/LinkBroken';
import { FC } from 'react';
import styles from './NotFound.module.scss';
import ErrorPage from '@/components/ErrorPage/ErrorPage';

const NotFound: FC = () => {
  return (
    <div className={styles.container}>
      <ErrorPage
        icon={<LinkBroken />}
        title="Page not found"
        message={
          <p>
            Check the spelling of the web address. If you cannot find what you are looking for,
            contact us.
          </p>
        }
      />
    </div>
  );
};

export default NotFound;
