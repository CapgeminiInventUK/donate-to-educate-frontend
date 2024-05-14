import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import styles from './SchoolAlreadyRegistered.module.scss';
import Paths from '@/config/paths';
import { FC } from 'react';

const SchoolAlreadyRegistered: FC = () => {
  return (
    <div className={styles.container}>
      <h2>Your school has already joined Donate to Educate</h2>
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
