import { FC } from 'react';
import LogoCapgeminiInvent from '@/assets/logo/LogoCapgeminiInvent';
import Paths from '@/config/paths';
import styles from './InventBanner.module.scss';

const InventBanner: FC = () => {
  return (
    <div className={styles.inventBanner}>
      <p>Powered by</p>
      <LogoCapgeminiInvent
        className={styles.inventLogo}
        onClick={(): Window | null =>
          window.open(Paths.INVENT, '_blank', 'rel=noopener noreferrer')
        }
      />
    </div>
  );
};
export default InventBanner;
