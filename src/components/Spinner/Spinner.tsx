import { FC } from 'react';
import styles from './Spinner.module.scss';
import spinner from './spinner.gif';

export const Spinner: FC = () => {
  return (
    <div className={styles.container}>
      <img src={spinner} alt="loading..." />
    </div>
  );
};

export default Spinner;
