import { FC } from 'react';
import { Link } from 'react-router-dom';
import LogoWhite from '@/assets/logo/LogoWhite';
import Paths from '@/config/paths';
import Email from '@/assets/admin/Email';
import styles from './SchoolContactConfirmation.module.scss';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { splitAtLastHyphen } from '@/utils/globals';

const SchoolContactConfirmation: FC = () => {
  const { state } = useLocationStateOrRedirect<{ name: string; id: string }>(
    Paths.SCHOOLS_DASHBOARD
  );

  const name = splitAtLastHyphen(state.name);

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Email />
        <h2>{name} have got your message</h2>
        <p>They&apos;ll contact you to arrange the next steps.</p>
        <LogoWhite className={styles.logo} />
        <Link to={Paths.SCHOOLS_DASHBOARD} state={{ name, urn: state.id }}>
          Return to profile
        </Link>
      </div>
    </div>
  );
};

export default SchoolContactConfirmation;
