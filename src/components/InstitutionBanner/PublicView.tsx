import House from '@/assets/school/House';
import InterfaceArrowTopRight from '@/assets/school/InterfaceArrowTopRight';
import type { Banner } from '@/types/data';
import type { PublicViewProps } from '@/types/props';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import BannerItem from './BannerItem';
import styles from './InstitutionBanner.module.scss';
import { getBannerKeys, getIcon } from './utils';

const PublicView: FC<PublicViewProps> = ({ banner, type }) => {
  const bannerKeys = getBannerKeys(banner, type).filter((key) => banner[key as keyof Banner]);
  const sectionTwoBanners = ['address', 'uniformPolicy'];

  return (
    <>
      {!!bannerKeys.length && (
        <ul>
          {bannerKeys
            .filter((key) => !sectionTwoBanners.includes(key))
            .map((key) => (
              <BannerItem
                key={key}
                icon={getIcon(key)}
                item={banner[key as keyof Banner]}
                itemType={key}
                defaultText=""
              />
            ))}
        </ul>
      )}

      {bannerKeys
        .filter((key) => sectionTwoBanners.includes(key))
        .map((key) => (
          <ul key={key}>
            {key === 'uniformPolicy' && (
              <>
                <Link
                  className={styles.uniformPolicyButton}
                  to={String(banner[key])}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    <span className={styles.buttonLabel}>View uniform policy</span>
                    <InterfaceArrowTopRight className={styles.interfaceArrow} />
                  </div>
                </Link>
              </>
            )}
            {key === 'address' && (
              <li>
                <span>
                  <House />
                </span>
                <p className={styles.item}>{banner[key]}</p>
              </li>
            )}
          </ul>
        ))}
    </>
  );
};
export default PublicView;
