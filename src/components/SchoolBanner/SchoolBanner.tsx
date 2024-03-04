import { FC } from 'react';
import styles from './SchoolBanner.module.scss';
import SchoolHat from '@/assets/school/SchoolHat';
import Telephone from '@/assets/school/Telephone';
import Email from '@/assets/school/EmailWhite';
import Globe from '@/assets/school/Globe';
import Button from '../Button/Button';
import InterfaceArrowTopRight from '@/assets/school/InterfaceArrowTopRight';
import { SchoolBannerProps } from '@/types/props';
import EditIcon from '@/assets/school/EditIcon';
import { Link } from 'react-router-dom';

export const SchoolBanner: FC<SchoolBannerProps> = ({
  isAdminView = false,
  phoneNumber,
  emailAddress,
  website,
  uniformPolicy,
}) => {
  return (
    <div className={styles.bannerContainer}>
      <h1>Ormiston Six Villages Academy</h1>
      <div className={styles.textContainer}>
        <ul>
          <li>
            <span>
              <Telephone />
            </span>
            <p className={styles.italicized}>
              {phoneNumber ?? "You haven't added your phone number"}
            </p>
          </li>
          <li>
            <span>
              <Email />
            </span>
            <p className={styles.italicized}>{emailAddress ?? "You haven't added your email"}</p>
          </li>
          <li>
            <span>
              <Globe />
            </span>
            <p className={styles.italicized}>{website ?? "You haven't added your website"}</p>
          </li>
        </ul>

        <ul>
          <li>
            <span>
              <SchoolHat />
            </span>
            {uniformPolicy ? (
              <Button
                theme="light"
                className={styles.uniformPolicyButton}
                text={
                  <div>
                    <span className={styles.buttonLabel}>View uniform policy</span>
                    <InterfaceArrowTopRight className={styles.interfaceArrow} />
                  </div>
                }
                onClick={() => null}
              />
            ) : (
              <p className={styles.italicized}>
                You haven&apos;t added your school&apos;s uniform policy
              </p>
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
              ></Button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
