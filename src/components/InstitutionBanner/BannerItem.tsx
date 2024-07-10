import { FC } from 'react';
import { BannerItemProps } from '@/types/props';
import styles from './InstitutionBanner.module.scss';
import { Link } from 'react-router-dom';
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
