import { FC } from 'react';
import styles from './NoLocalOrganisations.module.scss';
import HandHeart from '@/assets/logo/HandHeart';

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
        <span className={styles.contactUs}>
          <a href="/contact">Contact us</a>
        </span>
        <span> for more help.</span>
      </p>
      <HandHeart />
    </div>
  );
};

export default NoLocalOrganisations;
