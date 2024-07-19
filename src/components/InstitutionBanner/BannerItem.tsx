import type { BannerItemProps } from '@/types/props';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './InstitutionBanner.module.scss';
import { getLinkFromType } from './utils';

const BannerItem: FC<BannerItemProps> = ({ icon, item, itemType, defaultText }): JSX.Element => {
  return (
    <li>
      <span>{icon}</span>
      {item ? (
        <Link
          to={getLinkFromType(itemType, item)}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.item}
        >
          {item}
        </Link>
      ) : (
        <span className={styles.item}>{defaultText}</span>
      )}
    </li>
  );
};
export default BannerItem;
