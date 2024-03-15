import { FC, useEffect, useState } from 'react';
import styles from './SchoolAdminView.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useLocation, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import Heart from '@/assets/yourLocalArea/Heart';
import Donate from '@/assets/yourLocalArea/Donate';
import Image from '@/components/Image/Image';
import boxImg from '@/assets/admin/box.png';
import heartImg from '@/assets/yourLocalArea/heart.png';
import donateImg from '@/assets/yourLocalArea/donate.png';
import FormButton from '@/components/FormButton/FormButton';
import SchoolProfile from '@/assets/admin/SchoolProfile';
import PackagePlusIcon from '@/assets/admin/PackagePlusIcon';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';

const School: FC = () => {
  const [schoolName, setSchoolName] = useState<string>();
  const navigate = useNavigate();
  const location = useLocation() as { state: { name: string } };

  useEffect(() => {
    if (location.state && 'name' in location.state) {
      setSchoolName(String(location.state.name));
    } else {
      navigate(Paths.SCHOOLS_CREATE_EDIT_PROFILE);
    }
  }, [location.state, navigate]);

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <InstitutionBanner type={'school'} name={schoolName} />

      <div className={styles.subContainer}>
        <div className={styles.schoolProfilebanner}>
          <SchoolProfile />
          <h2>Your school&apos;s profile is active</h2>
          <p>View, edit and update your public facing profile.</p>
          <FormButton
            theme="formButtonGreen"
            text={'View and edit profile'}
            ariaLabel="view and edit profile"
            onClick={() => navigate(Paths.SCHOOLS_CREATE_EDIT_PROFILE)}
          />
        </div>
        <div className={styles.localAreaContainer}>
          <h2>Your local area</h2>
          {tiles.map(({ icon, title, body, image, colour, onClickLink }) => {
            return (
              <div
                key={title}
                className={`${styles.tile} ${styles[colour]}`}
                onClick={() => navigate(onClickLink)}
              >
                {icon}
                <div className={styles.content}>
                  <h2 className={styles.header}>{title}</h2>
                  <div>{body}</div>
                </div>
                {image}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const tiles = [
  {
    icon: <Heart />,
    title: 'Find nearby charities',
    body: 'Find out what they stock or donate products',
    image: <Image alt="heart" image={heartImg} />,
    colour: 'midBlue',
    onClickLink: Paths.LOCAL_CHARITIES,
  },
  {
    icon: <Donate />,
    title: 'Donate products',
    body: 'Support schools and charities in your area',
    image: <Image alt="donate" image={donateImg} />,
    colour: 'lightBlue',
    onClickLink: Paths.LOCAL_DONATE,
  },
  {
    icon: <PackagePlusIcon />,
    title: 'Help take extra stock',
    body: 'Sometimes schools and charities might have too much stock that urgently needs to find a new home. Help take it off their hands.',
    image: <Image alt="package" image={boxImg} />,
    colour: 'darkBlue',
    onClickLink: Paths.LOCAL_SCHOOLS,
  },
];

export default School;
