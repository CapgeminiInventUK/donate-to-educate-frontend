import { FC } from 'react';
import styles from './NoLocalOrganisations.module.scss';
import HandHeart from '@/assets/logo/HandHeart';
import { Link } from 'react-router-dom';
import Paths from '@/config/paths';

interface NoLocalOrganisationsProps {
  organisationName?: string;
}

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
