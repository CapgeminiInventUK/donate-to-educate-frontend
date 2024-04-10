import { FC } from 'react';
import styles from './SchoolAdminView.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import FormButton from '@/components/FormButton/FormButton';
import SchoolProfile from '@/assets/admin/SchoolProfile';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import findNearbyCharities from '@/templates/tiles/findNearbyCharities';
import donate from '@/templates/tiles/donate';
import takeExtraStock from '@/templates/tiles/takeExtraStock';
import findSchool from '@/templates/tiles/findSchool';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetSchoolProfileQuery } from '@/types/api';
import { getSchoolProfile } from '@/graphql/queries';
import { useStore } from '@/stores/useStore';

const School: FC = () => {
  const user = useStore((state) => state.user);
  const { name, id } = user ?? {};
  const navigate = useNavigate();

  const { isLoading, data, isError } = useQuery({
    queryKey: [`getProfile-${name}-${id}`],
    enabled: user !== undefined,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolProfileQuery>>({
        query: getSchoolProfile,
        variables: {
          name,
          id,
        },
      });

      return data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" />
        <LogoutButton />
      </div>
      <InstitutionBanner type={'school'} name={name} banner={{}} />
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
                  navigate(onClickLink, { state: { postcode: data?.getSchoolProfile?.postcode } })
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
