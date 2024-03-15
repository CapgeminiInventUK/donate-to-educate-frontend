import { FC } from 'react';
import styles from './InstitutionBanner.module.scss';
import SchoolHat from '@/assets/school/SchoolHat';
import Telephone from '@/assets/school/Telephone';
import Email from '@/assets/school/EmailWhite';
import Globe from '@/assets/school/Globe';
import House from '@/assets/school/House';
import Button from '../Button/Button';
import InterfaceArrowTopRight from '@/assets/school/InterfaceArrowTopRight';
import { InstitutionBannerProps } from '@/types/props';
import EditIcon from '@/assets/school/EditIcon';

export const InstitutionBanner: FC<InstitutionBannerProps> = ({
  isAdminView = false,
  phoneNumber,
  emailAddress,
  website,
  uniformPolicy,
  address,
  type,
  name,
}) => {
  return (
    <div className={`${styles.bannerContainer} ${styles[type]}`}>
      <h1>{name}</h1>
      {hasContactInfo(phoneNumber, emailAddress, website, uniformPolicy, isAdminView) && (
        <div className={styles.textContainer}>
          <ul>
            {(phoneNumber ?? isAdminView) && (
              <li>
                <span>
                  <Telephone />
                </span>
                <p className={styles.italicized}>
                  {phoneNumber ?? "You haven't added your phone number"}
                </p>
              </li>
            )}
            {(emailAddress ?? isAdminView) && (
              <li>
                <span>
                  <Email />
                </span>
                <p className={styles.italicized}>
                  {emailAddress ?? "You haven't added your email"}
                </p>
              </li>
            )}
            {(website ?? isAdminView) && (
              <li>
                <span>
                  <Globe />
                </span>
                <p className={styles.italicized}>{website ?? "You haven't added your website"}</p>
              </li>
            )}
          </ul>

          <ul>
            <li>
              {uniformPolicy && type === 'school' && (
                <>
                  <span>
                    <SchoolHat />
                  </span>
                  <Button
                    theme="light"
                    className={styles.uniformPolicyButton}
                    text={
                      <div>
                        <span className={styles.buttonLabel}>View uniform policy</span>
                        <InterfaceArrowTopRight className={styles.interfaceArrow} />
                      </div>
                    }
                    ariaLabel="uniform policy"
                    onClick={() => null}
                  />
                </>
              )}
              {!uniformPolicy && type === 'school' && isAdminView && (
                <>
                  <span>
                    <SchoolHat />
                  </span>
                  <p className={styles.italicized}>
                    You haven&apos;t added your school&apos;s uniform policy
                  </p>
                </>
              )}
              {type === 'charity' && (
                <>
                  <span>
                    <House />
                  </span>
                  <p className={styles.italicized}>{address ?? 'Address not given'}</p>
                </>
              )}
            </li>
            {isAdminView && (
              <li>
                <Button
                  text={
                    <div className={styles.editDiv}>
                      <EditIcon />
                      <span className={styles.editButtonText}>Edit</span>
                    </div>
                  }
                  theme="light"
                  className={styles.editButton}
                  onClick={() => null}
                  ariaLabel="edit"
                ></Button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

const hasContactInfo = (
  phoneNumber?: string,
  emailAddress?: string,
  website?: string,
  uniformPolicy?: string,
  isAdminView?: boolean
): boolean => {
  return (
    phoneNumber !== undefined ||
    emailAddress !== undefined ||
    website !== undefined ||
    uniformPolicy !== undefined ||
    isAdminView === true
  );
};
