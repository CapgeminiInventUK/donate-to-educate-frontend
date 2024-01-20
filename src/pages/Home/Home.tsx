import { FC } from 'react';
import styles from './Home.module.scss';
import Image from '@components/Image/Image';
import westSussexCouncilLogo from '@assets/logo/WestSussexCouncilLogo.webp';
import { HeroBanner } from '@/components/HeroBanner/HeroBanner';
import Button from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Pill } from '@/components/Pill/Pill';
import Paths from '@/config/paths';
import { Themes } from '@/types/props';
import Header from '@/components/Header/Header';

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <h2>Admin</h2>
        <div>
          {[
            {
              text: 'Login',
              path: Paths.LOGIN,
              color: 'green',
              pillText: 'DONE',
              theme: 'darkBlue',
            },
            {
              text: 'Admin dashboard',
              path: Paths.ADMIN_DASHBOARD,
              color: 'blue',
              pillText: 'IN PROGRESS',
              theme: 'darkBlue',
            },
            {
              text: 'LA dashboard',
              path: Paths.LOCAL_AUTHORITY_DASHBOARD,
              color: 'blue',
              pillText: 'IN PROGRESS',
              theme: 'darkBlue',
            },
            {
              text: 'Add user',
              path: Paths.ADD_USER,
              color: 'blue',
              pillText: 'IN PROGRESS',
              theme: 'darkBlue',
            },
            {
              text: 'Edit school profile',
              path: Paths.SCHOOL_EDIT,
              color: 'blue',
              pillText: 'IN PROGRESS',
              theme: 'midBlue',
            },
            {
              text: 'Edit charity profile',
              path: Paths.HOME,
              color: 'red',
              pillText: 'TODO',
              theme: 'midBlue',
            },
          ].map(({ text, path, color, pillText, theme }) => {
            return (
              <Button
                key="text"
                className={styles.buttons}
                theme={theme as Themes}
                text={
                  <>
                    {text} - <Pill color={color as 'green'} text={pillText} />
                  </>
                }
                onClick={() => navigate(path)}
              />
            );
          })}
        </div>
        <h2>Public</h2>
        <div>
          {[
            {
              text: 'School sign up',
              path: Paths.SIGN_UP_SCHOOL,
              color: 'blue',
              pillText: 'IN PROGRESS',
              theme: 'midBlue',
            },
            {
              text: 'School profile',
              path: Paths.HOME,
              color: 'red',
              pillText: 'TODO',
              theme: 'midBlue',
            },
            {
              text: 'Charity sign up',
              path: Paths.SIGN_UP_CHARITY,
              color: 'blue',
              pillText: 'IN PROGRESS',
              theme: 'midBlue',
            },
            {
              text: 'Charity profile',
              path: Paths.HOME,
              color: 'red',
              pillText: 'TODO',
              theme: 'midBlue',
            },
          ].map(({ text, path, color, pillText, theme }) => {
            return (
              <Button
                key="text"
                className={styles.buttons}
                theme={theme as Themes}
                text={
                  <>
                    {text} - <Pill color={color as 'green'} text={pillText} />
                  </>
                }
                onClick={() => navigate(path)}
              />
            );
          })}
        </div>
      </div>
      <HeroBanner />

      <div className={styles.councilBanner}>
        <Header
          className={styles.title}
          text="First launching in partnership with West Sussex County Council"
          size="small"
        />
        <Image
          image={westSussexCouncilLogo}
          alt="west sussex county council logo"
          width={250}
          className={styles.westSussexLogo}
        />
      </div>
    </div>
  );
};

export default Home;
