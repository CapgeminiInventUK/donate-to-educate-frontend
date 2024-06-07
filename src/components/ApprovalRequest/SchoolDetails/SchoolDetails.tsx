import Phone from '@/assets/contact/Phone';
import Globe from '@/assets/tiles/Globe';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from '../ApprovalRequest.module.scss';
import { SchoolDetailsProps } from '@/types/props';

const SchoolDetails: FC<SchoolDetailsProps> = ({ data }) => {
  const {
    getSchool: { street, locality, address3, town, county, postcode, website, name, phone },
  } = data;

  return (
    <>
      <h1>{name}</h1>
      {phone && (
        <div className={styles.contactInfo}>
          <Phone />
          {phone && (
            <Link to={`tel: ${phone}`} target="_blank" className={styles.item}>
              {phone}
            </Link>
          )}
        </div>
      )}
      {website && (
        <div className={styles.contactInfo}>
          <Globe />
          {website && (
            <Link to={`https://${website}`} target="_blank" className={styles.item}>
              {website}
            </Link>
          )}
        </div>
      )}
      <div className={styles.detailsCard}>
        <p>{street}</p>
        <p>{locality}</p>
        <p>{address3}</p>
        <p>{town}</p>
        <p>{county}</p>
        <p>{postcode}</p>
        <p>England</p>
      </div>{' '}
    </>
  );
};
export default SchoolDetails;
