import { FC } from 'react';
import styles from './SchoolAdminView.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useLocation, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import Heart from '@/assets/yourLocalArea/Heart';
import Donate from '@/assets/yourLocalArea/Donate';
import Image from '@/components/Image/Image';
import heartImg from '@/assets/yourLocalArea/heart.webp';
import donateImg from '@/assets/yourLocalArea/donate.webp';
import boxImg from '@/assets/yourLocalArea/box.webp';
import FormButton from '@/components/FormButton/FormButton';
import SchoolProfile from '@/assets/admin/SchoolProfile';
import PackagePlusIcon from '@/assets/admin/PackagePlusIcon';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';

const School: FC = () => {
  const { state } = useLocationStateOrRedirect<{ name: string; postcode: string }>(
    Paths.SCHOOLS_CREATE_EDIT_PROFILE
  );

  const navigate = useNavigate();
  const location = useLocation() as { state: { name: string; postcode: string } };

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <InstitutionBanner type={'school'} name={state.name} />

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
                onClick={() =>
                  navigate(onClickLink, { state: { postcode: location.state.postcode } })
                }
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
    onClickLink: Paths.LOCAL_EXCESS,
  },
];

export default School;
