import { FC } from 'react';
import { AdminViewProps } from '@/types/props';
import styles from './InstitutionBanner.module.scss';
import SchoolHat from '@/assets/school/SchoolHat';
import Telephone from '@/assets/school/Telephone';
import Email from '@/assets/school/EmailWhite';
import Globe from '@/assets/school/Globe';
import House from '@/assets/school/House';
import BannerItem from './BannerItem';
import EditModeItem from './EditModetem';

const AdminView: FC<AdminViewProps> = ({ banner, type, editMode, setBanner }) => {
  const { phone, email, website, uniformPolicy, address } = banner;
  return (
    <div className={styles.textContainer}>
      {!editMode ? (
        <>
          <ul>
            <BannerItem
              icon={<Telephone />}
              item={phone}
              itemType="tel"
              defaultText={"You haven't added your phone number"}
            />
            <BannerItem
              icon={<Email />}
              item={email}
              itemType="mail"
              defaultText="You haven't added your email"
            />
            <BannerItem
              icon={<Globe />}
              item={website}
              itemType="url"
              defaultText="You haven't added your website"
            />
          </ul>
          <ul>
            {type === 'school' && (
              <BannerItem
                icon={<SchoolHat />}
                item={uniformPolicy}
                itemType="url"
                defaultText="You haven't added your school's uniform policy"
              />
            )}
            {type === 'charity' && (
              <li>
                <span>
                  <House />
                </span>
                <p className={styles.item}>{address ?? 'Address not given'}</p>
              </li>
            )}
          </ul>
        </>
      ) : (
        <>
          <ul>
            <EditModeItem
              icon={<Telephone />}
              itemName={'phone'}
              item={phone}
              setBanner={setBanner}
            />
            <EditModeItem icon={<Email />} itemName={'email'} item={email} setBanner={setBanner} />
            <EditModeItem
              icon={<Globe />}
              itemName={'website'}
              item={website}
              setBanner={setBanner}
            />
          </ul>

          <ul>
            {type === 'school' && (
              <EditModeItem
                icon={<SchoolHat />}
                itemName={'uniformPolicy'}
                item={uniformPolicy}
                setBanner={setBanner}
              />
            )}

            {type === 'charity' && (
              <EditModeItem
                icon={<House />}
                itemName={'address'}
                item={address}
                setBanner={setBanner}
              />
            )}
          </ul>
        </>
      )}
    </div>
  );
};
export default AdminView;
