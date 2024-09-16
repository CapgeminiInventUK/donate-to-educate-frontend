import { FC } from 'react';
import { DeniedModalProps } from '@/types/props';
import styles from './DeniedModal.module.scss';
import LogoIconBlue from '@/assets/logo/LogoIconBlue';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import { getLinkFromType } from '../InstitutionBanner/utils';
import Card from '../Card/Card';

const DeniedModal: FC<DeniedModalProps> = ({ showModal, setShowModal, header, body }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className={styles.modal}>
      <Card className={styles.modalCard}>
        <div className={styles.logo}>
          <LogoIconBlue />
        </div>
        {header && <h2>{header}</h2>}
        {body && <p>{body}</p>}
        <div className={styles.links}>
          <Link
            to={getLinkFromType('email', 'team@donatetoeducate.org.uk')}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            team@donatetoeducate.org.uk
          </Link>
          <Link
            to={getLinkFromType('phone', '0134 271 8679')}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            0134 271 8679
          </Link>
          <Button
            theme="link-blue"
            onClick={() => setShowModal(false)}
            text={'Go back'}
            ariaLabel="back-link"
          />
        </div>
      </Card>
    </div>
  );
};
export default DeniedModal;
