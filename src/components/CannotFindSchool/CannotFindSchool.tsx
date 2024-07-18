import Paths from '@/config/paths';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './CannotFindSchool.module.scss';

const CannotFindSchool: FC = () => {
  return (
    <div className={styles.container}>
      <h2>I cannot find my school</h2>
      <p>
        If you cannot find your school,{' '}
        <Link to={Paths.CONTACT} className={styles.contact}>
          contact us for help.
        </Link>
      </p>
    </div>
  );
};
export default CannotFindSchool;
