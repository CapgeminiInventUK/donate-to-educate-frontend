import { FC } from 'react';
import { Link } from 'react-router-dom';
import LogoWhite from '@/assets/logo/LogoWhite';
import Paths from '@/config/paths';
import Email from '@/assets/admin/Email';
import styles from './SchoolContactConfirmation.module.scss';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';

const SchoolContactConfirmation: FC = () => {
  const { state } = useLocationStateOrRedirect<{ name: string }>(Paths.SCHOOLS_DASHBOARD);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Email />
        <h2>{state.name} have got your message</h2>
        <p>They&apos;ll contact you to arrange the next steps.</p>
        <LogoWhite className={styles.logo} />
        <Link to={Paths.HOME}>Return to homepage</Link>
      </div>
    </div>
  );
};

export default SchoolContactConfirmation;
