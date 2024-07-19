import HandHeart from '@/assets/logo/HandHeart';
import Paths from '@/config/paths';
import type { NoLocalOrganisationsProps } from '@/types/props';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './NoLocalOrganisations.module.scss';

const NoLocalOrganisations: FC<NoLocalOrganisationsProps> = ({
  organisationName = 'charities',
}: NoLocalOrganisationsProps) => {
  return (
    <div className={styles.container}>
      <h3>No {organisationName} have registered within your search area</h3>
      <p>
        <Link className={styles.contactUs} to={Paths.CONTACT}>
          Contact us
        </Link>
        <span> for more help.</span>
      </p>
      <div>
        <HandHeart />
      </div>
    </div>
  );
};

export default NoLocalOrganisations;
