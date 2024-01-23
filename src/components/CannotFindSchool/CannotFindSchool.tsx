import { FC } from 'react';
import styles from './CannotFindSchool.module.scss';

const CannotFindSchool: FC = () => {
  return (
    <div className={styles.container}>
      <h2>I cannot find my school</h2>
      <p>If you cannot find your school, contact us for help.</p>
    </div>
  );
};
export default CannotFindSchool;
