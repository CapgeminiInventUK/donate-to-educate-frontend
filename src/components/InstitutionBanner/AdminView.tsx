import { FC } from 'react';
import { AdminViewProps, BannerItemProps } from '@/types/props';
import styles from './InstitutionBanner.module.scss';
import BannerItem from './BannerItem';
import EditModeItem from './EditModeItem';
import { Banner } from '@/types/data';
import { getBannerKeys, getIcon, getItemTypeString } from './utils';

const AdminView: FC<AdminViewProps> = ({ banner, type, editMode, setBanner }) => {
  const bannerItems = getBannerKeys(banner, type).reduce((acc: BannerItemProps[], itemType) => {
    const item = {
      icon: getIcon(itemType),
      item: banner[itemType as keyof Banner],
      itemType,
      defaultText: `You haven't added your ${getItemTypeString(itemType)}`,
    };
    return [...acc, item];
  }, []);

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
