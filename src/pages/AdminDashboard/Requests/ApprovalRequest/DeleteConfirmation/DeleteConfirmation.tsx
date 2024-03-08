import { FC } from 'react';
import { Link } from 'react-router-dom';
import LogoWhite from '@/assets/logo/LogoWhite';
import Paths from '@/config/paths';
import Email from '@/assets/admin/Email';
import styles from './DeleteConfirmation.module.scss';
import BackButton from '@/components/BackButton/BackButton';

const DeleteConfirmation: FC = () => {
  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={styles.body}>
        <Email />
        <h2>You&apos;ve declined this request to join and deleted their information</h2>
        <p>We&apos;ve emailed them the results.</p>
        <LogoWhite className={styles.logo} />
        <Link to={Paths.ADMIN_DASHBOARD}>Return to dashboard</Link>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
