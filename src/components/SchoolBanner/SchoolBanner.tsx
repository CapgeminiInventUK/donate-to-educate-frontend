import { FC } from 'react';
import styles from './SchoolBanner.module.scss';
import SchoolHat from '@/assets/school/SchoolHat';
import Telephone from '@/assets/school/Telephone';
import Email from '@/assets/school/EmailWhite';
import Globe from '@/assets/school/Globe';
import Button from '../Button/Button';
import InterfaceArrowTopRight from '@/assets/school/InterfaceArrowTopRight';
import { Link } from 'react-router-dom';

export const SchoolBanner: FC = () => {
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
            <Link
              to="http://www.ormistonsixvillagesacademy.co.uk/"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://www.ormistonsixvillagesacademy.co.uk/
            </Link>
          </li>
        </ul>

        <ul>
          <li>
            <span>
              <SchoolHat />
            </span>
            <Button
              theme="light"
              text={
                <div>
                  <span className={styles.buttonLabel}>View uniform policy</span>
                  <InterfaceArrowTopRight className={styles.interfaceArrow} />
                </div>
              }
              ariaLabel="view uniform policy"
              onClick={(): void => {
                undefined;
              }}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
