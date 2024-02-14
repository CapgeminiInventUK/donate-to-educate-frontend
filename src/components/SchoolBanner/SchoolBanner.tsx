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

export const SchoolBanner: FC<SchoolBannerProps> = ({ isAdminView = false }) => {
  return (
    <div className={styles.bannerContainer}>
      <h1>Ormiston Six Villages Academy</h1>
      <div className={styles.textContainer}>
        <ul>
          <li>
            <span>
              <Telephone />
            </span>
            01243 546800
          </li>
          <li>
            <span>
              <Email />
            </span>
            email@ormiston.edu.ac.uk
          </li>
          <li>
            <span>
              <Globe />
            </span>
            http://www.ormistonsixvillagesacademy.co.uk/
          </li>
        </ul>

        <ul>
          <li>
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
              onClick={(): void => {
                undefined;
              }}
            />
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
                onClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
              ></Button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
