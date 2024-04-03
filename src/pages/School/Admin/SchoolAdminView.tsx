import { FC } from 'react';
import styles from './SchoolAdminView.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useLocation, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import FormButton from '@/components/FormButton/FormButton';
import SchoolProfile from '@/assets/admin/SchoolProfile';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import findNearbyCharities from '@/templates/tiles/findNearbyCharities';
import donate from '@/templates/tiles/donate';
import takeExtraStock from '@/templates/tiles/takeExtraStock';
import findSchool from '@/templates/tiles/findSchool';

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
        <div className={styles.schoolProfileBanner}>
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

const tiles = [findSchool, findNearbyCharities, donate, takeExtraStock];

export default School;
