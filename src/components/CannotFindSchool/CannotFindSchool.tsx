import { FC } from 'react';
import styles from './CannotFindSchool.module.scss';
import { Link } from 'react-router-dom';
import Paths from '@/config/paths';

const CannotFindSchool: FC = () => {
  return (
    <div className={styles.container}>
      <h2>I cannot find my school</h2>
      <p>
        If you cannot find your school, <Link to={Paths.CONTACT}>contact us for help.</Link>
      </p>
    </div>
  );
};
export default CannotFindSchool;
