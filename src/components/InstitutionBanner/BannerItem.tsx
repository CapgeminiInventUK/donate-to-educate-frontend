import { FC } from 'react';
import { BannerItemProps } from '@/types/props';
import styles from './InstitutionBanner.module.scss';
import { Link } from 'react-router-dom';

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

const getLinkFromType = (type: string, item?: string): string => {
  switch (type) {
    case 'tel':
      return `tel: ${item}`;
    case 'mail':
      return `mailto: ${item}`;
    default:
      return item?.includes('https://') === true || item?.includes('http://') == true
        ? `${item}`
        : `https://${item}`;
  }
};
