import Paths from '@/config/paths';
import type { SchoolAlreadyRegisteredProps } from '@/types/props';
import { HomeOutlined } from '@ant-design/icons';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './SchoolAlreadyRegistered.module.scss';

const SchoolAlreadyRegistered: FC<SchoolAlreadyRegisteredProps> = ({ type }) => {
  const header =
    type === 'registered'
      ? 'Your school has already joined Donate to Educate'
      : 'Someone at your school has already applied to join Donate to Educate';

  return (
    <div className={styles.container}>
      <h2>{header}</h2>
      <p>
        For now, one person in each school can join Donate to Educate. In the future, more
        colleagues will be able to join.
      </p>
      <p>
        You may wish to speak with your colleagues to find out who has created your school profile.
      </p>
      <p>
        If you need help,{' '}
        <Link to={Paths.CONTACT} className={styles.link}>
          contact Donate to Educate
        </Link>
        .
      </p>
      <div>
        <HomeOutlined className={styles.homeIcon} /> &nbsp;
        <Link className={styles.link} to={Paths.HOME}>
          Return to homepage
        </Link>
      </div>
    </div>
  );
};
export default SchoolAlreadyRegistered;
