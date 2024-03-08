import { FC } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import LogoWhite from '@/assets/logo/LogoWhite';
import Paths from '@/config/paths';
import Email from '@/assets/admin/Email';
import styles from './CharityContactConfirmation.module.scss';

const CharityContactConfirmation: FC = () => {
  const location = useLocation() as { state: { name: string } };

  if (!(location.state && 'name' in location.state)) {
    return <Navigate to={Paths.ADMIN_DASHBOARD} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Email />
        <h2>{location.state.name} have got your message</h2>
        <p>They&apos;ll contact you to arrange the next steps.</p>
        <LogoWhite className={styles.logo} />
        <Link to={Paths.HOME}>Return to homepage</Link>
      </div>
    </div>
  );
};

export default CharityContactConfirmation;
