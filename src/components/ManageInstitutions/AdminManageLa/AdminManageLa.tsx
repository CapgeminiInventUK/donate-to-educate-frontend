import { FC } from 'react';
import { AdminManageLaProps } from '@/types/props';
import styles from './AdminManageLa.module.scss';
import LogoBlue from '@/assets/logo/LogoBlue';
import { Link } from 'react-router-dom';
import Paths from '@/config/paths';

const AdminManageLa: FC<AdminManageLaProps> = ({ name }) => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <LogoBlue />
      </div>
      <h3>You are currently managing {name}</h3>
      <p>
        All requests to join Donate to Educate from schools and charities will be routed to you
        until a replacement is found.
      </p>
      <ul>
        <li>
          <Link className={styles.link} to={Paths.ADMIN_DASHBOARD_REQUESTS}>
            Manage requests to join Donate to Educate
          </Link>
        </li>
        <li>
          <Link className={styles.link} to={Paths.ADMIN_DASHBOARD_MANAGE_SCHOOLS}>
            Manage schools
          </Link>
        </li>
        <li>
          <Link className={styles.link} to={Paths.ADMIN_DASHBOARD_MANAGE_CHARITIES}>
            Manage charities
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default AdminManageLa;
