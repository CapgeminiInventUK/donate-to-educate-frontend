import type { Banner } from '@/types/data';
import type { AdminViewProps } from '@/types/props';
import type { FC } from 'react';
import BannerItem from './BannerItem';
import EditModeItem from './EditModeItem';
import styles from './InstitutionBanner.module.scss';
import { getBannerKeys, getIcon, getItemTypeString } from './utils';

const AdminView: FC<AdminViewProps> = ({ banner, type, editMode, setBanner }) => {
  const bannerItems = getBannerKeys(banner, type).map((itemType) => {
    return {
      icon: getIcon(itemType),
      item: banner[itemType as keyof Banner],
      itemType,
      defaultText: `You haven't added your ${getItemTypeString(itemType)}`,
    };
  });

  return (
    <div className={styles.textContainer}>
      {!editMode ? (
        <>
          <ul>
            {bannerItems.map(({ icon, item, itemType, defaultText }, key) => (
              <BannerItem
                key={key}
                icon={icon}
                item={item}
                itemType={itemType}
                defaultText={defaultText}
              />
            ))}
          </ul>
        </>
      ) : (
        <>
          <ul>
            {bannerItems.map(({ icon, item, itemType }, key) => (
              <EditModeItem
                key={key}
                placeholder={`Add your ${itemType === 'website' ? `${type}'s ` : ''}${getItemTypeString(itemType)}`}
                icon={icon}
                itemName={itemType}
                item={item}
                setBanner={setBanner}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
export default AdminView;
