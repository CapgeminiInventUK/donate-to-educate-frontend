import LinkBroken from '@/assets/error/LinkBroken';
import ErrorPage from '@/components/ErrorPage/ErrorPage';
import Paths from '@/config/paths';
import type { FC } from 'react';
import styles from './NotFound.module.scss';

const NotFound: FC = () => {
  return (
    <div className={styles.container}>
      <ErrorPage
        icon={<LinkBroken />}
        title="Page not found"
        message={
          <p>
            Check the spelling of the web address. If you cannot find what you are looking for,{' '}
            <a href={Paths.CONTACT}>contact us.</a>
          </p>
        }
      />
    </div>
  );
};

export default NotFound;
